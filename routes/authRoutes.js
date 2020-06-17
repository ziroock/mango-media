const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = app => {
    app.post('/api/register', async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            res.send({message: 'Please enter username and password!'});
            return null;
        }
        //TODO: Fix user validation errors to better ones
        const user = new User({ email: email, password: password });

        try {
            await user.save();
            res.send({message: 'Registration successful!'});
        } catch(err) {
            res.send(
                (err.name === 'MongoError' && err.code === 11000) ?
                    {message: 'Email is already in use!'} : {message: err.message}
            );
        }
    });

    // TODO: need to block /api/login and /api/register for when a user is logged in!
    app.post('/api/login', passport.authenticate('local', {failureFlash: true}), (req, res) => {
            res.status(200).send('success');
        }
    );
    app.get('/api/loginMessage', (req, res) => {
        res.send(req.flash());
    })

    app.get('/api/current_user',(req, res) => {
        res.send(req.user);
    });

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send('logged out!');
    });
};
