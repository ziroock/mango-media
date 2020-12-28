const mongoose = require('mongoose');
// const User = mongoose.model('users');
const Connection = mongoose.model('connections');
const requireLogin = require('../middleware/requireLogin');

module.exports = app => {
    //1. Start by doing follow
    //  - followz
    //  - return follow list
    //  - num followers & num following
    //2. Start Clique ...
    // in: follower: update following, followee: update followers
    app.post('/api/followUpdate', requireLogin, async (req, res) => {
        const { followerId, followeeId } = req.body;
        if(followerId == req.user._id) {
            // update following count and add new followeeId inside following arr
            await Connection.updateOne(
                {
                    _user: followerId
                },
                {
                    $inc: { numFollowing: 1 },
                    $push: { following: followeeId }
                },
                {
                    upsert: true,
                    new: true
                }
            ).exec();

            await Connection.updateOne(
                {
                    _user: followeeId
                },
                {
                    $inc: { numFollowers: 1 },
                    $push: { followers: followerId }
                },
                {
                    upsert: true,
                    new: true
                }
            ).exec();

            //update followers count and add new followingId inside followers arr
        }
        res.send(req.body);
    });


}