import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <nav>
                <div className="nav-wrapper light-blue accent-3">
                    <div style={{margin: '0 1em'}}>
                    <a href="#" className="brand-logo">Mango-Media</a>
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

export default Header;