const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: 'Email address is required!',
        trim: true,
        unique: true,
        lowercase: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please enter a valid email address!']
    },
    password: {
        type: String,
        required: 'Password is required!',
        trim: true,
        minlength: 6
    },
    name: { type: String, trim: true, required: 'Name is required!'},
    totalNumInvSent: { type: Number, default: 0 },
    totalNumRegistered: { type: Number, default: 0 },
    totalNumInvClicked: { type: Number, default: 0},
    invitedBy: { type: String, default: null },
    avatarSrc: { type: String, default: "https://mango-media-album.s3.us-west-2.amazonaws.com/1607485963493"},
    coverSrc: { type: String, default: "https://mango-media-album.s3.us-west-2.amazonaws.com/1607477768085" }
});

// once inv sent update totalNumInviteSent, by searching all db entries for invites model
// 

mongoose.model('users', userSchema);