import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions';
import ProfilePostMenu from './ProfilePostMenu';

class ProfilePostList extends Component {
    componentDidMount() {
        this.props.fetchPosts();
    }

    findNumberOfPosts() {
        let numberPosts = 0;
        try {
            this.props.posts.forEach(() => numberPosts++);
        } catch {
            console.log(this.props.posts);
        }
        return numberPosts;
    }

    //TODO: Add conditional to change from military time to am/pm because people don't know military time
    toDateString(newDate){
        let date = '';
        date = date + newDate.getUTCHours().toString().padStart(2, '0') + ':' +
            newDate.getUTCMinutes().toString().padStart(2, '0') + ' ' +
            newDate.getUTCMonth().toString().padStart(2, '0') + '/' +
            newDate.getUTCDate().toString().padStart(2, '0') + '/' +
            newDate.getUTCFullYear().toString().padStart(4, '0');

        return date;
    }

    renderPosts() {
        let numberPosts= this.findNumberOfPosts()
        if(numberPosts > 0) {
            return this.props.posts.reverse().map((post, i) => {
                return (
                    <div className="card blue-grey" key={post._id}>
                        <div className="card-content white-text">
                            <span className="card-title">Mango Post #{numberPosts - i}</span>
                            <ProfilePostMenu data={post._id}/>
                            <p>{post.body}</p>
                            <p className="right">
                                Posted On: {this.toDateString(new Date(post.dateCreated))}
                            </p>
                        </div>
                    </div>
                );
            });
        } else {
            return <div> Write your first Post! </div>;
        }
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