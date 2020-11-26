//https://docs.imgix.com/tutorials/react-responsive-image-gallery
//https://codesandbox.io/s/5vn3lvz2n4?file=/index.js:0-1104

import React, { Component } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import { photos } from "./photos";

class PhotoGallery extends Component{
    constructor(props) {
        super(props);

        this.state = {
            currentImage: 0,
            viewerIsOpen: false,
        }
        this.closeLightbox = this.closeLightbox.bind(this);
        this.openLightbox = this.openLightbox.bind(this);
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

    renderPicture() {
        console.log('Picutre! ', this.state.viewerIsOpen);
        return (
            <ModalGateway>
                {this.state.viewerIsOpen ? (
                    <Modal onClose={this.closeLightbox}>
                        <Carousel
                            currentIndex = {this.state.currentImage}
                            views = { photos.map( x => ({
                                ...x,
                                srcset: x.src,
                                caption: x.desc
                                })
                            )}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>
        )
    }

    render () {
        return(
            <div>
                <Gallery photos={photos} onClick={this.openLightbox} />
                {this.renderPicture()}
            </div>
        )
    }
}

export default PhotoGallery;