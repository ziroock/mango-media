// This contains the full User Profile
import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProfileCover from "./ProfileCover";
import ProfilePost from "./ProfilePost";
//TODO: Good for now, but need to make scalable keeping the same resolution

class ProfileDashboard extends Component {
    renderContent() {
        switch(this.props.auth) {
            case null:
                return <h2>Please Sign In to access dashboard!</h2>;
            case false:
                return <h2>Please Sign In to access dashboard!</h2>;
            default:
                return (
                    <div className="container green lighten-4">
                        <ProfileCover/>
                        <ProfilePost/>
                    </div>
                );
        }
    }

    render() {
        return this.renderContent();
    }
}
function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps)(ProfileDashboard);