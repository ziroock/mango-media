import { FETCH_PICTURE } from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_PICTURE:
            console.log(action.payload);
            return action.payload.pictures;
        default:
            return state;
    }
};