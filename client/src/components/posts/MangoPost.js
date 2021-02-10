import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFeed } from '../../actions';
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

function getTextWidth(text, font) {
  // re-use canvas object for better performance
  let canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'));
  let context = canvas.getContext('2d');
  context.font = font;
  let metrics = context.measureText(text);
  return Math.floor(metrics.width);
}

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
        let font = "normal 14px 'Roboto'";
        let textWidth = getTextWidth(body, font);
        let textWidthWithPadding = textWidth + 10;
        let replyWidth = textWidthWithPadding.toString() + 'px';
        console.log(replyWidth);
        console.log(textWidthWithPadding);
        //post-comment-box
        return (
          <div key={key} className="mango-post-reply">
            <div className="mango-post-reply-name-and-date">
              <div className="mango-post-reply-name roboto-normal-white-15px">Jonny Doe</div>
              <div className="mango-post-reply-date roboto-normal-white-11px">1:50 01/07/20201</div>
            </div>
            <div className="mango-post-reply-avatar-and-text">
              <img
                alt="mango-post-reply-avatar"
                className="mango-post-reply-avatar avatar"
                src="https://mango-media-album.s3.us-west-2.amazonaws.com/1607485963493"
              />
              <text style={{ width: { replyWidth } }} className="mango-post-reply-text-area roboto-normal-white-13px">
                {body}
              </text>
              {/*<div className="mango-post-reply-inner-text-container">*/}
              {/*  <div className="mango-post-reply-inner-text-box" />*/}
              {/*  <div className="mango-post-reply-inner-text roboto-normal-white-13px">{body}</div>*/}
              {/*</div>*/}
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
      postElem.style.height = '207px';
      commentElem.style.height = '74px';
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
      <div key={post._id} id={postId} className="mango-post">
        {this.renderPostMenu()}
        <div className="post-name-and-date">
          <div className="mango-post-name roboto-normal-white-18px">{post.userName}</div>
          <div className="mango-post-date roboto-normal-white-13px">
            {this.toDateString(new Date(post.dateCreated))}
          </div>
        </div>
        <div className="mango-post-avatar-and-text">
          <img alt="mango-post-avatar" src={post.avatarSrc} className="mango-post-avatar" />
          <div className="mango-post-inner-text-container">
            <div className="mango-post-inner-text-box" />
            <div className="mango-post-inner-text roboto-normal-white-13px">{post.body}</div>
          </div>
        </div>
        <div id={postReplyID} className="post-comment-container">
          {this.genComments(5, postReplyID)}
        </div>
        <button
          onClick={() => {
            this.toggleComments(buttonId, postReplyID, postId);
          }}
          id={buttonId}
          className="show-more roboto-normal-screamin-green-13px"
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
