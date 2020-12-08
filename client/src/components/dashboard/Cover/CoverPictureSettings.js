import React, { Component } from 'react';
import CoverSettingsModal from "./CoverSettingsModal";

class CoverPictureSettings extends Component {
    constructor(props) {
        super(props);
        this.state = { showMenu: false, showUploadReview: false, showModal: false };
        this.toggleSettings = this.toggleSettings.bind(this);
        this.showMenu       = this.showMenu.bind(this);
        this.closeMenu      = this.closeMenu.bind(this);
        this.toggleModal    = this.toggleModal.bind(this);
        this.renderModal    = this.renderModal.bind(this);
    }

    toggleModal() {
        console.log("RENDER STATE IS===: " , this.state.showModal);
        this.setState({ showModal: !this.state.showModal });
        console.log("RENDER STATE IS=: " , this.state.showModal);
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

    toggleSettings() {
        this.setState({ showUploadReview: !this.state.showUploadReview });
    }

z
    renderSettingsMenu() {
        if(this.state.showMenu) {
            return(
                <ul className="blue-grey darken-1" style={{marginTop: '25px', zIndex: '2'}}>
                    <li style={{cursor: 'pointer'}} onClick={this.toggleModal}>EditCover</li>
                </ul>
            );
        }
    }

    renderModal(){
        if(this.state.showModal) {
            return <CoverSettingsModal toggle={this.toggleModal} userId={this.props.userId}/>;
        } else {
            return null;
        }
    }


    render() {
        if(this.props.personalPage) {
            return (
                <div id="cover-settings">
                    <div id="cover-settings-button">
                        <i className="material-icons small" onClick={this.showMenu}>settings</i>
                    </div>
                    {this.renderSettingsMenu()}
                    {this.renderModal()}
                </div>
            );
        }
        else {
            return null;
        }
    }
}

export default CoverPictureSettings;