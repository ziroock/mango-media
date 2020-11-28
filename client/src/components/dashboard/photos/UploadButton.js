import React, { Component } from 'react';

class UploadButton extends Component {
    constructor(props) {
        super(props);
        this.types = ['image/png', 'image/jpeg'];
        this.state = { file: null, error: null, showUploadReview: false};
        this.handleChange = this.handleChange.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
    }

    handleChange(event) {
        let chosen = event.target.files[0];
        console.log(chosen);
        if(chosen && this.types.includes(chosen.type)) {
            this.setState( { file: chosen, error: '', showUploadReview: !this.state.showUploadReview});
        } else {
            this.setState( { file: null, error: 'Please select an (.png or .jpg) image.'});
        }
    }

    toggleEdit() {
        this.setState({ showUploadReview: !this.state.showUploadReview });
    }

    //<UploadPicReview toggleUpload={this.toggleEdit} uploadPic={this.state.file}/>
    renderModal() {
        if(this.state.file && this.state.showUploadReview) {
            return (
            <div id='pic_upload' className='popup'>
                <div className='popup_inner'>
                    <i onClick={this.toggleEdit}
                       style={{
                           cursor: 'pointer',
                           position: 'absolute',
                           top: "0px",
                           right: "0px"
                       }}
                       className='material-icons'
                    > close </i>
                    <h1> BATE BOIKO </h1>
                </div>
            </div>
            )
        } else {
            return null;
        }
    }

    render() {
        return([
            <form>
                <label>
                    <input type="file" onChange={this.handleChange}/>
                    <span>+</span>
                </label>
                <div className="output">
                    { this.state.error && <div className="error">{ this.state.error }</div>}
                    { this.state.file && <div>{ this.state.file.name }</div> }
                </div>

            </form>,
            this.renderModal()
        ])

    }
}

export default UploadButton;