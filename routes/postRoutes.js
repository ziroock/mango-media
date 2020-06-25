const mongoose = require('mongoose');
const Post = mongoose.model('posts');

module.exports = app => {
    app.post('/api/postCreate', async (req, res) => {
        console.log(req.body);
        const { body, _user } = req.body;
        if (!body) {
            res.send({message: 'Empty post, do not add!'});
            return null;
        }
        const post = new Post({ body: body, dateCreated: new Date(), _user: _user });

        try {
            //await post.save();
            res.send( {message: 'Post successful!', post: post} );
        } catch(err) {
            res.send( {message: err.message} );
        }
    });
};