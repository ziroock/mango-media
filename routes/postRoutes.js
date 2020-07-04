const mongoose = require('mongoose');
const Post = mongoose.model('posts');

//TODO: create requireLogin middleware and add to: create, delete, edit and send

module.exports = app => {
    app.post('/api/postSend', async (req,res) => {
        const posts = await Post.find({ _user: req.body.userId });

        res.send(posts);
    });

    app.post('/api/postCreate', async (req, res) => {
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

    app.post('/api/postDelete', async (req, res) => {
        await Post.deleteOne({ _user: req.user.id, _id: req.body.postId });
        const posts = await Post.find({ _user: req.user.id });
        console.log(req.body);
        res.send(posts);
    });

    app.post('/api/postEdit', async (req, res) => {
        console.log('the update is: ' + req.body.body);
        console.log('the update postId is: ' + req.body.postId);
        await Post.updateOne(
            { _user: req.user.id, _id: req.body.postId },
            { $set: { 'body': req.body.body }});
        const posts = await Post.find({ _user: req.user.id });
        console.log(req.body);
        res.send(posts);
    });
};