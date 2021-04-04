//https://github.com/iamshaunjp/firegram/tree/final-files
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPicture, fetchFriend } from '../../actions';
import UploadPicModal from './UploadPicModal';
import { isPersonal } from '../../utils/mango.utils';
import Gallery from '../../utils/GalleryAPI/Gallery';
import mangoSVGS from '../../utils/imporImages';

class PersonalGallery extends Component {
  componentDidMount() {
    this.props.fetchFriend({ friendId: this.props.match.params.userId });
    this.props.fetchPicture({ userId: this.props.match.params.userId });
  }

  renderButton() {
    return (
      <div className="mango-picture-add-button-galley">
        <img
          alt="add-pic-button"
          className="mango-gallery-icon-pic-add-1"
          src={mangoSVGS.mangoIconAddPic.mangoIconAddPic1}
        />
        <img
          alt="add-pic-button2"
          className="mango-gallery-icon-pic-add-2"
          src={mangoSVGS.mangoIconAddPic.mangoIconAddPic2}
        />
      </div>
    );
  }

  Title() {
    return (
      <div className="mango-tabular-title-box">
        {/*<div className="mango-tabular-title-inner-box">*/}
        <div className="mango-profile-gallery-title roboto-normal-white-27px">{this.props.friend.name}’s Gallery</div>
        {this.renderUpload()}
        {/*</div>*/}
      </div>
    );
  }

  renderUpload() {
    if (isPersonal(this.props.auth._id, this.props.match.params.userId)) {
      return (
        <UploadPicModal
          toggleDropDown={null}
          userId={this.props.match.params.userId}
          uploadType={'gallery'}
          submitElement={this.renderButton()}
        />
      );
    }
    return null;
  }

  renderGallery() {
    if (this.props.picture && this.props.picture.pictures) {
      return (
        <Gallery
          photos={this.props.picture.pictures}
          personal={isPersonal(this.props.auth._id, this.props.match.params.userId)}
        />
      );
    }
    return <Gallery photos={[]} />;
  }

  renderPage() {
    return (
      <div className="iphone-11-pro-x screen mango-feed-page">
        <div id="photo-gallery-inner-container">
          {this.Title()}
          {this.renderGallery()}
        </div>
      </div>
    );
  }

  render() {
    switch (this.props.auth._id) {
      case null:
        return <h2>Please Sign In to access dashboard!</h2>;
      case false:
        return <h2>Please Sign In to access dashboard!</h2>;
      default:
        return this.renderPage();
    }
  }
}

function mapStateToProps({ picture, auth, friend }) {
  console.log(friend);
  return { picture: picture, auth: auth, friend: friend };
}

export default connect(mapStateToProps, { fetchPicture, fetchFriend })(PersonalGallery);
