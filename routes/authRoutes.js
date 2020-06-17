const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = app => {
    app.post('/api/register', async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            //.status(422)
            res.send({message: 'Please enter username and password!'});
            return null;
        }
        //console.log('email: ' + email + '\npassword: ' + password);
        //TODO: Fix user validation errors to better ones
        const user = new User({ email: email, password: password });

        try {
            await user.save();
            res.send({message: 'Registration successful!'});
        } catch(err) {
            //.status(409)
            res.send(
                (err.name === 'MongoError' && err.code === 11000) ?
                    {message: 'Email is already in use!'} : {message: err.message}
            );
        }
    });

    // TODO: need to add error handling for wrong user name or wrong password
    // app.post('/api/login',
    //     (req, res, next) => {
    //         passport.authenticate('local', (error, user, info) => {
    //             console.log(error);
    //             console.log(user);
    //             console.log(info);
    //
    //             if (error) {
    //                 res.send(error);
    //             } else if (!user) {
    //                 res.send(info);
    //             } else {
    //                 next();
    //             }
    //         })(req, res, next);
    //     },
    //     (req, res) => {
    //         res.status(200).send({ message: 'Logged in!' });
    //     }
    // );

    app.post('/api/login', passport.authenticate('local'), (req, res) => {
            res.send(200, 'success');
        }
    );

    app.get('/api/current_user',(req, res) => {
        //console.log(req.user);
        res.send(req.user);
    });

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send('logged out!');
    });
};
