import { combineReducers } from 'redux';
import authReducer from './authReducer';
import messageReducer from "./messageReducer";
import postReducer from "./postReducer";

export default combineReducers({
   auth: authReducer,
   message: messageReducer,
   post: postReducer
});