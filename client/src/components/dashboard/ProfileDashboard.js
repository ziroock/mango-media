import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFriend, fetchPosts } from '../../actions';
import ProfileCover from './Cover/ProfileCover';
import MangoPostCreate from './posts/MangoPostCreate';
import { isPersonal } from '../../utils/mango.utils';
import MangoPost from './posts/MangoPost';
/*
 * ProfileDashboard is the component that holds all the User Profile Components!
 * It holds: <ProfileCover/>, <MangoPostCreate/> and <MangoPostCreateList/>
 * TODO: Good for now, but need to make scalable keeping the same resolution
 * */

class ProfileDashboard extends Component {
  constructor(props) {
    super(props);
    this.dashboardId = this.props.match.params.userId;
    this.userId = this.props.userId;
  }

  componentDidMount() {
    this.props.fetchFriend({ friendId: this.dashboardId });
    this.props.fetchPosts({ userId: this.dashboardId });
  }

  renderPostList(personalPage) {
    let numberPosts = this.props.post.length;
    if (numberPosts > 0) {
      return this.props.post.reverse().map(post => {
        console.log(post._id);
        return <MangoPost key={post._id} post={post} isPersonal={personalPage} />;
      });
    } else {
      return <h3> Write your first Post! </h3>;
    }
  }

  renderProfileDashboard(userId, dashboardId, personalPage) {
    switch (userId) {
      case null:
        return <h2>Please Sign In to access dashboard!</h2>;
      case false:
        return <h2>Please Sign In to access dashboard!</h2>;
      default:
        return (
          <div className="container green lighten-4">
            <ProfileCover
              userId={userId}
              dashboardId={dashboardId}
              personalPage={personalPage}
              userName={this.props.friend.name}
            />
            <MangoPostCreate userId={userId} personalPage={personalPage} />
            {this.renderPostList(personalPage)}
          </div>
        );
    }
  }

  render() {
    let personalPage = isPersonal(this.props.userId, this.dashboardId);
    if (personalPage) {
      return this.renderProfileDashboard(this.props.userId, this.props.userId, personalPage);
    } else if (this.props.userId && this.dashboardId) {
      return this.renderProfileDashboard(this.props.userId, this.dashboardId, personalPage);
    } else {
      return <h2>Not Logged in : )</h2>;
    }
  }
}

function mapStateToProps({ friend, post }) {
  return { post: post, friend: friend };
}

export default connect(mapStateToProps, { fetchFriend, fetchPosts })(ProfileDashboard);
