import React, { Component } from 'react';
import { connect } from 'react-redux';
import {createPost, uploadPicture} from '../../../actions';
//const sizeOf = require('image-size');
// - Need to connect the upload process to the back end.
// - Connect reducer, create action, and back end rout.

//This however, is a security threat because If the image is changed a wrongful file src might be appointed.
// to get rid of it I can verify sources before I load them in my code, and check where the src is being executed.

//Another approach is viable that will remove the security thread! I can upload the photo
// and portray it directly to the user.
class UploadPicModal extends Component {
    constructor(props) {
        super(props);
        this.types = ['image/png', 'image/jpeg'];
        this.state = { file: null, error: null, showUploadReview: false, showPic: null};
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.previewFile = this.previewFile.bind(this);
        //https://stackoverflow.com/questions/12081493/capturing-the-close-of-the-browse-for-file-window-with-javascript/12133295#12133295
        this.tmpFile = null;
    }


    //https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
    ///
    previewFile(chosen) {
        const preview = document.getElementById('hiddenPic');
        const self = this;
        if(preview) {
            const reader = new FileReader();
            console.log(preview);
            console.log(chosen);
            reader.addEventListener("load", function () {
                preview.src = reader.result;
                const img = new Image();
                img.src = preview.src;
                console.log("img.width: ", img.width, "img.height: ", img.height);

                self.setState({ showPic: preview.src });
                console.log(preview.src);
            }, false);
            reader.readAsDataURL(chosen);
        }
        return null;
    }


    handleClick(e) {
        console.log(e.target);
        console.log(e.target.value);
        this.tmpFile = e.target.value;
        e.target.value = null;
    }


    handleChange(e) {
        console.log("HANDLE CHANGE");
        let chosen = e.target.files[0];
        console.log(e.target.value);
        console.log(chosen);
        if((this.tmpFile === e.target.value && ( chosen && this.types.includes(chosen.type) )) ||
            (chosen && this.types.includes(chosen.type) )) {
                this.setState( { file: chosen, error: '', showUploadReview: !this.state.showUploadReview});
                this.previewFile(chosen);
                console.log("ShowMODALLLLLL");
        } else {
            this.setState( { file: null, error: 'Please select an (.png or .jpg) image.'});
            console.log("ShowModal!!!!: ", this.state.showUploadReview );
        }
    }


    // // TODO: add submit on enter, not just on the button click
    async handleSubmit(event) {
        event.preventDefault();
        if(this.state.file) {
            console.log("The picture state is: ");
            console.log(this.state.file);
            //https://www.pluralsight.com/guides/asynchronous-file-upload-react
            //Change file before sending
            const file = this.state.file;
            const formData = new FormData();
            formData.append("image", file);
            this.props.uploadPicture(formData);
            this.toggleEdit();
        }
    }


    toggleEdit() {
        this.setState({ showUploadReview: !this.state.showUploadReview, showPic: null, file: null });
        console.log("ShowModal: ", this.state.showUploadReview );
    }
//onClick={this.handleSubmit}
//https://stackoverflow.com/questions/3814231/loading-an-image-to-a-img-from-input-file
    renderModal() {
        if(this.state.file && this.state.showUploadReview && this.state.showPic) {
            return (
            <div id='pic_upload' className='popup' key="upload-pop-up">
                <div className='popup_inner'>
                    <div id="preview-uploaded-pic-frame">
                        <i onClick={this.toggleEdit}
                           style={{
                               cursor: 'pointer',
                               position: 'absolute',
                               top: "0px",
                               right: "0px"
                           }}
                           className='material-icons'
                        > close </i>
                        <button onClick={this.handleSubmit}><i className='material-icons'>
                            submit
                        </i></button>
                        <div className="center" id="preview-uploaded-pic" >
                            <img id="previewPic" src={this.state.showPic} alt="Upload Pic Preview."/>
                        </div>
                    </div>
                </div>
            </div>
            )
        } else {
            return null;
        }
    }


    renderButton() {
        if(this.props.auth._id === this.props.userId) {
            return([
                <form key="UploadModal123">
                    <label>
                        <input type="file" className="image" id="picField" onClick={this.handleClick} onChange={this.handleChange}/>
                        <span>+</span>
                    </label>
                    <div className="output">
                        { this.state.error && <div className="error">{ this.state.error }</div> }
                    </div>
                    <img id="hiddenPic" src="" height="200" alt="Image preview ..." style={{display: "none"}}/>
                </form>,
                this.renderModal()
            ])
        }
        else {
            return null;
        }
    }


    render() {
        return( this.renderButton());
    }
}


function mapStateToProps(state) {
    return { auth: state.auth };
}


export default connect(mapStateToProps, { uploadPicture })(UploadPicModal);