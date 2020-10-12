import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import messageReducer from "./messageReducer";
import postReducer from "./postReducer";

export default combineReducers({
   auth: authReducer,
   message: messageReducer,
   post: postReducer,
   form: reduxForm
});