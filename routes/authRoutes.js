const passport = require('passport');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = mongoose.model('users');
const requireLogin = require('../middleware/requireLogin');

/**
* The file is containing all the auth server routes.
* TODO: need to block /api/login and /api/register for when a user is logged in!
*  a.k.a. add the appropriate middleware to handle server side access control.
*
* - post('/api/register'):
*   + This function checks the validity of the values entered by the user.
*   + Then if everything is valid save the user.
*   + On save success send 'Registration successful!' (used by Register comp)
*   + On failure overwrite and send the email already in use message.
*
* - post('/api/login'):
*   + Triggers the passport local authentication process and updates the flash
*     message.
*   + On success send status 200 and success.
* - app.get('/api/loginMessage'):
*   + Sends the flash message from local login.
* - app.get('/api/logout'):
*   + Logs out the current user and redirects to home page.
* - get('/api/updatePassword'):
*   + This route was used only temporarily to hash the passwords to already
*     existing users.
*   + TODO: Edit the route and make usable/secure to be ready to connect to
*      the client. Make Settings to change some user values inside the usr model.
*
* */

module.exports = app => {
    app.post('/api/register', async (req, res) => {
        let { email, password, name, inviteId } = req.body;
        if (!email || !password) {
            res.send({message: 'Please enter name, email and password!'});
            return null;
        }
        //TODO: Fix user validation errors to better ones
        password = bcrypt.hashSync(password);
        const user = new User({ email: email, password: password, name: name });

        try {
            await user.save();
            //updateCount write a function for that
            console.log('inviteId: ' + inviteId);

            res.send({message: 'Registration successful!'});
        } catch(err) {
            res.send(
                (err.name === 'MongoError' && err.code === 11000) ?
                    {message: 'Email is already in use!'} : {message: err.message}
            );
        }
    });

    app.post('/api/login', passport.authenticate('local', {failureFlash: true}), (req, res) => {
            res.status(200).send('success');
        }
    );

    app.get('/api/loginMessage', (req, res) => {
        res.send(req.flash());
    })

    app.get('/api/updatePassword', requireLogin, async (req, res) => {
        let password = bcrypt.hashSync('password');

        await User.updateOne(
            { _id: req.body._id },
            { $set: { 'password': password }});
        console.log(req.body._id);
        console.log(password);
        res.send('password updated!')
    });

    app.get('/api/logout', requireLogin, (req, res) => {
        req.logout();
        res.redirect('/');
    });
};
