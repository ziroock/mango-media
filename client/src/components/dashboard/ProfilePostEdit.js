import React, { Component } from "react";
import { connect } from 'react-redux';
import { editPost } from '../../actions';

// TODO: Document what key functions are doing
class ProfilePostEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {body: this.props.postBody};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value} );
    }

    handleSubmit(event) {
        event.preventDefault();
        if(this.state.body.trim() !== '') {
            this.props.editPost({body: this.state.body, postId: this.props.postId});
        }
        this.props.closePopUp();
    }

    renderCard() {
        return(
            <div className="card blue-grey">
                <div className="card-content white-text">
                    <i onClick={this.props.closePopUp}
                        style={{
                            cursor: 'pointer',
                            position: 'absolute',
                            top: "0px",
                            right: "0px"
                        }}
                        className='material-icons'
                    > close </i>
                    <span className="card-title">{this.props.postTitle}</span>
                    <textarea className="white" onChange={this.handleChange} name="body"
                              style={{
                                  width: "700px",
                                  height: "100px",
                                  border: "none",
                                  resize: "none"
                              }} value={this.state.body}
                    />
                    <button onClick={this.handleSubmit}>submit</button>
                    <p className="right">{this.props.postDate}</p>
                </div>
            </div>
        );
    }
    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    {this.renderCard()}
                </div>
            </div>
        );
    }
}
export default connect(null, { editPost })(ProfilePostEdit);