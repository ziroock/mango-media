import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchFriend} from '../../actions/index';
import ProfileCover from "./ProfileCover";
import ProfilePost from "./Posts/ProfilePost";
import ProfilePostList from "./Posts/ProfilePostList";
import { isPersonal } from "../../utils/mango.utils";

/*
* ProfileDashboard is the component that holds all the User Profile Components!
* It holds: <ProfileCover/>, <ProfilePost/> and <ProfilePostList/>
* TODO: Good for now, but need to make scalable keeping the same resolution
* */


class ProfileDashboard extends Component {
    constructor(props) {
        super(props);
        this.dashboardId = this.props.match.params.userId;
    }


    componentDidMount() {
        this.props.fetchFriend({friendId: this.dashboardId});
    }


    renderProfileDashboard(userId, personalPage) {
        switch (userId) {
            case null:
                return <h2>Please Sign In to access dashboard!</h2>;
            case false:
                return <h2>Please Sign In to access dashboard!</h2>;
            default:
                return (
                    <div className="container green lighten-4">
                        <ProfileCover userId={userId} personalPage={personalPage} userName={this.props.friend.name}/>
                        <ProfilePost userId={userId} personalPage={personalPage}/>
                        <ProfilePostList userId={userId} personalPage={personalPage}/>
                    </div>
                );
        }
    }


    render() {
        let personalPage =  isPersonal(this.props.userId, this.dashboardId);
        if ( personalPage ) {
            return this.renderProfileDashboard(this.props.userId, personalPage);
        } else if (this.props.userId && this.dashboardId){
            return this.renderProfileDashboard(this.dashboardId, personalPage);
        } else {
            return <h2>Not Logged in : )</h2>
        }
    }
}


function mapStateToProps({ friend, post }) {
    return { post: post, friend: friend };
}


export default connect(mapStateToProps, {fetchFriend})(ProfileDashboard);