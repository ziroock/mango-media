import React, { Component } from 'react';
import CoverSettingsModal from './CoverSettingsModal';
import UploadPicModal from '../photos/UploadPicModal';
import mangoSVGS from '../../utils/imporImages';

class CoverPictureSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      showUploadReview: false,
      showCoverModal: false,
      showAvatarModal: false,
      uploadType: 'gallery',
    };
    // this.uploadType = 'gallery';
    this.toggleSettings = this.toggleSettings.bind(this);
    // this.showMenu = this.showMenu.bind(this);
    // this.closeMenu = this.closeMenu.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleCoverModal = this.toggleCoverModal.bind(this);
    this.renderCoverModal = this.renderCoverModal.bind(this);
    this.toggleAvatarModal = this.toggleAvatarModal.bind(this);
    this.renderAvatarModal = this.renderAvatarModal.bind(this);
  }

  toggleCoverModal() {
    console.log('ReventENDER STATE IS===: ', this.state.showCoverModal);
    //on close
    if (this.state.showCoverModal && this.state.uploadType === 'cover') {
      this.setState({ showCoverModal: !this.state.showCoverModal, uploadType: 'gallery' });
    } else {
      this.setState({ showCoverModal: !this.state.showCoverModal, uploadType: 'cover' });
    }
    console.log('RENDER STATE IS=: ', this.state.showCoverModal);
  }

  renderCoverModal() {
    if (this.state.showCoverModal) {
      return <UploadPicModal toggleDropDown={null} userId={this.props.userId} uploadType={this.state.uploadType} />;
    } else {
      return null;
    }
  }

  toggleAvatarModal() {
    console.log('ReventENDER STATE IS===: ', this.state.showAvatarModal);
    //on close
    if (this.state.showAvatarModal && this.state.uploadType === 'avatar') {
      this.setState({ showAvatarModal: !this.state.showAvatarModal, uploadType: 'gallery' });
    } else {
      this.setState({ showAvatarModal: !this.state.showAvatarModal, uploadType: 'avatar' });
    }
    console.log('RENDER STATE IS=: ', this.state.showAvatarModal);
  }

  renderAvatarModal() {
    if (this.state.showAvatarModal) {
      return (
        <CoverSettingsModal
          // reset={this.resetUploadType}
          toggleDropDown={this.toggleAvatarModal}
          userId={this.props.userId}
          uploadType={this.state.uploadType}
        />
      );
    } else {
      return null;
    }
  }

  toggleMenu() {
    // console.log("title: " + this.props.title);
    // console.log("body: " + this.props.body);
    // console.log("date: " + this.props.date);

    this.setState({ showMenu: !this.state.showMenu });
    // console.log('The showEdit state: ' + this.state.showEdit);
  }

  // showMenu(event) {
  //   event.preventDefault();
  //   this.setState({ showMenu: true }, () => {
  //     document.addEventListener('click', this.closeMenu);
  //   });
  // }
  //
  // closeMenu() {
  //   this.setState({ showMenu: false }, () => {
  //     document.removeEventListener('click', this.closeMenu);
  //   });
  // }

  toggleSettings() {
    this.setState({ showUploadReview: !this.state.showUploadReview });
  }

  renderSettingsMenu() {
    if (this.state.showMenu) {
      console.log('BLAJ BLAH: cover');
      return (
        // onClick={this.toggleCoverModal}>
        <ul className="blue-grey darken-1" style={{ marginTop: '25px', zIndex: '2' }}>
          <li style={{ cursor: 'pointer' }}>
            <UploadPicModal
              toggleDropDown={this.toggleMenu}
              userId={this.props.userId}
              uploadType={'cover'}
              submitElement={<div className="mango-picture-add-button-cover">Change Profile Cover</div>}
            />
          </li>
          <li style={{ cursor: 'pointer' }} onClick={this.toggleAvatarModal}>
            EditProfilePic
          </li>
        </ul>
      );
    }
  }

  render() {
    if (this.props.personalPage) {
      return (
        <div id="cover-settings">
          <div id="cover-settings-button">
            <i className="material-icons small" onClick={this.toggleMenu}>
              settings
            </i>
          </div>
          {this.renderSettingsMenu()}
          {/*{this.renderCoverModal()}*/}
          {this.renderAvatarModal()}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default CoverPictureSettings;
