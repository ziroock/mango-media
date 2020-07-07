const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('users');

/**
* In this file I define functions and strategies needed for passport auth.
* TODO: Add Facebook, Google, etc. authentication strategies
*
* - serializeUser():
*   + This function serializes the user for the current session.
* - deserializeUser():
*   + This function deserializes the user for the current session after it is
*     successfully received from the DB.
* - user(LocalStrategy):
*   + This function defines the Strategy used by passport for local authentication.
* */

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(new LocalStrategy( {usernameField: 'email'},
    function(email, password, done) {
        User.findOne({ email: email }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            // user.password !== password
            if (!bcrypt.compareSync(password, user.password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));