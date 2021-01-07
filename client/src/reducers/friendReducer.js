import {FETCH_FRIEND} from '../actions/types';

// if state null ( don't know what is happening may be slow internet ... )
// action.payload || false returns the user_id or if '' returns false

// TODO: Need to make sure that only the user_id or username is what is seen
export default function(state = {
        friendId: null,
        name: null,
        avatarSrc: null,
        coverSrc: null,
        numFollowing: 0,
        numFollowers: 0
    }, action) {
    // console.log('Action type; ', action.type);
    switch (action.type) {
        case FETCH_FRIEND:
            // console.log(action.payload);
            return action.payload;
        default:
            return state;
    }
};