import React, {Component} from 'react';
import MangoPost from "./MangoPost";
import { connect } from 'react-redux';
import { fetchFeed } from '../../actions';

class MangoFeed extends Component {
    componentDidMount() {
        this.props.fetchFeed();
    }

    renderPostList() {
        let numberPosts = this.props.feed.length;
        if (numberPosts > 0) {
            return this.props.feed.reverse().map((post, i) => {
                return <MangoPost post={post} isPersonal={true}/>;
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
                            <div className="avatar-box">
                            </div>
                        </div>
                        <div className="mango-post-list">
                            {this.renderPostList()}
                        </div>
                        <div className="right-pane">
                        </div>
                    </div>
                );
        }
    }
}

function mapStateToProps(state) {
    return { feed: state.feed };
}

export default connect(mapStateToProps, { fetchFeed })(MangoFeed);