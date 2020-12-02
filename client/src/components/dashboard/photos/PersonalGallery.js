//https://github.com/iamshaunjp/firegram/tree/final-files

import React, { Component } from "react";
import { connect } from 'react-redux';
import Gallery from "react-photo-gallery";
import { fetchPicture } from '../../../actions';
import UploadPicModal from "./UploadPicModal";

class PersonalGallery extends Component{

    componentDidMount() {
        this.props.fetchPicture( {userId: this.props.match.params.userId} );
    }

    Title() {
        return (
            <div className="title">
                <h2>Your Pictures</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
        )
    }

    renderGallery() {
        return(
            <div className="photoGallery">
                {this.Title()}
                <UploadPicModal userId={this.props.match.params.userId}/>
                <Gallery photos={this.props.picture}/>
            </div>
        )
    }

    render () {
        switch(this.props.auth._id) {
            case null:
                return <h2>Please Sign In to access dashboard!</h2>;
            case false:
                return <h2>Please Sign In to access dashboard!</h2>;
            default:
                return this.renderGallery();
        }
    }
}

function mapStateToProps(state) {
    return { picture: state.picture, auth: state.auth };
}

export default connect(mapStateToProps, { fetchPicture })(PersonalGallery);