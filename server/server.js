const SECRET = require('./config/db.js');
// const chatRouter = require('./routes/chatRoute.js');
// const signupRouter = require('./routes/signupRoute');
// const loginRouter = require('./routes/loginRoute');
const verifyUserController = require('./controllers/verifyUserController.js');
const signupController = require('./controllers/signupController.js');
const cookieController = require('./controllers/cookieController.js');

const cookieParser = require('cookie-parser');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const PORT = 3000;
const MONGO_URI = SECRET;
mongoose.connect(MONGO_URI);

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// app.use('/chatRoute/', chatRouter);

// app.use('/signup', signupRouter);
// app.use('/login', loginRouter);

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
