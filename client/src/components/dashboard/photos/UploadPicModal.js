import React, { Component } from 'react';
// For now I am using just a temporary image that is not displayed to upload the src temporarilly
// because I cannot use setState inside an event listener.

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
        this.toggleEdit = this.toggleEdit.bind(this);
        this.previewFile = this.previewFile.bind(this);
    }


    //https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
    previewFile(chosen) {
        const preview = document.getElementById('hiddenPic');
        const self = this;
        if(preview) {
            const reader = new FileReader();
            console.log(preview);
            console.log(chosen);
            reader.addEventListener("load", function () {
                preview.src = reader.result;
                self.setState({ showPic: preview.src });
                console.log(preview.src);
            }, false);
            reader.readAsDataURL(chosen);
        }
        return null;
    }


    handleChange() {
        console.log("BAT BOIKO");
        let chosen = document.getElementById('picField').files[0];
        console.log(chosen);
        if(chosen && this.types.includes(chosen.type)) {
            this.setState( { file: chosen, error: '', showUploadReview: !this.state.showUploadReview});
            this.previewFile(chosen);
            console.log("ShowModal: ", this.state.showUploadReview );
        } else {
            this.setState( { file: null, error: 'Please select an (.png or .jpg) image.'});
            console.log("ShowModal!!!!: ", this.state.showUploadReview );
        }
    }


    toggleEdit() {
        this.setState({ showUploadReview: !this.state.showUploadReview, showPic: null, file: null });
        console.log("ShowModal: ", this.state.showUploadReview );
        //TODO: Need to clear the field info on close.
        let chosen = document.getElementById('picField').files[0];
        //this.clearInputFile(chosen);
        chosen.value = "";
        console.log(chosen);
    }


    //https://stackoverflow.com/questions/1703228/how-can-i-clear-an-html-file-input-with-javascript
    //https://jsbin.com/muhipoye/1/edit?html,js,output
    clearInputFile(f){
        if(f.value){
            try{
                f.value = ''; //for IE11, latest Chrome/Firefox/Opera...
            }catch(err){
            }
            if(f.value){ //for IE5 ~ IE10
                let form = document.createElement('form'), ref = f.nextSibling;
                form.appendChild(f);
                form.reset();
                ref.parentNode.insertBefore(f,ref);
            }
        }
    }



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


    render() {
        return([
            <form key="UploadModal123">
                <label>
                    <input type="file" name="picField" id="picField" onChange={this.handleChange}/>
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
}

export default UploadPicModal;