// This contains the full User Profile
import React, { Component } from 'react';

import ProfileCover from "./ProfileCover";
import ProfilePost from "./ProfilePost";
//TODO: Good for now, but need to make scalable keeping the same resolution

class ProfileDashboard extends Component {
    render() {
        return (
            <div className="container green lighten-4">
                <ProfileCover/>
                <ProfilePost/>
            </div>
        )
    }
}

export default ProfileDashboard;