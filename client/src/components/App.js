import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

import Header from './header/Header';
import Register from './auth/Register';
import Login from "./auth/Login";
import ProfileDashboard from './dashboard/ProfileDashboard';
import InvitationNew from './invitation/InvitationNew';
import RegisterInvite from './auth/RegisterInvite';
import '../style/style.css';
import '../style/style.personalGallery.css';
import PersonalGallery from "./dashboard/photos/PersonalGallery";
const Home = () => <h2>Home</h2>;

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
                        <Header id="header"/>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/dashboard/:userId" component={ProfileDashboard}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                        <Route path="/registerInvite*" component={RegisterInvite}/>
                        <Route path="/invitation/new" component={InvitationNew}/>
                        <Route path="/photoGallery/:userId" component={PersonalGallery}/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, { fetchUser })(App);
