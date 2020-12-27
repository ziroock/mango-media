const mongoose = require('mongoose');
const { Schema } = mongoose;

const cliqueSchema = new Schema({
    _owner: { type: Schema.Types.ObjectId, ref:'User'},
    clique: [{ friendId: { type: Schema.Types.ObjectId, ref:'User'} }],
    numFriends: { type: Number },
// posts:
// pictures:
});

mongoose.model('cliques', cliqueSchema);
