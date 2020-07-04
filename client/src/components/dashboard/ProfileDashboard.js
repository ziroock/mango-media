// This contains the full User Profile
import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProfileCover from "./ProfileCover";
import ProfilePost from "./ProfilePost";
import ProfilePostList from "./ProfilePostList";
//TODO: Good for now, but need to make scalable keeping the same resolution

class ProfileDashboard extends Component {
    renderContent() {
        // console.log('match: ');
        // console.log('match: ' + JSON.stringify(this.props.match, null, 4) + '\n location: ' +
        //     JSON.stringify(this.props.location, null, 4));
        switch(this.props.auth._id) {
            case null:
                return <h2>Please Sign In to access dashboard!</h2>;
            case false:
                return <h2>Please Sign In to access dashboard!</h2>;
            default:
                return (
                    <div className="container green lighten-4">
                        <ProfileCover userId={this.props.match.params.userId}/>
                        <ProfilePost userId={this.props.match.params.userId}/>
                        <ProfilePostList userId={this.props.match.params.userId}/>
                    </div>
                );
        }
    }

    render() {
        return this.renderContent();
    }
}
function mapStateToProps(state) {
    return { auth: state.auth, post: state.post };
}

export default connect(mapStateToProps)(ProfileDashboard);