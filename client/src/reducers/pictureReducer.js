import { FETCH_PICTURE } from '../actions/types';

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_PICTURE:
            console.log("BABA QAGA");
            console.log(action.payload);
            return action.payload;
        default:
            return state;
    }
};