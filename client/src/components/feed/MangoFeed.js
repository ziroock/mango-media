import React, {Component} from 'react';
import MangoFeedPostLists from "./MangoFeedPostLists";

class MangoFeed extends Component {


    renderProfileDashboard() {
        switch (this.props.userId) {
            case null:
                return <h2>Please Sign In to access dashboard!</h2>;
            case false:
                return <h2>Please Sign In to access dashboard!</h2>;
            default:
                return (
                    <div className="container green lighten-4 container-background">
                        <h2>FEED</h2>
                        <MangoFeedPostLists/>
                    </div>
                );
        }
    }


    render() {
        return this.renderProfileDashboard();
    }
}

export default MangoFeed;