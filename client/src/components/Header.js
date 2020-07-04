import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

class Header extends Component {
    renderContent() {
        switch(this.props.auth) {
            case null:
                return;
            case false:
                return [
                    <li key="1"><a href="/login">Sign In</a></li>,
                    <li key="2" className="teal accent-3"><a href="/register">Sign Up</a></li>
                ];
            default:
                return [
                    <li key="1"><Link to={ `/dashboard/${this.props.auth}`}>Profile</Link></li>,
                    <li key="2"><a href="/api/logout">Log Out</a></li>
                    ];
        }
    }

    render() {
        // console.log(this.props);
        return (
            <div className="navbar-fixed">
                <nav>
                    <div className="nav-wrapper  green darken-2">
                        <div style={{ margin: '0 1em'}}>
                            <a href="/" className="left brand-logo">Mango</a>
                            <ul id="nav-mobile" className="right">
                                { this.renderContent() }
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

// Gets called with the entire state statement our of the reduxStore
function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);