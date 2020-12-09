import React, { Component } from 'react';
import CoverSettingsModal from "./CoverSettingsModal";

class CoverPictureSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
            showUploadReview: false,
            showCoverModal: false,
            showAvatarModal: false,
            uploadType: 'gallery'
        };
        // this.uploadType = 'gallery';
        this.toggleSettings = this.toggleSettings.bind(this);
        this.showMenu       = this.showMenu.bind(this);
        this.resetUploadType = this.resetUploadType.bind(this);
        this.closeMenu      = this.closeMenu.bind(this);
        this.toggleCoverModal    = this.toggleCoverModal.bind(this);
        this.renderCoverModal    = this.renderCoverModal.bind(this);
        this.toggleAvatarModal    = this.toggleAvatarModal.bind(this);
        this.renderAvatarModal    = this.renderAvatarModal.bind(this);
    }

    toggleCoverModal() {

        console.log("ReventENDER STATE IS===: " , this.state.showCoverModal);
        //on close
        if(this.state.showCoverModal && this.state.uploadType === "cover" ){
            this.setState({ showCoverModal: !this.state.showCoverModal, uploadType: "gallery" });
        } else {
            this.setState({ showCoverModal: !this.state.showCoverModal, uploadType: "cover" });
        }
        console.log("RENDER STATE IS=: " , this.state.showCoverModal);
    }

    renderCoverModal(){
        if(this.state.showCoverModal) {
            return <CoverSettingsModal toggle={this.toggleCoverModal} userId={this.props.userId} uploadType={this.state.uploadType}/>;
        } else {
            return null;
        }
    }


    toggleAvatarModal() {

        console.log("ReventENDER STATE IS===: " , this.state.showAvatarModal);
        //on close
        if(this.state.showAvatarModal && this.state.uploadType === "avatar" ){
            this.setState({ showAvatarModal: !this.state.showAvatarModal, uploadType: "gallery" });
        } else {
            this.setState({ showAvatarModal: !this.state.showAvatarModal, uploadType: "avatar" });
        }
        console.log("RENDER STATE IS=: " , this.state.showAvatarModal);
    }

    resetUploadType() {
        this.setState({ uploadType: 'gallery' });
        console.log("DID A RESET", this.state.uploadType);
    }


    renderAvatarModal(){
        if(this.state.showAvatarModal) {
            return <CoverSettingsModal
                reset={this.resetUploadType}
                toggle={this.toggleAvatarModal}
                userId={this.props.userId}
                uploadType={this.state.uploadType}
            />;
        } else {
            return null;
        }
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
                    <li style={{cursor: 'pointer'}} onClick={this.toggleCoverModal}>EditCover</li>
                    <li style={{cursor: 'pointer'}} onClick={this.toggleAvatarModal}>EditProfilePic</li>
                </ul>
            );
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
                    {this.renderCoverModal()}
                    {this.renderAvatarModal()}
                </div>
            );
        }
        else {
            return null;
        }
    }
}

export default CoverPictureSettings;