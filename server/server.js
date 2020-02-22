const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const signupController = require('./controllers/signupController');
const PORT = 3000;

const MONGO_URI = `mongodb+srv://eevee:eevee@cluster0-nphgk.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.connect(MONGO_URI);

app.post('/signup', signupController.createUser, (req, res) => {
    res.status(200).redirect('/');
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

module.exports = app;
