import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPicture } from '../../../actions';

/*
* ProfilePostList handles the fetching and rendering of all of the users posts.
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


class PictureGallery extends Component {
    componentDidMount() {
        this.props.fetchPicture({userId: this.props.userId});
        console.log(this.props.userId);
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

    /*
        renderPictures(){
        let numberPosts = this.props.posts.length;
        if(numberPosts > 0) {
            return this.props.posts.reverse().map((post, i) => {
                return (
                    <div className="card blue-grey" key={post._id}>
                        <div className="card-content white-text">
                            <span className="card-title">Mango Post #{numberPosts - i}</span>
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
    }*/

    renderPictures(){
        let numberPosts = this.props.picture.length;
        if(numberPosts > 0) {
            return this.props.picture.reverse().map((picture, i) => {
                return (
                    <img src={picture.src} height={picture.height} width={picture.width} alt={picture.desc}
                        style={{

                        }}
                    />
                );
            });
        } else {
            return <h3> Upload Your First Picture. </h3>;
        }
    }

    render() {
        return(
            <div className="pictureGallery" style={{ display: "flex", flexFlow: "row wrap" }} >
                {this.renderPictures()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { picture: state.picture };
}

export default connect(mapStateToProps, { fetchPicture})(PictureGallery);