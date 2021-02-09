import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deletePicture } from '../../actions';

class PicMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    };
    this.picId = props.picId;
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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

  handleDelete() {
    this.props.deletePicture({ picId: this.picId });
  }

  // TODO: add hover!
  renderMenu() {
    if (this.state.showMenu) {
      return (
        <ul className="blue-grey darken-1" style={{ marginTop: '25px', zIndex: '2' }}>
          <li style={{ cursor: 'pointer' }} onClick={this.handleDelete}>
            Delete
          </li>
        </ul>
      );
    }
  }

  render() {
    if (this.props.personal) {
      return (
        <div className="pic-menu-button" key="dropDownMenu" onClick={this.showMenu}>
          <i className="material-icons right black circle pic-menu-icon"> arrow_drop_down </i>
          {this.renderMenu()}
        </div>
      );
    }
    return null;
  }
}

export default connect(null, { deletePicture })(PicMenu);
