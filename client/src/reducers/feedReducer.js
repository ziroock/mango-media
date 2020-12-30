import { FETCH_FEED } from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_FEED:
            return action.payload;
        default:
            return state;
    }
};