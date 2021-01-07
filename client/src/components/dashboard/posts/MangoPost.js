import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFeed } from '../../../actions';
import MangoPostMenu from './MangoPostMenu';
/*
 * MangoPost handles the fetching and rendering of all of the users posts.
 *
 * - componentDidMount():
 *   + This function handles action call to get all user posts based on userId.
 * - toDateString(newDate):
 *   + This function transforms to the following date form hh:mm mm/dd/yy based
 *     on the incoming newDate.
 *   + TODO: Add conditional to change from military time to am/pm because people don't know military time
 * - render():
 *   + If there are existing posts for this user, map over in
 *     reverse order
 *   + Then the information relative to each post is sent to <MangoPostMenu/>.
 *     <MangoPostMenu/> handles edits and deletes based on the info received.
 * */

/** TODO TODO TODO TODO TODO
 *
 *  - make mango-post-main component
 *  - crate a toggle function that opens and closes more comments
 *      - make sure only one show more open at a time !!!
 *        this means that when a user has an open show more comments on one post
 *        when he opens another one the already opened one needs to close!
 *  - finish show more working properly  aka scrollable
 *  - make a function that auto generates n number of comments
 *  - add ES lint from the gallery project
 *
 * **/

class MangoPost extends Component {
  componentDidMount() {
    this.props.fetchFeed();
  }

  // function that auto generates n number of comments
  genComments = (n, postId) => {
    let comments = [];
    for (let i = 0; i < n; i++) {
      let str = 'This is comment ' + i + ' and I like it';
      let key = postId + i.toString();
      let tmp = {
        body: str,
        key: key,
      };
      comments.push(tmp);
    }
    if (comments.length > 0) {
      return comments.map(({ body, key }) => {
        return (
          <div key={key} className="post-comment-box">
            <img
              alt="comment-avatar"
              className="post-comment-avatar avatar"
              src="https://mango-media-album.s3.us-west-2.amazonaws.com/1607485963493"
            />
            <div className="post-comment-text-box">
              <textarea disabled className="text-area" value={body} />
            </div>
          </div>
        );
      });
    }
    return null;
  };

  //TODO: Add conditional to change from military time to am/pm because people don't know military time
  toDateString(newDate) {
    let date = '';
    date =
      date +
      newDate
        .getHours()
        .toString()
        .padStart(2, '0') +
      ':' +
      newDate
        .getMinutes()
        .toString()
        .padStart(2, '0') +
      ' ' +
      newDate
        .getMonth()
        .toString()
        .padStart(2, '0') +
      '/' +
      newDate
        .getDate()
        .toString()
        .padStart(2, '0') +
      '/' +
      newDate
        .getFullYear()
        .toString()
        .padStart(4, '0');

    return date;
  }

  toggleComments = (buttonId, postReplyID, postId) => {
    let buttonElem = document.getElementById(buttonId);
    let commentElem = document.getElementById(postReplyID);
    let postElem = document.getElementById(postId);
    if (buttonElem.innerText === 'show more') {
      postElem.style.height = '450px';
      commentElem.style.height = '66%';
      commentElem.style.overflowY = 'auto';
      commentElem.style.overflowX = 'hidden';
      buttonElem.innerText = 'show less';
    } else if (buttonElem.innerText === 'show less') {
      postElem.style.height = '340px';
      commentElem.style.height = '170px';
      commentElem.style.overflowY = 'hidden';
      buttonElem.innerText = 'show more';
      buttonElem.style.background = 'none';
    }
  };

  renderPostMenu() {
    const post = this.props.post;
    if (this.props.isPersonal) {
      return (
        <MangoPostMenu
          id={post._id}
          title={'Mongo Post'}
          body={post.body}
          date={'Posted On:' + this.toDateString(new Date(post.dateCreated))}
        />
      );
    }
    return null;
  }

  render() {
    const post = this.props.post;
    let postId = 'mango-post-' + post._id;
    let postReplyID = 'post-comment-container-' + post._id;
    let buttonId = 'post-button-' + post._id;
    return (
      <div key={post._id} id={postId} className="mangoPost">
        {this.renderPostMenu()}
        <div className="post-usr-box">
          <label className="post-owner-title">{post.userName}</label>
          <img alt="post-avatar" src={post.avatarSrc} className="post-avatar-img" />
        </div>
        <label className="post-date">{this.toDateString(new Date(post.dateCreated))}</label>
        <div className="text-box">
          <textarea disabled className="text-area" value={post.body} />
        </div>
        <div id={postReplyID} className="post-comment-container">
          {this.genComments(5, post._id)}
        </div>
        <button
          onClick={() => {
            this.toggleComments(buttonId, postReplyID, postId);
          }}
          id={buttonId}
          className="show-more"
          type="button"
        >
          show more
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { feed: state.feed };
}

export default connect(mapStateToProps, { fetchFeed })(MangoPost);
