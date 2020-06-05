const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true
});

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send({hi: 'there'});
});

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
