import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deletePost } from '../../actions';
import MangoPostEdit from './MangoPostEdit';

/*
 * Component ProfilePostMenu is the small dropdown post menu and handles all the
 * functionality and action handling. The component is connected to the
 * deletePost() action.
 *
 * - renderPostEdit():
 *   + Given the current state of showEdit is true, then open up the
 *     <MangoPostEdit/> Component Page.
 *       + All the information
 * - handleDelete():
 *   + This function calls the deletePost action, when the delete button is clicked.
 * - renderMenu():
 *  + This function render's the post menu, when the showMenu state is set true.
 *  + TODO: Add on hover styling!
 * - toggleEdit():
 *   + This function sets showEdit state to opposite value which forces a re-render.
 *     This is used inside <MangoPostEdit/> to handle close menu onClick and inside
 *     renderMenu() to open <ProfilePostEit/>.
 * - showMenu(event):
 *   + This function sets the showMenu state to true and calls an event listener
 *     of type 'click' and listens for a click inside closeMenu() to close menu.
 * - closeMenu():
 *   + On any click, this function changes the state showMenu to false which forces
 *     the menu to close. Then it removes the on click listener.
 * */

class MangoPostMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
      showEdit: false,
    };
    this.postId = props.id;

    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  showMenu(event) {
    // console.log('postID: ' + this.postId);
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
    this.props.deletePost({ postId: this.postId });
  }

  toggleEdit() {
    // console.log("title: " + this.props.title);
    // console.log("body: " + this.props.body);
    // console.log("date: " + this.props.date);

    this.setState({ showEdit: !this.state.showEdit });
    // console.log('The showEdit state: ' + this.state.showEdit);
  }

  renderPostEdit() {
    // console.log('The postEdit state: ' + this.state.showEdit);
    if (this.state.showEdit) {
      return (
        <MangoPostEdit
          key="MangoPostEdit"
          closePopUp={this.toggleEdit}
          postTitle={this.props.title}
          postBody={this.props.body}
          postDate={this.props.date}
          postId={this.props.id}
        />
      );
    } else {
      return null;
    }
  }

  // TODO: add hover!
  renderMenu() {
    if (this.state.showMenu) {
      return (
        <ul className="blue-grey darken-1" style={{ marginTop: '25px', zIndex: '2' }}>
          <li style={{ cursor: 'pointer' }} onClick={this.toggleEdit}>
            Edit
          </li>
          <li style={{ cursor: 'pointer' }} onClick={this.handleDelete}>
            Delete
          </li>
        </ul>
      );
    }
  }

  render() {
    return [
      <div style={{ position: 'absolute', top: '0px', right: '0px' }} key="dropDownMenu">
        <p style={{ cursor: 'pointer', marginBottom: '10px' }} onClick={this.showMenu}>
          <i className="material-icons right"> arrow_drop_down </i>
        </p>
        {this.renderMenu()}
      </div>,
      this.renderPostEdit(),
    ];
  }
}

export default connect(null, { deletePost })(MangoPostMenu);
