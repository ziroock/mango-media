import React, { Component } from 'react';
import MangoPost from '../dashboard/posts/MangoPost';
import { connect } from 'react-redux';
import { fetchFeed } from '../../actions';
import { isPersonal } from '../../utils/mango.utils';
import mangoSVGS from '../../utils/imporImages';

class MangoFeed extends Component {
  componentDidMount() {
    this.props.fetchFeed();
  }

  renderPostList() {
    let numberPosts = this.props.feed.length;
    // console.log(this.props.feed);
    if (numberPosts > 0) {
      return this.props.feed.reverse().map((post, i) => {
        let personalPost = isPersonal(this.props.userId, post._user);
        return <MangoPost key={post._id} post={post} isPersonal={personalPost} />;
      });
    } else {
      return <h3> No new posts from your friends! </h3>;
    }
  }

  render() {
    switch (this.props.userId) {
      case null:
        return null;
      case false:
        window.location.href = '/login';
        return null;
      default:
        return (
          <div className="iphone-11-pro-x screen">
            <div className="profile-header">
              <div className="login-mango-logo">
                <img className="mango-logo-m" src={mangoSVGS.logo.logoM} />
                <img className="mango-logo-a" src={mangoSVGS.logo.logoA} />
                <img className="mango-logo-n" src={mangoSVGS.logo.logoN} />
                <img className="mango-logo-g" src={mangoSVGS.logo.logoG} />
                <img className="mango-logo-mango" src={mangoSVGS.logo.logoO} />
              </div>
            </div>
            <div className="mango-post-list">{this.renderPostList()}</div>
          </div>
        );
    }
  }
}

function mapStateToProps(state) {
  return { feed: state.feed };
}

export default connect(mapStateToProps, { fetchFeed })(MangoFeed);
