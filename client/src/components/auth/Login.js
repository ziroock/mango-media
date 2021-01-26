import React, { Component } from 'react';
import loginRedirectAndMessages from '../../utils/loginRedirectAndMessages';

/*
* The Login component handles user changes to the Login form  and fields.
* - TODO: Make the front and back end to forbid the user from using
*    login or register if currently logged in.
*
* - handleSubmit(event):
*   + This function sends user email and password to loginRedirectAndMessages
*   + It sets the received authentication error handling messages to message state.
* - handleChange(event):
*   + This is a general function that is used for both password and email fields.
*     It changes the specific state based on what field it comes from; email or pass.
* - render():
*   + This component renders the user Login form, that currently takes the following
*     information upon login:
*     + Local Authentication Fields:
*       + Login: email
*       + TODO: Add the ability to login with username, when I add username
*       + Password: password
*     + TODO: Add Links for  Google, Facebook etc. Strategies and add auth id's to user model.
*   + Link to Google's suggestion for using autoComplete:
        + https://www.chromium.org/developers/design-documents/create-amazing-password-forms
* */

const test_users = {
  test_user: { email: 'test@gmail.com', password: 'password' },
  tristan: { email: 'tristan@gmail.com', password: 'password' },
};

const curr_user = test_users.test_user;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: curr_user.email, password: curr_user.password, message: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    let loginMessage = await loginRedirectAndMessages(this.state);
    this.setState({ message: loginMessage });
  }

  // create an ellement that is the login first page from sketch
  render() {
    return (
      <div className="container">
        <h3>SIGN IN FORM</h3>
        <p className="red-text">{this.state.message}</p>

        <form onSubmit={this.handleSubmit} method="post" action="/api/login">
          <div>
            <label>Email:</label>
            <input
              type="text"
              name="email"
              autoComplete="username"
              onChange={this.handleChange}
              placeholder={curr_user.email}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              onChange={this.handleChange}
              placeholder={curr_user.password}
            />
          </div>
          <button className="btn waves-effect waves-light teal accent-3" type="Submit">
            Sign In
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
