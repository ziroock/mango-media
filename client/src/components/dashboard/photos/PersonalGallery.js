//https://github.com/iamshaunjp/firegram/tree/final-files
import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchPicture } from '../../../actions';
import UploadPicModal from "./UploadPicModal";
import { isPersonal } from "../../../utils/mango.utils";
import Gallery from '../../../utils/GalleryAPI/Gallery';
import jsonp from 'jsonp';

class PersonalGallery extends Component{
    constructor() {
        super();
        this.state = { width: -1 };
        this.loadPhotos = this.loadPhotos.bind(this);
    }

    componentDidMount() {
        this.props.fetchPicture( {userId: this.props.match.params.userId} );
        this.loadPhotos();
    }

    loadPhotos() {
        const urlParams = {
            api_key: '455b5e2fa6b951f9b9ab58a86d5e1f8a',
            photoset_id: '72157708141247864',
            user_id: '146659101@N08',
            format: 'json',
            per_page: '120',
            extras: 'url_m,url_c,url_l,url_h,url_o',
        };

        let url = 'https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos';
        url = Object.keys(urlParams).reduce((acc, item) => {
            return acc + '&' + item + '=' + urlParams[item];
        }, url);

        jsonp(url, { name: 'jsonFlickrApi' }, (err, data) => {
            let photos = data.photoset.photo.map(item => {
                let aspectRatio = parseFloat(item.width_o / item.height_o);
                return {
                    src: item.url_l,
                    width: parseInt(item.width_o),
                    height: parseInt(item.height_o),
                    title: item.title,
                    alt: item.title,
                    key: item.id,
                    srcSet: [
                        `${item.url_m} ${item.width_m}w`,
                        `${item.url_c} ${item.width_c}w`,
                        `${item.url_l} ${item.width_l}w`,
                        `${item.url_h} ${item.width_h}w`,
                    ],
                    sizes: '(min-width: 480px) 50vw, (min-width: 1024px) 33.3vw, 100vw',
                };
            });
            this.setState({
                photos: this.state.photos ? this.state.photos.concat(photos) : photos,
            });
        });
    }


    Title() {
        return (
            <div className="title">
                <h2>Picture Gallery</h2>
            </div>
        )
    }

    // renderGrid() {
    //     if(this.props.picture && this.props.picture.pictures) {
    //         return <PictureGrid photos={this.props.picture.pictures} personal={isPersonal(this.props.auth._id, this.props.match.params.userId)}/>
    //     }
    //     return <PictureGrid photos={[]}/>;
    // }

    renderUpload() {
        if(isPersonal(this.props.auth._id, this.props.match.params.userId)) {
             return (
                 <UploadPicModal
                    toggle={null}
                    userId={this.props.match.params.userId}
                    uploadType={"gallery"}
                />
            )
        }
        return null;
    }
    renderGallery() {
        if(this.props.picture && this.props.picture.pictures) {
            return <Gallery
                photos={this.props.picture.pictures}
                personal={isPersonal(this.props.auth._id, this.props.match.params.userId)}
            />
        }
        return <Gallery photos={[]}/>;
    }

    renderPage() {
        return(
            <div className="photoGallery">
                {this.Title()}
                {this.renderUpload()}
                {this.renderGallery()}
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
                return this.renderPage();
        }
    }
}

function mapStateToProps({picture, auth}) {
    return { picture: picture, auth: auth };
}

export default connect(mapStateToProps, { fetchPicture })(PersonalGallery);