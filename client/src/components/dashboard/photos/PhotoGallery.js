//https://docs.imgix.com/tutorials/react-responsive-image-gallery
//https://codesandbox.io/s/5vn3lvz2n4?file=/index.js:0-1104

/**
 * The Picture Gallery is now working. I need to fix
 * the full screen, maybe give it z index or somehow
 * separate from header. Also still need to connect to
 * db and figure out picture storage, dynamic loading etc...
 * **/

import React, { Component } from "react";
import { connect } from 'react-redux';
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { fetchPhotos } from '../../../actions';

class PhotoGallery extends Component{
    constructor(props) {
        super(props);

        this.state = {
            currentImage: 0,
            viewerIsOpen: false,
        }
        console.log(props);
        console.log( "KOKO: " + props.photo);
        this.closeLightbox = this.closeLightbox.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
    }

    componentDidMount() {
        this.props.fetchPhotos( {userId: this.props.match.params.userId} );
        console.log( this.props.match.params.userId );
    }

    openLightbox = (event, { photo, index }) => {
        this.setState({ currentImage: index });
        this.setState({ viewerIsOpen: true});
        console.log('Clicked!');
    };

    closeLightbox = () => {
        this.setState({ currentImage: 0 });
        this.setState({ viewerIsOpen: false});
    };

    renderPictureModal() {
        console.log('Picutre! ', this.state.viewerIsOpen);
        return (
            <div>
                <ModalGateway>
                    {this.state.viewerIsOpen ? (
                        <Modal onClose={this.closeLightbox}>
                            <Carousel
                                currentIndex = {this.state.currentImage}
                                views = { this.props.photo.map( x => ({
                                    ...x,
                                    srcset: x.src,
                                    caption: x.desc
                                    })
                                )}
                            />
                        </Modal>
                    ) : null}
                </ModalGateway>
            </div>
        )
    }

    renderGallery() {
        return(
            <div className="pictaaa" style={{ zIndex: "40000" }}>
                <Gallery photos={this.props.photo} onClick={this.openLightbox} />
                {this.renderPictureModal()}
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
    return { photo: state.photo, auth: state.auth };
}

export default connect(mapStateToProps, { fetchPhotos })(PhotoGallery);