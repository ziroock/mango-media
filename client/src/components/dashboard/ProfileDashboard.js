// This contains the full User Profile
import React, { Component } from 'react';

import ProfileCover from "./ProfileCover";
import ProfileTextBox from "./ProfileTextBox";

class ProfileDashboard extends Component {
    render() {
        return (
            <div className="container green lighten-4">
                <ProfileCover/>

            </div>
        )
    }
}

export default ProfileDashboard;