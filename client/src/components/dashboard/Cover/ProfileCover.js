import React, { Component } from "react";
import { connect } from "react-redux";
import CoverPictureSettings from "./CoverPictureSettings";
import {fetchFriend} from '../../../actions/index';

/*
*   This component contains the ProfileCover items: Cover Photo, Profile Photo
*  and User's Name.
 */

class ProfileCover extends Component {
    constructor(props) {
        super(props);
    }


    updateProfileCover() {
        if(this.props.picture && this.props.picture.pic) {
            if(this.props.picture.uploadType === 'cover') {
                if(this.props.friend.avatarSrc !== this.props.picture.pic.src){
                    this.props.fetchFriend({friendId: this.props.dashboardId});
                }
                this.props.picture.uploadType = 'gallery';
            }else if(this.props.picture.uploadType === 'avatar') {
                if(this.props.friend.coverSrc !== this.props.picture.pic.src){
                    this.props.fetchFriend({friendId: this.props.dashboardId});
                }
                this.props.picture.uploadType = 'gallery';
            }
        }
    }


    render() {
        let coverImgSrc = this.props.friend.coverSrc;
        let avatarImgSrc = this.props.friend.avatarSrc;
    this.updateProfileCover();
        return(
            <div id="profile-cover">
                <div style={{ display: "inline-block" }}>
                    <img src={ coverImgSrc } alt="profile-cover" id="profile-cover-pic"/>
                    <img src={ avatarImgSrc } alt="profile-avatar" id="profile-avatar"/>
                    <h2 id="cover-name"
                    > { this.props.userName } </h2>
                    <div id="connect-box">
                        <label id="following-box">Following: {this.props.friend.numFollowing}</label>
                        <label id="followers-box">Followers: {this.props.friend.numFollowers}</label>
                    </div>
                    <div id="connect-button">
                        <i className="material-icons medium"
                           style={{color: "white"}}>
                            loop
                        </i>
                    </div>
                    <div id="photo-gallery">
                        <a href={ `/photoGallery/${ this.props.dashboardId }` }>
                            <i className="material-icons right medium"
                               style={{color: "white"}}>
                                collections
                            </i>
                        </a>
                    </div>
                    <CoverPictureSettings
                        personalPage={ this.props.personalPage }
                        userId={ this.props.dashboardId }
                    />
                </div>
            </div>
        )
    }
}

function mapStateToProps({friend, picture}) {
    return { friend: friend, picture: picture }
}

export default connect(mapStateToProps, {fetchFriend})(ProfileCover);