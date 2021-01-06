import React, {Component} from 'react';
import MangoFeedPostLists from "./MangoFeedPostLists";

class MangoFeed extends Component {


    renderFeed() {
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
                                avatar box
                            </div>
                        </div>
                        <MangoFeedPostLists/>
                        <div className="right-pane">
                        </div>
                    </div>
                );
        }
    }


    render() {
        return this.renderFeed();
    }
}

export default MangoFeed;