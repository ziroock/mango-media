const mongoose = require('mongoose');
const Post = mongoose.model('posts');

//TODO: create requireLogin middleware and add to both create and send

module.exports = app => {
    app.post('/api/postCreate', async (req, res) => {
        console.log(req.body);
        const { body } = req.body;

        if (!body) {
            res.send({message: 'Empty post, do not add!'});
            return null;
        }
        const post = new Post({ body: body, dateCreated: new Date(), _user: req.user.id });

        try {
            await post.save();
            console.log(body, "   " , req.user.id);
            const posts = await Post.find({ _user: req.user.id });
            res.send(posts);
        } catch(err) {
            res.send([{ message: err.message }]);
        }
    });

    app.get('/api/postSend', async (req,res) => {
        const posts = await Post.find({ _user: req.user.id });

        res.send(posts);
    });
};