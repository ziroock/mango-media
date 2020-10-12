import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBar from "./SearchBar";


/**
* The Header Component is a navigation bar fixed at the top of every page. It renders
* based on conditional logic received from the authReducer.
*
* - renderContent():
*   + This function renders different Header values base on authReducer _id value.
*   + In case no response or page is not loaded show nothing.
*   + In case the user is not authenticated show login and register links.
*   + In case user is logged in then show SearchBar Component , Profile and Log Out links.
* */


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
                    <li key="4"><a style={{fontSize: '20px' }} href="/invitation/new">Invitations</a></li>,
                    <li key="2"><a style={{fontSize: '20px' }} href={ `/dashboard/${this.props.auth._id}` }>Profile</a></li>,
                    <li key="3"><a style={{fontSize: '20px' }} href="/api/logout">Log Out</a></li>
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