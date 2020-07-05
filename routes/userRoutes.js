const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = app => {

    app.get('/api/current_user',(req, res) => {
        if(req.user) {
            const {_id, email, name} = req.user;
            res.send({_id: _id, email: email, name: name});
        } else {
            res.send(req.user);
        }
    });

    //TODO: maybe add protection for if userId is invalid aka res.body is empty
    app.post('/api/getUserInfo',async (req, res) => {
        const { userId } = req.body;
        //console.log(req.body.userId);
        try {
            let userInfoFull = await User.findOne({_id: userId});
            // console.log( '###userInfo: ' + JSON.stringify(userInfoFull, null, 4) );
            const {_id, email, name} = userInfoFull;
            res.send({ _id, email, name });
        } catch(error) {
            console.log(error.message);
            res.send(null);
        }
    });

    app.post('/api/findUser', async (req, res) =>{

        if(req.body) {
            console.log(req.body.userId);
            try{
                const userExist = await User.findById(req.body.userId);
                console.log('userExist: ' + userExist);
                if(userExist) {
                    res.send({exist: true});
                }
            } catch(error) {
                console.log(error.message);
                res.send({exist: false});
            }
        }
    });

    app.get('/addName' , async (req, res) => {
        await User.updateOne(
            { _id: req.body._id },
            { $set: { 'name': req.body.name }});
        console.log(req.body._id);
        console.log(req.body.name);
        res.send('name added!')
    });

};