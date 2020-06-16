import { combineReducers } from 'redux';
import authReducer from './authReducer';
import registerReducer from "./registerReducer";
//import loginReducer from "./loginReducer";

export default combineReducers({
   auth: authReducer,
   register: registerReducer,
   //login: loginReducer
});