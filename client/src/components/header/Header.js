import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchBar from "./SearchBar";

class Header extends Component {
    renderContent() {
        switch(this.props.auth._id) {
            case null:
                return;
            case false:
                return [
                    <li key="1"><a style={{fontSize: '20px' }} href="/login">Sign In</a></li>,
                    <li key="2" className="teal accent-3"><a style={{fontSize: '20px' }} href="/register">Sign Up</a></li>
                ];
            default:
                return [
                    <SearchBar key="1" />,
                    <li key="2"><a style={{fontSize: '20px' }} href={ `/dashboard/${this.props.auth._id}` }>Profile</a></li>,
                    <li key="3"><a style={{fontSize: '20px' }}  href="/api/logout">Log Out</a></li>
                    ];
        }
    }

    render() {
        // console.log(this.props);
        return (
            <div className="navbar-fixed">
                <nav>
                    <div className="nav-wrapper  green darken-2">
                        <div style={{ margin: '0 1em' }}>
                            <a href="/" className="left brand-logo" style={{fontSize: '30px' }}>Mango</a>
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
   //  console.log(state.auth);
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);