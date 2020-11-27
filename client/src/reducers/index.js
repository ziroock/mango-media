import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import messageReducer from "./messageReducer";
import postReducer from "./postReducer";
import photoReducer from "./photoReducer";

export default combineReducers({
   auth: authReducer,
   message: messageReducer,
   post: postReducer,
   photo: photoReducer,
   form: reduxForm
});