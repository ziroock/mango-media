const mongoose = require('mongoose');
const User = mongoose.model('users');
const requireLogin = require('../middleware/requireLogin');

/**
* This file contains the routes related to the user.
*
* - app.get('/api/current_user'):
*   + This is a get request to send the current user info. If the user is
*     logged in the info is send, else the response is empty.
* - app.post('/api/geUserInfo'):
*   + This is a post request that receives the a user id.
*   + If the user exists within the data base send user info, else send null.
* - app.post('/api/findUser'):
*   + This is a post request that receives the user's Name.
*   + If users with this name exist, return an array of this users info.
*   + TODO: Need to find a user and compare user names without case sensitivity!
*      example: Mac Miller needs to be considered the same as mac miller.
* - app.get('/addName'):
*   + This is a temporary function to add Name to user model. It was used to
*     populate the user model after I added user name to it.
*   + TODO: Keep for now and figure out if I will need to use it on the client.
* */


module.exports = app => {

    app.get('/api/current_user',(req, res) => {
        if(req.user) {
            const {_id, email, name} = req.user;
            res.send({_id: _id, email: email, name: name});
        } else {
            res.send(req.user);
        }
    });

    app.post('/api/getUserInfo', requireLogin, async (req, res) => {
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


    app.post('/api/findUser', requireLogin, async (req, res) =>{
        if(req.body) {
            console.log(req.body.userName);
            try{
                const userArray = await User.find({name: req.body.userName}).select({ password: false, __v: false });
                console.log(userArray);
                res.send(userArray);
            } catch(error) {
                console.log(error.message);
                res.send([]);
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