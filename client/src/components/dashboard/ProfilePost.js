import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const defaultPostValue = 'Write post...';

class ProfilePost extends Component {
    constructor(props) {
        super(props);
        this.state = {body: defaultPostValue};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        if(this.state.body === defaultPostValue) {
            this.setState({ [event.target.name]: event.target.value.slice(-1) });
        } else {
            this.setState({ [event.target.name]: event.target.value} );
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        await this.props.createPost(this.state);
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
                    <button className="btn waves-effect waves-light teal accent-3" type="submit">Post</button>
                </form>
            </div>
        )
    }
}

export default connect(null, actions)(ProfilePost);