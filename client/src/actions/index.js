import axios from 'axios';
import {FETCH_USER, REGISTER_USER} from "./types";

export const fetchUser = () => {
    return async dispatch => {
        const res = await axios.get('/api/current_user');

        dispatch({ type: FETCH_USER, payload: res.data.email });
    };
};

export const registerUser = (userInfo) => {
    return async dispatch => {
        const res = await axios.post('/api/register', userInfo);

        dispatch({ type: REGISTER_USER, payload: res.data.message });
    };
};