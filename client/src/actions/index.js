import axios from 'axios';
import {FETCH_USER, FETCH_MESSAGE, FETCH_POST, FETCH_INVITE, FETCH_PICTURE} from "./types";

export const fetchUser = () => {
    return async dispatch => {
        const res = await axios.get('/api/current_user');
        let payload = res.data;
        console.log(res.data);
        if(!res.data) {
            payload = {_id: false, email: false };
        }

        dispatch({ type: FETCH_USER, payload: payload });
    };
};

//does the same as the rest, but contracted syntax
export const submitInvite = (values, history) => async dispatch => {
    const res = await axios.post('/api/invite', values);

    // Redirects to home after submit on an invite send
    history.push('/');
    dispatch({ type: FETCH_INVITE, payload: res.data});
}

export const registerUser = (userInfo) => {
    console.log(userInfo.email);
    return async dispatch => {
        const res = await axios.post('/api/register', userInfo);

        dispatch({ type: FETCH_MESSAGE, payload: res.data.message });
    };
};

export const createPost = (postBody) => {
    console.log('posoststBody: ' + JSON.stringify(postBody));
    return async dispatch => {
        const res = await axios.post('/api/postCreate', postBody);

        dispatch({ type: FETCH_POST, payload: res.data });
    };
};

export const fetchPosts = (userId) => {
    return async dispatch => {
      const res = await axios.post('/api/postSend', userId);

      dispatch({ type: FETCH_POST, payload: res.data });
    };
};

export const deletePost = (postId) => {
    return async dispatch => {
        const res = await axios.post('/api/postDelete', postId);

        dispatch({ type: FETCH_POST, payload: res.data });
    };
};

export const editPost = (postInfo) => {
    return async dispatch => {
        const res = await axios.post('/api/postEdit', postInfo);

        dispatch({ type: FETCH_POST, payload: res.data });
    };
};


export const fetchPicture = (userId) => {
    console.log("USER ID INSIDE ACTION:");
    console.log(userId);
    return async dispatch => {
        const res = await axios.post('/api/pictureSend', userId);

        dispatch({ type: FETCH_PICTURE, payload: res.data });
    };
};



