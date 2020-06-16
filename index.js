const express = require('express');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
});


const app = express();
app.use(express.json());
//app.use(express.urlencoded({extended: false}));


app.use(cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: ['mango']
    })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
