import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
    render() {
        // console.log(this.props);
        return (
            <nav>
                <div className="nav-wrapper light-blue accent-3">
                    <div style={{margin: '0 1em'}}>
                        <a href="#" className="brand-logo">Mango</a>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li><a href="#">Login</a></li>
                            <li><a href="#">Register</a></li>
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