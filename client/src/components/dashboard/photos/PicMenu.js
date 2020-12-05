import React, { Component } from 'react';
import { connect } from 'react-redux';
import {deletePicture, deletePost} from '../../../actions';


class PicMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
        }
        this.picId = props.picId;
        this.showMenu = this.showMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }


    showMenu(event) {
        console.log("show it mofo!");
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

    // <li style={{cursor: 'pointer'}} onClick={this.handleDelete}>Delete</li>
    // TODO: add hover!
    renderMenu() {
        if(this.state.showMenu) {
            console.log("RenderMenu");
            return(
                <ul className="blue-grey darken-1" style={{marginTop: '25px', zIndex: '2'}}>
                    <li style={{cursor: 'pointer'}} onClick={this.handleDelete}>Delete</li>
                </ul>
            );
        }
    }


    render() {
        return [
            <div style={{position: 'absolute', top: "0px", right: "0px", zIndex: "3"}} key='dropDownMenu'>
                <p style={{cursor: 'pointer', marginBottom: '10px'}} onClick={this.showMenu}><i className="material-icons right"> arrow_drop_down </i></p>
                {console.log("Render triangle!")}
                {this.renderMenu()}
            </div>
        ];
    }
}

export default connect(null, { deletePicture })(PicMenu);