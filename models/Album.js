const mongoose = require('mongoose');
const { Schema } = mongoose;
const PictureSchema = require('./Picture');

const albumsSchema = new Schema({
    name: String,
    description: { String, default: "Add description to your Album!"},
    album: [PictureSchema],
    numPictures: { type: Number, default: 0 },
    _user: { type: Schema.Types.ObjectId, ref:'User' },
    dateCreated: Date
});
// When scaling, I need to worry about garbage collection. Think about deleting
// the invites sent every two weeks or every month or so...

mongoose.model('Albums', albumsSchema);