import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Register extends Component {
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
        this.props.registerUser(this.state);
    }

    // Link for why to use autoComplete
    //   https://www.chromium.org/developers/design-documents/create-amazing-password-forms
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
    // console.log(state.register);
    return { message: state.register };
}

export default connect(mapStateToProps, actions)(Register);