import { FETCH_USER } from '../actions/types';

// if state null ( don't know what is happening may be slow internet ... )
// action.payload || false returns the user_id or if '' returns false

// TODO: Need to make sure that only the user_id or username is what is seen
export default function(state = { id_: null, email: null }, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload;
    default:
      return state;
  }
}
