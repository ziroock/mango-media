const mongoose = require('mongoose');
const { Schema } = mongoose;

//TODO: add comments, star instead of a like... or better mango?
const postSchema = new Schema({
    body: String,
    dateCreated: Date,
    userName: String,
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
});

mongoose.model('posts', postSchema);
