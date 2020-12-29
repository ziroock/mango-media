const mongoose = require('mongoose');
const Connection = mongoose.model('connections');
const requireLogin = require('../middleware/requireLogin');

//1. Start by doing follow
//  - followz
//  - return follow list
//  - num followers & num following
//2. Start Clique ...

module.exports = app => {
    // in: follower: update following, followee: update followers
    app.post('/api/followUpdate', requireLogin, async (req, res) => {
        // follower is current user, followee is the user being followed
        const { followerId, followeeId } = req.body;
        if(followerId == req.user._id) {
            const following = await Connection.findOne({
                _user : followerId,
                'following.followeeId': followeeId
            },{'following.$' : 1});
            const follower = await Connection.findOne({
                _user : followeeId,
                'followers.followerId': followerId
                }, { 'followers.$' : 1}
            );
            try {
                // update following count and add new followeeId inside following arr
                if (!following) {
                    await Connection.updateOne(
                        {_user: followerId},
                        {
                            $push: {following: {followeeId}},
                            $inc: {numFollowing: 1}
                        },
                        { upsert: true }
                    );
                }
                //update followers count and add new followingId inside followers arr
                if (!follower) {
                    await Connection.updateOne(
                        { _user: followeeId },
                        {
                            $push: {followers: {followerId}},
                            $inc: {numFollowers: 1}
                        }, { upsert: true }
                    );
                }
            }catch(e) {
                console.log(e.message);
            }


        }
        res.send(req.body);
    });


}