const mongoose = require('mongoose');
const Post = mongoose.model('posts');
const requireLogin = require('../middleware/requireLogin');

//TODO: create requireLogin middleware and add to: create, delete, edit and send

/**
 * This file takes care of the requests for Profile Posts
 * TODO: need to block /api/login and /api/register for when a user is logged in!
 *  a.k.a. add the appropriate middleware to handle server side access control.
 *
 * - app.post('/api/postSend'):
 *   + This function sends all the posts that were found for the specific
 *     user.
 * - app.post('/api/postSend'):
 *   + This function receives the post body and the user id for the post.
 *   + Then it adds the post to the Post model inside the DB.
 * - app.post('postDelete'):
 *   + This function receives user ID and ID of the post ot be deleted.
 *   + Then it sends the user posts that are left, to update on the page.
 * - app.post('api/postEdit'):
 *   + This function receives user ID, ID of the post ot be edited and body.
 *   + Then it updates the body inside the model.
 *   + Once done with the above it sends the user posts with the edit, in order
 *     to update hte page.
 */


module.exports = app => {
    app.post('/api/postSend', requireLogin, async (req,res) => {
        const posts = await Post.find({ _user: req.body.userId });

        res.send(posts);
    });

    app.post('/api/postCreate', requireLogin, async (req, res) => {
        const { body } = req.body;
        const post = new Post({ body: body, dateCreated: new Date(), _user: req.user.id });

        try {
            if (body) {
                await post.save();
            } else {
                console.log({message: 'Empty post, do not add!'});
            }
        } catch(err) {
            console.log({ message: err.message });
        }

        const posts = await Post.find({ _user: req.user.id });
        res.send(posts);
    });

    app.post('/api/postDelete', requireLogin, async (req, res) => {
        await Post.deleteOne({ _user: req.user.id, _id: req.body.postId });
        const posts = await Post.find({ _user: req.user.id });
        console.log(req.body);
        res.send(posts);
    });

    app.post('/api/postEdit', requireLogin, async (req, res) => {
        // console.log('the update is: ' + req.body.body);
        // console.log('the update postId is: ' + req.body.postId);
        await Post.updateOne(
            { _user: req.user.id, _id: req.body.postId },
            { $set: { 'body': req.body.body }});
        const posts = await Post.find({ _user: req.user.id });
        // console.log(req.body);
        res.send(posts);
    });
};