import React, { Component } from 'react';
import { connect } from 'react-redux';

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
                return <li><a href="/api/logout">Log Out</a></li>;
        }
    }

    render() {
        // console.log(this.props);
        return (
            <nav>
                <div className="nav-wrapper light-blue accent-3">
                    <div style={{ margin: '0 1em' }}>
                        <a href="/" className="left brand-logo">Mango</a>
                        <ul id="nav-mobile" className="right">
                            { this.renderContent() }
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

// Gets called with the entire state statement our of the reduxStore
function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(Header);