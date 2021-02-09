import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFriend, fetchPosts } from '../../actions';
import ProfileCover from './Cover/ProfileCover';
import MangoPostCreate from './posts/MangoPostCreate';
import { isPersonal } from '../../utils/mango.utils';
import MangoPost from './posts/MangoPost';
import mangoSVGS from '../../utils/imporImages';
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

  //TODO: Fix the Post Creat css to match the theme!
  // Unfortunately, I forgot to create a mock up for this part of the code :(
  renderDashboard(userId, dashboardId, personalPage) {
    switch (userId) {
      case null:
        return null;
      case false:
        window.location.href = '/login';
        return null;
      default:
        return (
          <div id="feed-page-container">
            <div className="profile-header">
              <div className="login-mango-logo">
                <img className="mango-logo-m" src={mangoSVGS.logo.logoM} />
                <img className="mango-logo-a" src={mangoSVGS.logo.logoA} />
                <img className="mango-logo-n" src={mangoSVGS.logo.logoN} />
                <img className="mango-logo-g" src={mangoSVGS.logo.logoG} />
                <img className="mango-logo-mango" src={mangoSVGS.logo.logoO} />
              </div>
            </div>
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
    const personalPage = isPersonal(this.props.userId, this.dashboardId);
    if (personalPage) {
      return this.renderDashboard(this.props.userId, this.props.userId, personalPage);
    } else if (this.props.userId && this.dashboardId) {
      return this.renderDashboard(this.props.userId, this.dashboardId, personalPage);
    } else {
      return null;
    }
  }
}

function mapStateToProps({ friend, post }) {
  return { post: post, friend: friend };
}

export default connect(mapStateToProps, { fetchFriend, fetchPosts })(ProfileDashboard);
