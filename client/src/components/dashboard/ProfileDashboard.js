// This contains the full User Profile
import React, { Component } from 'react';

import ProfileCover from "./ProfileCover";
import ProfileTextBox from "./ProfileTextBox";
import ProfilePicture from "./ProfilePicture";

class ProfileDashboard extends Component {
    render() {
        return (
            <div className="container">
                <ProfileCover/>
                <ProfilePicture/>
                <ProfileTextBox/>
            </div>
        )
    }
}

export default ProfileDashboard;