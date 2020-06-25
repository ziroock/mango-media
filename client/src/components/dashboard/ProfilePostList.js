import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions';


//TODO: when I add a new post the PfogilePostList breaks on update :( !!!

class ProfilePostList extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }

    renderPosts() {
        return this.props.posts.reverse().map(post => {
            return (
                <div className="card blue-grey" key={post._id}>
                    <div className="card-content white-text">
                        <span className="card-title">Mango Post</span>
                        <p>{post.body}</p>
                        <p className="right">
                            Posted On: {new Date(post.dateCreated).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                {this.renderPosts()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { posts: state.post };
}

export default connect(mapStateToProps, { fetchPosts })(ProfilePostList);