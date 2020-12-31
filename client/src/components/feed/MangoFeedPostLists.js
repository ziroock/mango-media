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


class MangoFeedPostLists extends Component {
    componentDidMount() {
        this.props.fetchFeed();
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
                return [
                    <div className="card blue-grey" key={post._id}>
                        <div className="card-content white-text">
                            <span className="card-title">Mango Post #{numberPosts - i}</span>
                            <p>{post.body}</p>
                            <p className="right">
                                Posted On: {this.toDateString(new Date(post.dateCreated))}
                            </p>
                        </div>
                    </div>,
                    <div className="mangoPost">
                        <label className="post-owner-title">
                            {post.userName}
                        </label>
                        <label className="post-date">
                            {this.toDateString(new Date(post.dateCreated))}
                        </label>
                        <div className="text-box">
                            <form className="text-area">
                                <textarea className="text-area">
                                    {post.body}
                                </textarea>
                            </form>
                        </div>
                    </div>
                ];
            });
        } else {
            return <h3> No new posts from your friends! </h3>;
        }
    }

    render() {
        return(
            <div className="mango-post-list">
                {this.renderPostList()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { feed: state.feed };
}

export default connect(mapStateToProps, { fetchFeed })(MangoFeedPostLists);