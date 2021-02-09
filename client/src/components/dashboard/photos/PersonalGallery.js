//https://github.com/iamshaunjp/firegram/tree/final-files
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPicture } from '../../../actions';
import UploadPicModal from './UploadPicModal';
import { isPersonal } from '../../../utils/mango.utils';
import Gallery from '../../../utils/GalleryAPI/Gallery';
import mangoSVGS from '../../../utils/imporImages';

class PersonalGallery extends Component {
  componentDidMount() {
    this.props.fetchPicture({ userId: this.props.match.params.userId });
  }

  Title() {
    return (
      <div className="mango-tabular-title-box">
        <div className="mango-tabular-title-inner-box">
          <div className="mango-profile-gallery-title roboto-normal-white-27px">Zaprin’s Gallery</div>
          {this.renderUpload()}
        </div>
      </div>
    );
  }

  renderUpload() {
    if (isPersonal(this.props.auth._id, this.props.match.params.userId)) {
      return <UploadPicModal toggle={null} userId={this.props.match.params.userId} uploadType={'gallery'} />;
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
      <div id="feed-page-container">
        <div className="profile-header">
          <div className="login-mango-logo">
            <img className="mango-logo-m" src={mangoSVGS.logo.logoM} />
            <img className="mango-logo-a" src={mangoSVGS.logo.logoA} />
            <img className="mango-logo-n" src={mangoSVGS.logo.logoN} />
            <img className="mango-logo-g" src={mangoSVGS.logo.logoG} />
            <img className="mango-logo-mango" src={mangoSVGS.logo.logoO} />
          </div>
        </div>
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

function mapStateToProps({ picture, auth }) {
  return { picture: picture, auth: auth };
}

export default connect(mapStateToProps, { fetchPicture })(PersonalGallery);
