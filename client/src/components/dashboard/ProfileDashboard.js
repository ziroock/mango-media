// This contains the full User Profile
import React, { Component } from 'react';

import ProfileCover from "./ProfileCover";

class ProfileDashboard extends Component {
    render() {
        return (
            <div className="container">
                <h2 style={{ textAlign: "center" }}>Profile Dashboard </h2>
                <ProfileCover/>
            </div>
        )
    }
}

export default ProfileDashboard;