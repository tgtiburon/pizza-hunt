const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));


// Tell mongoose which DB we want to connect to
// MONGODB_URI will be used for heroku later.
// Short circuits and uses localdb for now.
// If there is no db with that name...mongo will create it.
mongoose.connect(process.env.MONGODB_URI || 'mongodb:localhost:27017/pizza-hunt', {
    useNewUrlParser: true,
    useUnifiedTopology: true

});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
