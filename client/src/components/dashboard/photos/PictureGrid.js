import React, { Component } from 'react';
// import { motion } from 'framer-motion';

class ImageGrid extends Component {
    mapImages() {
        return this.props.photos.map( pic => {
            return(
                <div className="img-wrap" key={pic._id}>
                    <div className="img-box">
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
                    {console.log(this.props.photos)}
                    {this.mapImages()}
                </div>
            </div>

    )
    }
}

export default ImageGrid;