import { FETCH_INVITE } from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_INVITE:
            return action.payload;
        default:
            return state;
    }
};