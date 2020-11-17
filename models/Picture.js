const mongoose = require('mongoose');
const { Schema } = mongoose;

//TODO: add comments, star instead of a like... or better mango?
const pictureSchema = new Schema( {
    href: String,
    description: { String, default: "Add picture description." },
    numberOfLikes: { Number, default: 0},
    dateUploaded: Date,
    _user: { type: Schema.Types.ObjectId, ref:'User' },
    _album: { type: Schema.Types.ObjectId, ref:'Album' },
});

mongoose.model('pictures', pictureSchema);