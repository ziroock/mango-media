const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: 'Email address is required!',
        trim: true,
        unique: true,
        lowercase: true,
        match: [/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address!']
    },
    password: {
        type: String,
        required: 'Password is required!',
        trim: true,
        minlength: 6
    },
    name: { type: String, trim: true, required: 'Name is required!'},
    totalNumInvSent: { type: Number, default: 0 },
    totalNumInvAccept: { type: Number, default: 0 },
    totalNumInvClicked: { type: Number, default: 0},
    invitedBy: { type: String, default: null }
});

// once inv sent update totalNumInviteSent, by searching all db entries for invites model
// 

mongoose.model('users', userSchema);