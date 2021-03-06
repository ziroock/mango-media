import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import messageReducer from "./messageReducer";
import postReducer from "./postReducer";
import pictureReducer from "./pictureReducer";
import friendReducer from "./friendReducer";

export default combineReducers({
   auth: authReducer,
   message: messageReducer,
   post: postReducer,
   picture: pictureReducer,
   form: reduxForm,
   friend: friendReducer
});