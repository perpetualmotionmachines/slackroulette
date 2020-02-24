const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
// Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
const dotenv = require('dotenv');
// cors is necessary to avoid requests being rejected by the server -- DO NOT DELETE UNLESS YOU ARE A PRO
const cors = require('cors');
/**
 * Express validator is used to validate inputs and report errors BEFORE saving something to the database
 * See more details in /validator/signUpValidator
 */
const expressValidator = require('express-validator');
const http = require('http');
const socketio = require('socket.io');
const roomController = require('./controllers/roomController.js');

/**
 * IMPORT ROUTE HANDLERS HERE
 *
 *  :)
 */
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
// extract modules from users to handle socketIO stuff
const {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
} = require('./controllers/socketController');

/**
 * This imports the config information that we set in .env
 * This includes the PORT, the JWT_SECRET, and MONGO_URI
 *
 * the .env file will NOT be uploaded to github because its in the .gitignore
 *
 * please reach out to Eevee team for contents of .env
 */
dotenv.config();

// Connects to mongodb and fires a success/error messages
//***WASN'T ABLE TO CONNECT TO MONGO SO I EXPLICITY WROTE THE URI HERE */
MONGO_URI =
    'mongodb+srv://eevee:eevee@cluster0-nphgk.mongodb.net/test?retryWrites=true&w=majority';

mongoose
    .connect(MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        dbName: 'eevee'
    })
    .then(() => console.log('DB Connected'));
// Can this line be refactored to be included in the above code block???
mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`);
});
// ***BELOW CODE DOESN'T ALLOW ME TO CONNECT TO DATABASE***
// mongoose
//     .connect(process.env.MONGO_URI, { useNewUrlParser: true })
//     .then(() => console.log('DB Connected'));
// // Can this line be refactored to be included in the above code block???
// mongoose.connection.on('error', err => {
//     console.log(`DB connection error: ${err.message}`);
// });

/**
 * Start our Express server -> create an http server (socketio requirement) -> start socketio
 */
const app = express();
const server = http.createServer(app);
const io = socketio(server);

/**
 *
 * UTILIZE/IMPORT MIDDLESWARES HERE
 *
 */
app.use(express.json());
app.use(cookieParser());
app.use(expressValidator());
// Helps handle reqs from different port origins (ie frontend on 3001 can communicate with backend on port 8000)
app.use(cors());

app.post('/create', roomController.createRoom, (req, res) => {
    res.status(200).redirect('/');
});

app.get('/', roomController.getRooms, (req, res) => {
    res.status(200).json(res.locals.rooms);
});
// route middlewares
// This route is used for authenticating/signing up
app.use('/api', authRoutes);
// This route is for handling user dashboard routes
app.use('/api', userRoutes);

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

// route for creating new rooms
// app.post('/api/create', roomController.createRoom, (req, res) => {
//     res.status(200).json('hello');
// });
// catch all for sending html file
app.use('*', (req, res) => {
    res.status(200).sendFile(
        path.resolve(__dirname, '../client/public/index.html')
    );
});
/**
 * CATCH ALL FUNCTION FOR 404 ERRORS
 * Only fires if the previous routes are not hit
 */

app.use((req, res) => res.sendStatus(404));

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
