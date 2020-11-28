import React, { Component } from 'react';

class UploadButton extends Component {
    constructor(props) {
        super(props);
        this.types = ['image/png', 'image/jpeg'];
        this.state = { file: null, error: null, showUploadReview: false};
        this.handleChange = this.handleChange.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
    }

    //https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
    previewFile() {
        console.log("Na maika ti putkata");
        const preview = document.getElementById('previewPic');
        if(preview) {
            const file = document.getElementById('picField').files[0];
            const reader = new FileReader();
            console.log(preview);
            console.log(file);

            reader.addEventListener("load", function () {
                preview.src = reader.result;
            }, false);
            reader.readAsDataURL(file);
        }
        return null;
    }

    async handleChange() {
        let chosen = document.getElementById('picField').files[0];
        console.log(chosen);
        if(chosen && this.types.includes(chosen.type)) {
            this.setState( { file: chosen, error: '', showUploadReview: !this.state.showUploadReview});
        } else {
            this.setState( { file: null, error: 'Please select an (.png or .jpg) image.'});
        }
    }

    toggleEdit() {
        this.setState({ showUploadReview: !this.state.showUploadReview, showPic: false });
    }
//https://stackoverflow.com/questions/3814231/loading-an-image-to-a-img-from-input-file
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
                    <input type="file" name="picField" id="picField" onChange={this.previewFile}/>
                    <span>+</span>
                </label>
                <div className="output">
                    { this.state.error && <div className="error">{ this.state.error }</div>}
                    { this.state.file && <div>{ this.state.file.name }</div> }
                </div>
                <img id="previewPic" src="" height="200" alt="Image preview ..."/>
            </form>,
            this.renderModal()
        ])
    }
}

export default UploadButton;