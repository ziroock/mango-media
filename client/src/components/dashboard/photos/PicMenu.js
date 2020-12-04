import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { deletePost } from '../../../actions';


class PicMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
        }
        this.postId = props.id;
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
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


    // TODO: add hover!
    renderMenu() {
        if(this.state.showMenu) {
            return(
                <ul className="blue-grey darken-1" style={{marginTop: '25px', zIndex: '2'}}>
                    <li style={{cursor: 'pointer'}} onClick={this.toggleEdit}>Edit</li>
                    <li style={{cursor: 'pointer'}} onClick={this.handleDelete}>Delete</li>
                </ul>
            );
        }
    }


    render() {
        return [
            <div style={{position: 'absolute', top: "0px", right: "0px"}} key='dropDownMenu'>
                <p style={{cursor: 'pointer', marginBottom: '10px'}} onClick={this.showMenu}><i className="material-icons right"> arrow_drop_down </i></p>
                {this.renderMenu()}
            </div>
        ];
    }
}

export default PicMenu;