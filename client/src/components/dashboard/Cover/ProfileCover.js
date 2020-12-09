import React, { Component } from "react";
import { connect } from "react-redux";
import CoverPictureSettings from "./CoverPictureSettings";

/*
*   This component contains the ProfileCover items: Cover Photo, Profile Photo
*  and User's Name.
 */

class ProfileCover extends Component {

    render() {
        console.log("The src is: ", this.props.friend.coverSrc);
        console.log(this.props.picture);
        let coverImgSrc = '';
        let avatarImgSrc = '';
        if(this.props.picture && this.props.picture.pic) {
            console.log()
            if(this.props.picture.uploadType === 'cover') {
                coverImgSrc = this.props.picture.pic.src;
                avatarImgSrc = this.props.friend.avatarSrc;
                console.log("picture type: ", this.props.picture.uploadType);
            }else if(this.props.picture.uploadType === 'avatar') {
                avatarImgSrc = this.props.picture.pic.src;
                coverImgSrc = this.props.friend.coverSrc;
                console.log("picture type: ", this.props.picture.uploadType);
            }
        } else {
            console.log("FRIEND");
            console.log(this.props.friend);
            coverImgSrc = this.props.friend.coverSrc;
            avatarImgSrc = this.props.friend.avatarSrc;
        }

        return(
            <div id="profile-cover">
                <div style={{ display: "inline-block" }}>
                    <img src={ coverImgSrc } alt="profile-cover" id="profile-cover-pic"/>
                    <img src={ avatarImgSrc } alt="profile-avatar" id="profile-avatar"/>
                    <h2 id="cover-name"
                    > { this.props.userName } </h2>
                    <div id="photo-gallery">
                        <a href={ `/photoGallery/${ this.props.dashboardId }` }>
                            <i className="material-icons right medium"
                               style={{color: "white"}}>
                                collections
                            </i>
                        </a>
                    </div>
                    <CoverPictureSettings personalPage={ this.props.personalPage } userId={ this.props.dashboardId }/>
                </div>
            </div>
        )
    }
}

function mapStateToProps({friend, picture}) {
    return { friend: friend, picture: picture }
}

export default connect(mapStateToProps)(ProfileCover);