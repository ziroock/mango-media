import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchFriend} from '../../actions/index';
import ProfileCover from "./ProfileCover";
import ProfilePost from "./Posts/ProfilePost";
import ProfilePostList from "./Posts/ProfilePostList";

/*
* ProfileDashboard is the component that holds all the User Profile Components!
* It holds: <ProfileCover/>, <ProfilePost/> and <ProfilePostList/>
* TODO: Good for now, but need to make scalable keeping the same resolution
* */


class ProfileDashboard extends Component {
    constructor(props) {
        super(props);
        let pathnameElem = window.location.pathname.split("/");
        console.log(pathnameElem[pathnameElem.length - 1]);
        this.dashboardId = pathnameElem[pathnameElem.length - 1];
    }

    componentDidMount() {
        this.props.fetchFriend({friendId: this.dashboardId});
    }

    renderUserProfile() {
        console.log("The friendId is: ", this.props);
        if(this.props.friend) {
            console.log(this.props.friend);
        }
        console.log("The dashboardId is: ", this.dashboardId);
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
        return this.renderUserProfile();
    }
}
function mapStateToProps({auth, friend, post}) {
    return { auth: auth, post: post, friend: friend };
}

export default connect(mapStateToProps, {fetchFriend})(ProfileDashboard);