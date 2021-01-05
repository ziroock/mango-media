import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFeed } from '../../actions';

/*
* MangoFeedPostLists handles the fetching and rendering of all of the users posts.
*
* - componentDidMount():
*   + This function handles action call to get all user Posts based on userId.
* - toDateString(newDate):
*   + This function transforms to the following date form hh:mm mm/dd/yy based
*     on the incoming newDate.
*   + TODO: Add conditional to change from military time to am/pm because people don't know military time
* - render():
*   + If there are existing posts for this user, map over in
*     reverse order and calculate the proper post #.
*   + Then the information relative to each post is sent to <ProfilePostMenu/>.
*     <ProfilePostMenu/> handles edits and deletes based on the info received.
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


class MangoFeedPostLists extends Component {
    componentDidMount() {
        this.props.fetchFeed();
    }


    // function that auto generates n number of comments
    genComments = (n) => {
        let commentsBody = [];
        for(let i = 0; i < n; i++) {
            let str = "This is comment " + i + " and I like it";
            commentsBody.push(str)
        }
        if(commentsBody.length > 0) {
            return commentsBody.map((body) => {
                return(
                    <div className="post-reply-box">
                        <div className="post-reply-avatar"></div>
                        <div className="post-reply-text-box">
                            <textarea disabled className="text-area" value={body}/>
                        </div>
                    </div>
                )
            })
        }
        return null;
    }

    //TODO: Add conditional to change from military time to am/pm because people don't know military time
    toDateString(newDate){
        let date = '';
        date = date + newDate.getHours().toString().padStart(2, '0') + ':' +
            newDate.getMinutes().toString().padStart(2, '0') + ' ' +
            newDate.getMonth().toString().padStart(2, '0') + '/' +
            newDate.getDate().toString().padStart(2, '0') + '/' +
            newDate.getFullYear().toString().padStart(4, '0');

        return date;
    }


    renderPostList(){
        let numberPosts = this.props.feed.length;
        if(numberPosts > 0) {
            return this.props.feed.reverse().map((post, i) => {
                console.log(post)
                let postId = "mango-post-" + post._id;
                let postReplyID = "post-reply-container-" + post._id;
                return(
                    <div key = {post._id} id={postId} className="mangoPost">
                        <div className="post-usr-box">
                            <label className="post-owner-title">
                                {post.userName}
                            </label>
                            <img src={post.avatarSrc} className="post-avatar-img" />
                        </div>
                        <label className="post-date">
                            {this.toDateString(new Date(post.dateCreated))}
                        </label>
                        <div className="text-box">
                            <textarea disabled className="text-area" value={post.body}/>
                        </div>
                        <div id={postReplyID} className="post-reply-container">
                            {this.genComments(5)}
                        </div>
                        <button className="show-more" type="button" onClick={ () => {
                            document.getElementById(postId).style.height = '400px';
                            document.getElementById(postReplyID).style.height = '66%';
                            document.getElementById(postReplyID).style.overflowY = 'auto';
                            document.getElementById(postReplyID).style.overflowX = 'hidden';
                        }}>show more</button>
                    </div>
                );
            });
        } else {
            return <h3> No new posts from your friends! </h3>;
        }
    }

    showMoreToggle() {
        let coll = document.getElementsByClassName("collapsible");
        for (let i = 0; i < coll.length; i++) {
            coll[i].addEventListener("click", function() {
                this.classList.toggle("active");
                let content = this.nextElementSibling;
                if (content.style.display === "block") {
                    content.style.display = "none";
                } else {
                    content.style.display = "block";
                }
            });
        }
        return null;
    }

    render() {
        return(
            <div className="mango-post-list">
                {this.renderPostList()}
                {this.showMoreToggle()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { feed: state.feed };
}

export default connect(mapStateToProps, { fetchFeed })(MangoFeedPostLists);