import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class ProfilePost extends Component {
    constructor(props) {
        super(props);
        this.state = {body: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    async handleSubmit(event) {
        console.log(this.state.body);
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
                        }} defaultValue="Write a post..."/>
                    <button className="btn waves-effect waves-light teal accent-3" type="submit">Post</button>
                </form>
            </div>
        )
    }
}

export default connect(null, actions)(ProfilePost);