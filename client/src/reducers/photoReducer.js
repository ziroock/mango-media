import { FETCH_PHOTO } from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_PHOTO:
            return action.payload;
        default:
            return state;
    }
};