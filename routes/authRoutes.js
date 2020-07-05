const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = mongoose.model('users');

module.exports = app => {
    app.post('/api/register', async (req, res) => {
        let { email, password } = req.body;
        if (!email || !password) {
            res.send({message: 'Please enter username and password!'});
            return null;
        }
        //TODO: Fix user validation errors to better ones
        password = bcrypt.hashSync(password);
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

    app.get('/api/updatePassword' , async (req, res) => {
        let password = bcrypt.hashSync('password');

        await User.updateOne(
            { _id: req.body._id },
            { $set: { 'password': password }});
        console.log(req.body._id);
        console.log(password);
        res.send('password updated!')
    });

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
};
