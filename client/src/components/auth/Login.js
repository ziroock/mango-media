import React, { Component } from 'react';
import axios from 'axios';

// TODO: Make it so you can't access login or register
// TODO:  if the user is logged in!!!

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        // console.log('Email: ' + this.state.email + '\nPassword: ' + this.state.password);
        event.preventDefault();

        axios.post(
            '/api/login',
            {email: this.state.email, password: this.state.password},
            {headers: {'content-type': 'application/json'}}
        )
        .then(function (response) {
        //handle success
            if (response.data === 'success') {
                window.location = "/"
            }
            console.log(response);
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });
    }


    // Link for why to use autoComplete
    //   https://www.chromium.org/developers/design-documents/create-amazing-password-forms
    // "
    //                <p className="red-text">
    //                     {this.props.message}
    //                 </p>
    render() {
        return (
            <div className="container">
                <h3>
                    SIGN IN FORM
                </h3>

                <form onSubmit={this.handleSubmit} method="post" action="/api/login">
                    <div>
                        <label>Email:</label>
                        <input type="text" name="email" autoComplete="username" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password" autoComplete="new-password" onChange={this.handleChange}/>
                    </div>
                    <button className="btn waves-effect waves-light teal accent-3" type="Submit" >Sign In</button>
                </form>
            </div>
        );
    }
}

export default Login;
