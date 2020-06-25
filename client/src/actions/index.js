import axios from 'axios';
import {FETCH_USER, FETCH_MESSAGE, FETCH_POST} from "./types";

export const fetchUser = () => {
    return async dispatch => {
        const res = await axios.get('/api/current_user');

        dispatch({ type: FETCH_USER, payload: res.data.email });
    };
};

export const registerUser = (userInfo) => {
    return async dispatch => {
        const res = await axios.post('/api/register', userInfo);

        dispatch({ type: FETCH_MESSAGE, payload: res.data.message });
    };
};

export const createPost = (postBody) => {
    console.log('postBody: ' + JSON.stringify(postBody));
    return async dispatch => {
        const res = await axios.post('/api/postCreate', postBody);

        dispatch({ type: FETCH_POST, payload: res.data });
    };
};