import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../../actions';

const defaultPostValue = 'Write a post...';

/*
* ProfilePost handles everything behind creating a new post on the client side.
*
* - handleChange():
*   + This is a generic function to handle changes inside the text area.
*   + When the text of body is default, delete everything and start with new
*     information.
*   + When the text is not defaultPostValue, then keep updating the new body,
*     continue to listen for new input from the keyboard.
* - handleChange():
*   + If the body is not empty and the body is not equal to default send
*     request to createPost. Then update the body of the text area to default
*   + TODO: add submit on enter, not just on the button click
* */

class ProfilePost extends Component {
    constructor(props) {
        super(props);
        this.state = {body: defaultPostValue};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log('The handle change is: ' + event.target.value);
        if(this.state.body.trim() === defaultPostValue) {
            this.setState({ [event.target.name]: event.target.value.slice(-1) });
        } else {
            this.setState({ [event.target.name]: event.target.value} );
        }
    }


    // TODO: add submit on enter, not just on the button click
    handleSubmit(event) {
        event.preventDefault();
        if(this.state.body.trim() !== '' && this.state.body.trim() !== defaultPostValue) {
             this.props.createPost(this.state);
             this.setState({body: defaultPostValue});
        }
    }

    render() {
        if(this.props.auth._id === this.props.userId){
            return(
                <div style={{ textAlign: "center"}}>
                    <label style={{ fontSize: '20px'}}>Post</label>
                    <form onSubmit={this.handleSubmit} method="post">
                    <textarea className="white" onChange={this.handleChange} name="body"
                              style={{
                                  width: "700px",
                                  height: "100px",
                                  border: "none",
                                  resize: "none"
                              }} value={this.state.body}/>
                        <button style={{ fontSize: '20px', top: "-20px", left: "10px", zIndex: '1'}}
                                className="btn waves-effect waves-light teal accent-3" type="submit">
                            Post
                        </button>
                    </form>
                </div>
            )
        }
        return null;
    }
}

function mapStateToProps(state) {
    return { auth: state.auth };
}

export default connect(mapStateToProps, { createPost })(ProfilePost);