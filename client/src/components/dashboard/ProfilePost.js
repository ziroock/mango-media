import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../../actions';

const defaultPostValue = 'Write post...';

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

    // The function first executes the following:
    //  if the trimmed version of the body is not equal to the default value or if equal to just whitespaces
    //  then make the post request to create post and then update the body to the defaultPostValue
    // TODO: add submit on enter, not just on the button click
    handleSubmit(event) {
        event.preventDefault();
        if(this.state.body.trim() !== '' && this.state.body.trim() !== defaultPostValue) {
             this.props.createPost(this.state);
             this.setState({body: defaultPostValue});
        }
    }

    render() {
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
}

export default connect(null, { createPost })(ProfilePost);