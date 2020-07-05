import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../../actions';
import ProfilePostMenu from './ProfilePostMenu';

// TODO: Document what key functions are doing

class ProfilePostList extends Component {
    componentDidMount() {
        this.props.fetchPosts({userId: this.props.userId});
        console.log(this.props.userId);
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
        date = date + newDate.getHours().toString().padStart(2, '0') + ':' +
            newDate.getMinutes().toString().padStart(2, '0') + ' ' +
            newDate.getMonth().toString().padStart(2, '0') + '/' +
            newDate.getDate().toString().padStart(2, '0') + '/' +
            newDate.getFullYear().toString().padStart(4, '0');

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
                            <ProfilePostMenu
                                id={post._id}
                                title={'Mongo Post #' + (numberPosts - i).toString()}
                                body={post.body}
                                date={'Posted On:' + this.toDateString(new Date(post.dateCreated))}
                            />
                            <p>{post.body}</p>
                            <p className="right">
                                Posted On: {this.toDateString(new Date(post.dateCreated))}
                            </p>
                        </div>
                    </div>
                );
            });
        } else {
            return <h3> Write your first Post! </h3>;
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