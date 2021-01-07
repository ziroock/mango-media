import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

import Header from './header/Header';
import Register from './auth/Register';
import Login from './auth/Login';
import ProfileDashboard from './dashboard/ProfileDashboard';
import InvitationNew from './invitation/InvitationNew';
import RegisterInvite from './auth/RegisterInvite';
import PersonalGallery from './dashboard/photos/PersonalGallery';
import MangoFeed from './feed/MangoFeed';
import '../style/style.css';
import '../style/style.personalGallery.css';
import '../style/style.profileDashboard.css';
import '../style/style.mangoPost.css';

/*
 * The App Component is the what puts everything together! It is where the
 * routes to the parent components are handled. To achieve this I am using
 * BrowserRouter and Route from react-router-dom.
 * TODO: Re-route unknown routes to home or print a message
 *
 * - ComponentDidMount():
 *   + The function triggers a fetchUser() action, which receives the
 *      current user state and sends it to the authReducer.
 * */

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div id="App">
        <BrowserRouter>
          <div>
            <Header id="header" />
            <Route exact path="/" render={props => <MangoFeed {...props} userId={this.props.auth._id} />} />
            <Route
              exact
              path="/dashboard/:userId"
              render={props => <ProfileDashboard {...props} userId={this.props.auth._id} />}
            />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/registerInvite*" component={RegisterInvite} />
            <Route path="/invitation/new" render={props => <InvitationNew {...props} userId={this.props.auth._id} />} />
            <Route path="/photoGallery/:userId" component={PersonalGallery} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

// Moving the auth reducer and the auth state to App so I can have the user info
// through out all the components...
function mapStateToProps({ auth }) {
  return { auth: auth };
}

export default connect(mapStateToProps, { fetchUser })(App);
