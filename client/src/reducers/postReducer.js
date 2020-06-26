import { FETCH_POST, SUBMIT_POST } from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_POST:
            return action.payload;
        case SUBMIT_POST:
            return state;
        default:
            return state;
    }
};
