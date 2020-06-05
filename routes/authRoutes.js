const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = app => {

    app.get('/api/register', async (req, res) => {
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
};