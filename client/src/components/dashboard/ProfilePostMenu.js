import React, { Component } from 'react';

class ProfilePostMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
        }

        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }

    showMenu(event) {
        event.preventDefault();
        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }

    closeMenu() {
        this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
        });
    }

    // TODO: add hover!
    renderMenu() {
        if(this.state.showMenu) {
            return(
                <ul className="blue-grey darken-1" style={{marginTop: '25px', zIndex: '1000'}}
                    ref={(element) => {
                            this.dropdownMenu = element;
                    }}
                >
                    <li style={{cursor: 'pointer'}}>Edit</li>
                    <li style={{cursor: 'pointer'}}>Delete</li>
                </ul>
            );
        }
    }


    render() {
        return (
            <div style={{position: 'absolute', top: "0px", right: "0px"}}>
                <p style={{cursor: 'pointer', marginBottom: '10px'}} onClick={this.showMenu}><i className="material-icons right"> arrow_drop_down </i></p>
                {this.renderMenu()}
            </div>
        );
    }
}

export default ProfilePostMenu;