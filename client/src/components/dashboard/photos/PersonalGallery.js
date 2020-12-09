//https://github.com/iamshaunjp/firegram/tree/final-files

import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchPicture } from '../../../actions';
import UploadPicModal from "./UploadPicModal";
import PictureGrid from './PictureGrid';

class PersonalGallery extends Component{

    componentDidMount() {
        this.props.fetchPicture( {userId: this.props.match.params.userId} );
    }

    Title() {
        return (
            <div className="title">
                <h2>Picture Gallery</h2>
            </div>
        )
    }

    renderGrid() {
        if(this.props.picture) {
            return <PictureGrid photos={this.props.picture}/>
        }
        return <PictureGrid photos={[]}/>;
    }

    renderGallery() {
        return(
            <div className="photoGallery">
                {this.Title()}
                <UploadPicModal
                    toggle={null}
                    userId={this.props.match.params.userId}
                    uploadType={"gallery"}
                />
                {this.renderGrid()}
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