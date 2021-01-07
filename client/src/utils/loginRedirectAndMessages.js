import axios from 'axios';

/*
 * This is a function that takes care of authentication by sending a post request
 * to the local login strategy, and receives the login message. On success it sends
 * an empty message and redirects the user to home page. TODO: send success not '' msg.
 *
 * It was build for the <Login/> component, because I needed a work around to make
 * the passport local login strategy authenticate correctly and also receive the error
 * messages sent by the flash error. Then I moved the code to it's own file.
 * */

export default async ({ email, password }) => {
  let loginMessage = '';
  try {
    await axios.post(
      '/api/login',
      { email: email, password: password },
      { headers: { 'content-type': 'application/json' } }
    );
    window.location = '/';
    return loginMessage;
  } catch (error) {
    console.log(error.message);
  }

  let res = await axios.get('/api/loginMessage');
  loginMessage = res.data.error[0];

  return await loginMessage;
};
