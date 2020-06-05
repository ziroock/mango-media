const express = require('express');
const mongoose = require('mongoose');
const app = express();
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.once('open', () => {
   console.log("MongoDB connection established successfully!");
});

app.get('/', (req, res) => {
    res.send({hi: 'there'});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);