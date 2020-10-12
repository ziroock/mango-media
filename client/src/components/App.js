import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

import Header from './header/Header';
import Register from './auth/Register';
import Login from "./auth/Login";
import ProfileDashboard from './dashboard/ProfileDashboard';
import InviationNew from './invitation/InvitationNew';
import '../style/style.css';
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
                        <Route path="/invitation/new" component={InviationNew}/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, { fetchUser })(App);
