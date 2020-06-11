import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
    renderContent() {
        switch(this.props.auth) {
            case null:
                return 'Still deciding';
            case false:
                return 'logged out';
            default:
                return 'logged in';
        }
    }

    render() {
        // console.log(this.props);
        return (
            <nav>
                <div className="nav-wrapper light-blue accent-3">
                    <div style={{margin: '0 1em'}}>
                        <a href="#" className="left brand-logo">Mango</a>
                        <ul id="nav-mobile" className="right">
                            {this.renderContent()}
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