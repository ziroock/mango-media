import React, { Component } from 'react';
import loginRedirectAndMessages from '../../utils/loginRedirectAndMessages';
import leaf from '../../images/img/vector@2x.svg';
import logoM from '../../images/img/vector-3@2x.svg';
import logoA from '../../images/img/vector-4@2x.svg';
import logoN from '../../images/img/vector-5@2x.svg';
import logoG from '../../images/img/vector-6@2x.svg';
import logoO from '../../images/img/vector-2@2x.svg';
import mangoBack from '../../images/img/mango-body-1@1x.svg';
import mangoFront from '../../images/img/mango-body-2@1x.svg';
import googleG from '../../images/img/vector-12@2x.svg';
import googleO1 from '../../images/img/vector-7@2x.svg';
import googleO2 from '../../images/img/vector-8@2x.svg';
import googleG2 from '../../images/img/vector-9@2x.svg';
import googleL from '../../images/img/vector-10@2x.svg';
import googleE from '../../images/img/vector-11@2x.svg';

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

  render() {
    return (
      <div className="container-center-horizontal">
        <input type="hidden" id="anPageName" name="page" value="iphone-11-pro-x-login" />
        <div className="iphone-11-pro-x-login screen">
          <div className="overlap-group-C61RwL">
            <div className="mango-leaf-1-4eduM0">
              <img className="vector-UmjNA0" src={leaf} />
            </div>
            <div className="mango-leaf-2-4eduM0">
              <img className="vector-h7jCNL" src={leaf} />
              <div className="mango-logo-1-h7jCNL"></div>
            </div>
            <div className="mango-logo-4eduM0">
              <img className="vector-ITwlaw" src={logoM} />
              <img className="vector-kF3OYB" src={logoA} />
              <img className="vector-cOJLMb" src={logoN} />
              <img className="vector-M9ep39" src={logoG} />
              <img className="vector-RSbzDa" src={logoO} />
            </div>
          </div>
          <div className="overlap-group1-C61RwL">
            <img className="mango-body-1-RH0WJ5" src={mangoBack} />
            <img className="mango-body-2-RH0WJ5" src={mangoFront} />
            <form onSubmit={this.handleSubmit} method="post" action="/api/login">
              <div className="email-RH0WJ5 roboto-normal-white-18px">Email</div>
              <input
                className="email-entry-RH0WJ5 smart-layers-pointers"
                name="email-entry5"
                placeholder={curr_user.email}
                type="text"
                onChange={this.handleChange}
              />
              <div className="password-RH0WJ5 roboto-normal-white-18px">Password</div>
              <input
                className="log-in-entrry-RH0WJ5 smart-layers-pointers"
                name="password"
                placeholder={curr_user.password}
                type="password"
                autoComplete="new-password"
                onChange={this.handleChange}
              />
              <button className="log-in-RH0WJ5 roboto-normal-screamin-green-18px" type="Submit">
                Sign In
              </button>
            </form>
            <div className="x-or-RH0WJ5 roboto-normal-white-15px">--- or ---</div>
            <div className="g-oath-RH0WJ5">
              <div className="sign-up-with-OxrrSj roboto-normal-white-18px">Sign up with</div>
              <div className="google201-gperiod-1-OxrrSj">
                <img className="vector-j5tZqK" src={googleG} />
                <div className="overlap-group2-j5tZqK">
                  <img className="vector-fxDdQu" src={googleO1} />
                  <img className="vector-L9OufT" src={googleO2} />
                </div>
                <img className="vector-2exuDX" src={googleG2} />
                <img className="vector-x5hCTx" src={googleL} />
                <img className="vector-kB2ba9" src={googleE} />
              </div>
            </div>
            <a href="iphone-11-pro-x-register.html">
              <div className="sign-up-RH0WJ5 roboto-normal-screamin-green-18px">Sign up</div>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

// (
//     <form onSubmit={this.handleSubmit} method="post" action="/api/login">
//       <p className="red-text">{this.state.message}</p>
//       <div>
//         <div className="email-RH0WJ5 roboto-normal-white-18px">Email</div>
//         <input
//             className="log-in-entrry-RH0WJ5 smart-layers-pointers"
//             name="email"
//             placeholder={curr_user.email}
//             type="text"
//             onChange={this.handleChange}
//         />
//       </div>
//       <div>
//         <div className="password-RH0WJ5 roboto-normal-white-18px">Password</div>
//         <input
//             className="log-in-entrry-RH0WJ5 smart-layers-pointers"
//             name="password"
//             placeholder={curr_user.password}
//             type="password"
//             autoComplete="new-password"
//             onChange={this.handleChange}
//         />
//       </div>
//       <button className="log-in-RH0WJ5 roboto-normal-screamin-green-18px" type="Submit">
//         Sign In
//       </button>
//     </form>
// )

// render() {
//   return (
//     <div className="container">
//       <h3>SIGN IN FORM</h3>
//       <p className="red-text">{this.state.message}</p>
//
//       <form onSubmit={this.handleSubmit} method="post" action="/api/login">
//         <div>
//           <label>Email:</label>
//           <input
//             type="text"
//             name="email"
//             autoComplete="username"
//             onChange={this.handleChange}
//             placeholder={curr_user.email}
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             name="password"
//             autoComplete="new-password"
//             onChange={this.handleChange}
//             placeholder={curr_user.password}
//           />
//         </div>
//         <button className="btn waves-effect waves-light teal accent-3" type="Submit">
//           Sign In
//         </button>
//       </form>
//     </div>
//   );
// }
