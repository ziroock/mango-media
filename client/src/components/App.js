import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
const Home = () => <h2>Home</h2>;
const Dashboard = () => <h2>Dashboard</h2>;
const Login = () => <h2>Login</h2>;
const Register = () => <h2>Register</h2>;

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <div>
                        <Header/>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/dashboard" component={Dashboard}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, actions)(App);
