const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = app => {
    app.post('/api/register', async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(422).send('Please enter username and password!');
            return null;
        }

        const user = new User({ email: email, password: password });

        try {
            await user.save();
            res.send('Registration successful!');
        } catch(err) {
            res.status(409).send(
                (err.name === 'MongoError' && err.code === 11000) ? 'Email is already in use!' : err.message
            );
        }
    });

    app.get('/api/login', (req, res) => {
       res.send({});
    });

    // TODO: need to add error handling for wrong user name or wrong password
    app.post('/api/login',
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/api/login',
            failureFlash: false
        })
    );

    app.get('/api/current_user',(req, res) => {
        console.log(req.user);
        res.send(req.user);
    });

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send('logged out!');
    });
};