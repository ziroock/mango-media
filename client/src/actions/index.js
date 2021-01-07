import axios from 'axios';
import { FETCH_USER, FETCH_MESSAGE, FETCH_POST, FETCH_INVITE, FETCH_PICTURE, FETCH_FRIEND, FETCH_FEED } from './types';

// =====================================================================
// ==============================USER===================================
// =====================================================================
export const fetchUser = () => {
  return async dispatch => {
    const res = await axios.get('/api/current_user');
    let payload = res.data;
    // console.log(res.data);
    if (!res.data) {
      payload = { _id: false, email: false };
    }

    dispatch({ type: FETCH_USER, payload: payload });
  };
};

export const fetchFriend = friendId => {
  // console.log(friendId);
  return async dispatch => {
    const res = await axios.post('/api/current_friend', friendId);
    let payload = res.data;
    // console.log(res.data);
    if (!res.data) {
      payload = { friendId: false, name: false };
    }

    dispatch({ type: FETCH_FRIEND, payload: payload });
  };
};

export const newFollow = (followingId, followeeId) => async dispatch => {
  // console.log(followingId);
  // console.log(followeeId);
  const res = await axios.post('/api/followUpdate', {
    followerId: followingId,
    followeeId: followeeId,
  });
  let payload = res.data;
  // console.log(res.data);
  if (!res.data) {
    payload = { friendId: false, name: false };
  }

  dispatch({ type: FETCH_FRIEND, payload: payload });
};

export const fetchFeed = () => async dispatch => {
  const res = await axios.post('/api/feed');
  let payload = res.data;
  dispatch({ type: FETCH_FEED, payload: payload });
};

//does the same as the rest, but contracted syntax
export const submitInvite = (values, history) => async dispatch => {
  const res = await axios.post('/api/invite', values);

  // Redirects to home after submit on an invite send
  history.push('/');
  dispatch({ type: FETCH_INVITE, payload: res.data });
};

export const registerUser = userInfo => {
  // console.log(userInfo.email);
  return async dispatch => {
    const res = await axios.post('/api/register', userInfo);

    dispatch({ type: FETCH_MESSAGE, payload: res.data.message });
  };
};

// =====================================================================
// ==============================POST===================================
// =====================================================================

export const createPost = postBody => {
  // console.log('posoststBody: ' + JSON.stringify(postBody));
  return async dispatch => {
    const res = await axios.post('/api/postCreate', postBody);

    dispatch({ type: FETCH_POST, payload: res.data });
  };
};

export const fetchPosts = userId => {
  return async dispatch => {
    const res = await axios.post('/api/postSend', userId);

    dispatch({ type: FETCH_POST, payload: res.data });
  };
};

export const deletePost = postId => {
  return async dispatch => {
    const res = await axios.post('/api/postDelete', postId);

    dispatch({ type: FETCH_POST, payload: res.data });
  };
};

export const editPost = postInfo => {
  return async dispatch => {
    const res = await axios.post('/api/postEdit', postInfo);

    dispatch({ type: FETCH_POST, payload: res.data });
  };
};

// =====================================================================
// =============================PICTURE=================================
// =====================================================================

export const fetchPicture = userId => {
  return async dispatch => {
    const res = await axios.post('/api/pictureSend', userId);

    dispatch({ type: FETCH_PICTURE, payload: res.data });
  };
};

export const uploadPicture = (pictureBody, uploadType) => {
  // console.log(uploadType);
  // https://stackoverflow.com/questions/54997224/formdata-append-json
  pictureBody.append('uploadType', uploadType);
  // console.log(pictureBody);
  return async dispatch => {
    const res = await axios.post('/api/uploadPicture', pictureBody, {
      headers: { 'content-type': 'multipart/form-data' },
    });

    dispatch({ type: FETCH_PICTURE, payload: res.data });
  };
};

export const deletePicture = picId => {
  // console.log("PicID: ", picId);
  return async dispatch => {
    const res = await axios.post('/api/pictureDelete', picId);

    dispatch({ type: FETCH_PICTURE, payload: res.data });
  };
};
