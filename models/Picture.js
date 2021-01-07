const mongoose = require('mongoose');
const { Schema } = mongoose;

//TODO: add comments, star instead of a like... or better mango?
const pictureSchema = new Schema({
    src: { type: String, required: 'Source href is required!' },
    desc: { type: String, default: '' },
    width: { type: Number, require: 'Picture Width is required!' },
    height: { type: Number, required: 'Picture Height is required!' },
    numberOfLikes: { type: Number, default: 0 },
    dateUploaded: { type: Date, required: 'Date Created is required!' },
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
    _album: { type: Schema.Types.ObjectId, ref: 'Album' },
});

mongoose.model('pictures', pictureSchema);
