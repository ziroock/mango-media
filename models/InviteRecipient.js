const mongoose = require('mongoose');
const { Schema } = mongoose;

//TODO: add comments, star instead of a like... or better mango?
const inviteSchema = new Schema( {
    email: String,
    responded: {type: Boolean, default: false},
});

module.exports = inviteSchema;

/**
 * -DB in user model have inv sub-model: { numInvSent int, invBy str, invited arr( userId str), }
 * - Set up email inv system to send and track invites using sendGrid lie in emaily app.
 * - Make a special interface/page for invites in react.
 * - Do all the redux state savings using forms.
 * - Finish up all the wiring and test!
 * - HAVE FUN :)
 * **/