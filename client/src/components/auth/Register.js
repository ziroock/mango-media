import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions';

/*
* The Register component handles user changes to the Register form  and fields.
* - TODO: Make the front and back end to forbid the user from using
*    login or register if currently logged in.
*
* - handleSubmit(event):
*   + This function sends user email and password to the registerUser(state) action.
*   + Then based on the message received from the state of messageReducer it
*     redirects the newly registered person to the login field. This way I only
*     deal with one access point for Login.
* - handleChange(event):
*   + This is a general function that is used for both password and email fields.
*     It changes the specific state based on what field it comes from; email or pass.
* - render():
*   + This component renders the user Register form, that currently takes the following
*     information upon successful registering:
*     + Local Authentication Registering Fields:
*       + email
*       + password
*       + TODO: NEED TO ADD User Name ASAP
*       + TODO: Add more to user model: username, DOB (hash)
*     + TODO: Add Links for  Google, Facebook etc. Strategies and add auth id's
*             to user model. Get User Name, and other elements that I can get from
*             the above strategies and add to the users model. On successful
*             registry, when the user logs in show pop up to prompt user to
*             add any information that is still needed for the user model.
*   + Link to Google's suggestion for using autoComplete:
        + https://www.chromium.org/developers/design-documents/create-amazing-password-forms
* */


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: '', name: '', inviteId: 'none'};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    async handleSubmit(event) {
        event.preventDefault();
        await this.props.registerUser(this.state);
        if(this.props.message === 'Registration successful!') {
            window.location = "/login";
        }
    }

    render() {
        return (
            <div className="container">
                <h3>
                    Sign Up Form
                </h3>
                <p className="red-text">
                    {this.props.message}
                </p>
                <form onSubmit={this.handleSubmit} method="post">
                    <div>
                        <label>Name</label>
                        <input type="text" name="name" autoComplete="name" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="text" name="email" autoComplete="username" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password" autoComplete="new-password" onChange={this.handleChange}/>
                    </div>
                    <button className="btn waves-effect waves-light teal accent-3" type="submit">Sign Up</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { message: state.message };
}

export default connect(mapStateToProps, { registerUser })(Register);
