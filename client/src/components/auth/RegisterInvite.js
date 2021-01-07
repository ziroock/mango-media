import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerUser } from '../../actions';

class RegisterInvite extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', name: '', inviteId: '' };
    let inviteId = window.location.pathname.split('/')[2];
    console.log(inviteId);
    this.state.inviteId = inviteId;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    await this.props.registerUser(this.state);
    if (this.props.message === 'Registration successful!') {
      window.location = '/login';
    }
  }

  render() {
    return (
      <div className="container">
        <h3>Invitation Registration</h3>
        <p className="red-text">{this.props.message}</p>
        <form onSubmit={this.handleSubmit} method="post">
          <div>
            <label>Name</label>
            <input type="text" name="name" autoComplete="name" onChange={this.handleChange} />
          </div>
          <div>
            <label>Email:</label>
            <input type="text" name="email" autoComplete="username" onChange={this.handleChange} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" autoComplete="new-password" onChange={this.handleChange} />
          </div>
          <button className="btn waves-effect waves-light teal accent-3" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { message: state.message };
}

export default connect(mapStateToProps, { registerUser })(RegisterInvite);
