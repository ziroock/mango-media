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

    // app.post('/api/login',
    //     passport.authenticate('local', {
    //         successRedirect: '/',
    //         failureRedirect: '/api/login',
    //         failureFlash: false
    //     })
    // );

    app.post('/api/login',
        // wrap passport.authenticate call in a middleware function
        function (req, res, next) {
            // call passport authentication passing the "local" strategy name and a callback function
            passport.authenticate('local', function (error, user, info) {
                // this will execute in any case, even if a passport strategy will find an error
                // log everything to console
                //console.log(error);
                console.log(user);
                //console.log(info);

                if (error) {
                    res.status(401).send(error);
                    return;
                } else if (!user) {
                    res.status(401).send(info);
                    return;
                } else {
                    next();
                }
                res.status(401).send(info);
            })(req, res);
        },

        // function to call once successfully authenticated
        function (req, res) {
            res.status(200).send('logged in!');
        }
    );

    app.get('/api/current_user',(req, res) => {
        console.log(req.user);
        res.send(req.user);
    });

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send({});
    });
};