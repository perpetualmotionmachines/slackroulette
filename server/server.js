const SECRET = require('./config/db.js');
const chatRouter = require('./routes/chatRoute.js');
const signupRouter = require('./routes/signupRoute');
const loginRouter = require('./routes/loginRoute');

const createRoomController = require('./controllers/createRoomController');
const signupController = require('./controllers/signupController');
const verifyUserController = require('./controllers/verifyUserController');

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;
const MONGO_URI = SECRET;
mongoose.connect(MONGO_URI);

app.use(express.json());

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

app.use((req, res) => res.sendStatus(404));

app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 400,
        message: { err: 'An error occurred' }
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

module.exports = app;
