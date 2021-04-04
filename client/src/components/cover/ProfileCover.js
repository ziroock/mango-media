import React, { Component } from 'react';
import { connect } from 'react-redux';
import CoverPictureSettings from './CoverPictureSettings';
import { fetchFriend } from '../../actions';
import { newFollow } from '../../actions';
import mangoSVGS from '../../utils/imporImages';

/*
 *   This component contains the ProfileCover items: cover Photo, Profile Photo
 *  and User's Name.
 */

class ProfileCover extends Component {
  constructor(props) {
    super(props);
    this.follow = this.follow.bind(this);
  }

  updateProfileCover() {
    if (this.props.picture && this.props.picture.pic) {
      if (this.props.picture.uploadType === 'cover') {
        if (this.props.friend.avatarSrc !== this.props.picture.pic.src) {
          this.props.fetchFriend({ friendId: this.props.dashboardId });
        }
        this.props.picture.uploadType = 'gallery';
      } else if (this.props.picture.uploadType === 'avatar') {
        if (this.props.friend.coverSrc !== this.props.picture.pic.src) {
          this.props.fetchFriend({ friendId: this.props.dashboardId });
        }
        this.props.picture.uploadType = 'gallery';
      }
    }
  }

  follow() {
    // console.log('madafakaaaa');
    this.props.newFollow(this.props.userId, this.props.dashboardId);
  }

  renderConnectButton() {
    if (!this.props.personalPage) {
      return (
        <div className="mango-profile-icon-add">
          <img alt="svg" className="mango-profile-icon-add-1" src={mangoSVGS.mangoIconAdd.mangoIconAdd1} />
          <img alt="svg" className="mango-profile-icon-add-2" src={mangoSVGS.mangoIconAdd.mangoIconAdd2} />
        </div>
      );
    }
    return null;
  }

  render() {
    let coverImgSrc = this.props.friend.coverSrc;
    // let avatarImgSrc = this.props.friend.avatarSrc;
    this.updateProfileCover();
    return (
      <div id="mango-profile-cover-box">
        <div id="mango-profile-cover">
          <div style={{ display: 'inline-block' }}>
            {/*<img src={coverImgSrc} alt="profile-cover" id="profile-cover-pic" />*/}
            <img alt="profile-cover" className="mango-profile-cover-photo" src={coverImgSrc} />
            <div className="mango-profile-cover-info-box">
              <div className="mango-profile-cover-name roboto-normal-white-27px">{this.props.userName}</div>
              <div className="mango-profile-cover-info">
                <div className="mango-profile-cover-followers roboto-normal-white-13px">
                  Followers {this.props.friend.numFollowers}
                </div>
                <div className="mango-profile-cover-following roboto-normal-white-13px">
                  Following {this.props.friend.numFollowing}
                </div>
              </div>
            </div>
            <CoverPictureSettings personalPage={this.props.personalPage} userId={this.props.dashboardId} />
          </div>
        </div>
        <div className="mango-profile-icons-bar">
          <div className="mango-profile-icons">
            {this.renderConnectButton()}
            {/*<div className="mango-profile-icon-add-people">*/}
            {/*  <a href={`/invitation/new`}>*/}
            {/*    <img*/}
            {/*      alt={'add-ppl-icon'}*/}
            {/*      className="mango-profile-icon-add-people-1"*/}
            {/*      src={mangoSVGS.mangoIconAddPeople.mangoIconAddPeople1}*/}
            {/*    />*/}
            {/*    <img*/}
            {/*      alt={'add-ppl-icon'}*/}
            {/*      className="mango-profile-icon-add-people-2"*/}
            {/*      src={mangoSVGS.mangoIconAddPeople.mangoIconAddPeople2}*/}
            {/*    />*/}
            {/*  </a>*/}
            {/*</div>*/}
            <div className="mango-profile-icon-gallery">
              <a href={`/photoGallery/${this.props.dashboardId}`}>
                <img
                  alt={'gallery-icon'}
                  className="mango-profile-icon-gallery-1"
                  src={mangoSVGS.mangoIconGallery.mangoIconGallery1}
                />
                <img
                  alt={'gallery-icon'}
                  className="mango-profile-icon-gallery-2"
                  src={mangoSVGS.mangoIconGallery.mangoIconGallery2}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ friend, picture }) {
  return { friend: friend, picture: picture };
}

export default connect(mapStateToProps, { fetchFriend, newFollow })(ProfileCover);
