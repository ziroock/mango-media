const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = app => {

    app.get('/api/current_user',(req, res) => {
        if(req.user) {
            const {_id, email} = req.user;
            res.send({_id: _id, email: email});
        } else {
            res.send(req.user);
        }
    });

    app.post('/api/getUserInfo',async (req, res) => {
        const { userId } = req.body;
        //console.log(req.body.userId);
        try {
            let userInfoFull = await User.findOne({_id: userId});
            // console.log( '###userInfo: ' + JSON.stringify(userInfoFull, null, 4) );
            const {_id, email} = userInfoFull;
            res.send({ _id, email });
        } catch(error) {
            console.log(error.message);
            res.send(null);
        }

    });

};