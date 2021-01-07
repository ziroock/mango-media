const mongoose = require('mongoose');
const { Schema } = mongoose;

const connectionSchema = new Schema({
    _user: { type: Schema.Types.ObjectId, ref: 'User', unique: true },
    followers: [{ followerId: { type: Schema.Types.ObjectId, ref: 'User' } }],
    following: [{ followeeId: { type: Schema.Types.ObjectId, ref: 'User' } }],
    //cliques: [{ cliqueId: {type: Schema.Types.ObjectId, ref:'Clique'} }],
    numFollowers: { type: Number, default: 0 },
    numFollowing: { type: Number, default: 0 },
    //numCliques: Number,
});

mongoose.model('connections', connectionSchema);

/**
 * RELEASE PLAN
 *
 * 1. work on followers and following
 * 2. work on news feed
 * 3. create a clique page
 * 4. set up cliques and update feed
 *
 * **/
