import React, { Component } from 'react';
import UploadPicModal from '../photos/UploadPicModal';

class CoverPictureSettings extends Component {
  constructor(props) {
    super(props);
    this.state = { showMenu: false };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({ showMenu: !this.state.showMenu });
  }

  renderSettingsMenu() {
    if (this.state.showMenu) {
      return (
        <ul className="blue-grey darken-1" style={{ marginTop: '25px', zIndex: '2' }}>
          <li>
            <UploadPicModal
              toggleDropDown={this.toggleMenu}
              userId={this.props.userId}
              uploadType={'cover'}
              submitElement={<div className="mango-picture-add-button-cover">Change Cover</div>}
            />
          </li>
          <li>
            <UploadPicModal
              toggleDropDown={this.toggleMenu}
              userId={this.props.userId}
              uploadType={'avatar'}
              submitElement={<div className="mango-picture-add-button-cover">Change Avatar</div>}
            />
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
        </div>
      );
    } else {
      return null;
    }
  }
}

export default CoverPictureSettings;
