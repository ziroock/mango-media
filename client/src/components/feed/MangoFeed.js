import React, { Component } from 'react';
import MangoPost from '../dashboard/posts/MangoPost';
import { connect } from 'react-redux';
import { fetchFeed } from '../../actions';
import { isPersonal } from '../../utils/mango.utils';

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
        return <h2>Please Sign In to access dashboard!</h2>;
      case false:
        return <h2>Please Sign In to access dashboard!</h2>;
      default:
        return (
          <div className="feed-page-container">
            <div className="left-pane">
              <div className="avatar-box"></div>
            </div>
            <div className="mango-post-list">{this.renderPostList()}</div>
            <div className="right-pane"></div>
          </div>
        );
    }
  }
}

function mapStateToProps(state) {
  return { feed: state.feed };
}

export default connect(mapStateToProps, { fetchFeed })(MangoFeed);
