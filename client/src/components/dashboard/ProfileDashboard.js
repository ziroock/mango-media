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

    renderUserProfile() {
        if (this.props.friend) {
            console.log(this.props.friend);
        }
        console.log("The dashboardId is: ", this.dashboardId);
        console.log("The userId isZZZ: ", this.props.userId);
        let kur =  isPersonal(this.props.userId, this.dashboardId);
        console.log("Personal: ", kur);


        if ( (this.props.friend && this.props.userId) && kur ) {

            console.log( (this.props.friend.toString() === this.props.userId.toString()) );
            switch (this.props.userId) {
                case null:
                    return <h2>Please Sign In to access dashboard!</h2>;
                case false:
                    return <h2>Please Sign In to access dashboard!</h2>;
                default:
                    return (
                        <div className="container green lighten-4">
                            <ProfileCover userId={ this.dashboardId }/>
                            <ProfilePost userId={ this.dashboardId }/>
                            <ProfilePostList userId={ this.dashboardId }/>
                        </div>
                    );
            }
        }
        else{
            return <h2>NOT Ya Page ; )</h2>;
        }
    }

    render() {
        return this.renderUserProfile();
    }
}
function mapStateToProps({ friend, post }) {
    return { post: post, friend: friend };
}

export default connect(mapStateToProps, {fetchFriend})(ProfileDashboard);