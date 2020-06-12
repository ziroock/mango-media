import React, { Component } from 'react';
import { connect } from 'react-redux';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {email: '', password: ''};

        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmailChange(event) {
        this.setState({email:event.target.value});
    }
    handlePasswordChange(event) {
        this.setState({password:event.target.value});
    }

    handleSubmit(event) {
        console.log('Email: ' + this.state.email + '\nPassword: ' + this.state.password);
        event.preventDefault();
    }

    render() {
        return (
            <div className="container">
                <h3>
                    Sign Up Form
                </h3>
                <form onSubmit={this.handleSubmit} method="post">
                    <div>
                        <label>Email:</label>
                        <input type="text" name="email" autoComplete="username" onChange={this.handleEmailChange}/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password" autoComplete="new-password" onChange={this.handlePasswordChange}/>
                    </div>
                    <button className="btn waves-effect waves-light teal accent-3" type="submit">Sign Up</button>
                </form>
            </div>
        );
    }
}

export default connect()(Register);