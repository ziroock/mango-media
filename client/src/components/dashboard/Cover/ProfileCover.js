import React, { Component } from "react";
import mangoCover from '../../../images/mango-cover.jpg';
import profileAvatar from '../../../images/profile-avatar.jpg';
import CoverPictureSettings from "./CoverPictureSettings";

/*
*   This component contains the ProfileCover items: Cover Photo, Profile Photo
*  and User's Name.
 */

class ProfileCover extends Component {
    render() {
        return(
            <div id="profile-cover">
                <div style={{ display: "inline-block" }}>
                    <img src={mangoCover} alt="profile-cover" id="profile-cover-pic"/>
                    <img src={profileAvatar} alt="profile-avatar" id="profile-avatar"/>
                    <h2 id="cover-name"
                    > { this.props.userName } </h2>
                    <div id="photo-gallery">
                        <a href={ `/photoGallery/${ this.props.userId }` }>
                            <i className="material-icons right medium"
                               style={{color: "white"}}>
                                collections
                            </i>
                        </a>
                    </div>
                    <CoverPictureSettings personalPage={ this.props.personalPage }/>
                </div>
            </div>
        )
    }
}

export default ProfileCover;