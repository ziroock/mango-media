const mongoose = require('mongoose');
const Post = mongoose.model('posts');

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
            res.send({ message: 'Post successful!' });
        } catch(err) {
            res.send({ message: err.message });
        }
    });
};