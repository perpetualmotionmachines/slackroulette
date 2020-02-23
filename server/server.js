const SECRET = require('./config/db.js');

const verifyUserController = require('./controllers/verifyUserController.js');
const signupController = require('./controllers/signupController.js');
const cookieController = require('./controllers/cookieController.js');

const cookieParser = require('cookie-parser');
const chatRouter = require('./routes/chatRoute.js');
const signupRouter = require('./routes/signupRoute');
const loginRouter = require('./routes/loginRoute');

const createRoomController = require('./controllers/createRoomController');
const signupController = require('./controllers/signupController');
const verifyUserController = require('./controllers/verifyUserController');


const path = require('path');
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const socketio = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 3000;
const MONGO_URI = SECRET;
mongoose.connect(MONGO_URI);

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.post(
    '/signup',
    signupController.createUser,
    cookieController.setCookie,
    (req, res) => {
        res.status(200).json(res.locals.cookie);
    }
);

app.get('/', (req, res) => {
    res.status(200).json(res.locals.cookieId);
});

app.use('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));

app.use('/chatRoute', chatRouter);

app.post('/signup', signupController.createUser, (req, res) => {
    res.status(200).render(path.join(__dirname, './client/App.jsx'));

});

app.post('/login', verifyUserController.verifyUser, (req, res) => {
    res.status(200).render(path.join(__dirname, './client/App.jsx'));
});

app.post('/create', createRoomController.createRoom, (req, res) => {
    res.status(200).render(path.join(__dirname, './client/ChatBox.jsx'));
});

/**
 * THE BELOW CODE IMPLEMENTS SOCKET FUNCTIONALITY VIA SOCKET.IO;
 * We use socket.io in order to maintain real-time connections with various users;
 * This is much easier than attempting to manually manage the sockets, but does create challenges;
 *
 * For example, socketio does not naturally persist messages -- this has to be implemented manually;
 * We can pull those messages from a DB, and save them each time a message fires;
 *
 * This code block relies on the socketioController in /controllers
 *
 * Code block implemented by : Lance J -- please reach out for ?s or modifications
 */

io.on('connect', socket => {
    // tells socketio what to do when a user attempts to fire a join event (which comes from ChatBoxMini.jsx onClick)
    // callback also comes from chatBoxMini onClick
    socket.on('join', ({ name, room }, callback) => {
        // add a user to the room or grab an error if one was returned
        const { error, user } = addUser({ id: socket.id, name, room });

        if (error) return callback(error);

        // join = built in socketio method
        socket.join(user.room);

        // emits an admin message to the joined channel that is directed TO the user who joined
        socket.emit('message', {
            user: 'admin',
            text: `${user.name}, welcome to room ${user.room}.`
        });

        // emits an admin message to the joined channel that is directed to everyone EXCEPT the user who joined
        socket.broadcast.to(user.room).emit('message', {
            user: 'admin',
            text: `${user.name} has joined!`
        });

        // will help show an updated list of users in room
        io.to(user.room).emit('roomData', {
            room: user.room,
            users: getUsersInRoom(user.room)
        });

        callback();
    });

    // gets invoked when a user submits the input within the chat room
    socket.on('sendMessage', (message, callback) => {
        // identify the user who sent it
        const user = getUser(socket.id);
        // send the message to the room the user is inside of, and then attach the name to it so we can render it
        io.to(user.room).emit('message', { user: user.name, text: message });

        callback();
    });

    // fires when a user leaves the room
    socket.on('disconnect', () => {
        // remove the user from the room
        const user = removeUser(socket.id);
        // as long as we didnt have a bug, let the users know who left and then update the roomdata(list of people who are in the room)
        if (user) {
            io.to(user.room).emit('message', {
                user: 'Admin',
                text: `${user.name} has left.`
            });
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            });
        }
    });
});

/**
 * CATCH ALL FUNCTION FOR 404 ERRORS
 * Only fires if the previous routes are not hit
 */
app.use((req, res) => res.sendStatus(404));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});