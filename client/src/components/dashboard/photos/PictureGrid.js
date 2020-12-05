import React, { Component } from 'react';
import PicMenu from "./PicMenu";
// import { motion } from 'framer-motion';

class ImageGrid extends Component {
    mapImages() {
        return this.props.photos.reverse().map( pic => {
            return(
                <div className="img-wrap" key={pic._id}>
                    <div className="img-box">
                        <PicMenu picId={pic._id}/>
                        <img id="gallery-img" src={pic.src} alt={pic.desc}/>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="gallery-frame">
                <div className="img-grid">
                    {this.mapImages()}
                </div>
            </div>

    )
    }
}

export default ImageGrid;