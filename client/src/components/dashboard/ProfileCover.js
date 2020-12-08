import React, { Component } from "react";
import mangoCover from '../../images/mango-cover.jpg';
import profileAvatar from '../../images/profile-avatar.jpg';

/*
*   This component contains the ProfileCover items: Cover Photo, Profile Photo
*  and User's Name.
 */

class ProfileCover extends Component {
    render() {
        return(
            <div style={{
                position: "relative",
                textAlign: "center",
                marginTop: "0.5em",
                height: "312px",
                width: "820px"}}>
                <div style={{ display: "inline-block" }}>
                    <img src={mangoCover} alt="mango-cover" style={{
                        objectFit: "cover",
                        width: "820px",
                        height: "312px"
                    }}/>
                    <img src={profileAvatar} alt="profile-avatar" style={{
                        objectFit: "cover",
                        width: "100px",
                        height: "100px",
                        position: "absolute",
                        top: "205px",
                        left: "10px"
                    }}/>
                    <h2 style={{
                        position: "absolute",
                        top: "205px",
                        left: "150px",
                        color: 'black'
                    }}> {this.props.userName} </h2>,
                    <div style={{
                        position: "absolute",
                        top: "250px",
                        right: "50px"}}>
                        <a href={ `/photoGallery/${this.props.userId}` }>
                            <i className="material-icons right medium" style={{color: "black"}}>collections</i>
                        </a>
                    </div>
                    </div>
            </div>
        )
    }
}

export default ProfileCover;