const mongoose = require('mongoose');
const { Schema } = mongoose;
const InviteRecipientSchema = require('./InviteRecipient');

const invitesSchema = new Schema({
    title: String, // Set by default, dynamically with the name from the persons email ???
    body: String, // At first just do default statement like, Alexander invites oyu to join mongo media ...
    subject: String,
    recipients: [InviteRecipientSchema],
    numInvSent: { type: Number, default: 0 },
    numInvAccept: { type: Number, default: 0},
    _user: { type: Schema.Types.ObjectId, ref:'User' },
    dateSent: Date,
    lastResponded: Date
});
// When scaling, I need to worrry about garbage collection. Think about deleting
// the invites sent every two weeks or every month or so...

mongoose.model('invites', invitesSchema);