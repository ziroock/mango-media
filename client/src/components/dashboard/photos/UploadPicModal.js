import React, { Component } from 'react';
import { connect } from 'react-redux';
import { uploadPicture } from '../../../actions';
import mangoSVGS from '../../../utils/imporImages';
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
    this.state = { file: null, error: null, showUploadReview: false, showPic: null };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.previewFile = this.previewFile.bind(this);
    //https://stackoverflow.com/questions/12081493/capturing-the-close-of-the-browse-for-file-window-with-javascript/12133295#12133295
    this.tmpFile = null;
  }

  //https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
  previewFile(chosen) {
    const preview = document.getElementById('hiddenPic');
    const self = this;
    if (preview) {
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        function() {
          preview.src = reader.result;
          const img = new Image();
          img.src = preview.src;
          self.setState({ showPic: preview.src });
        },
        false
      );
      reader.readAsDataURL(chosen);
    }
    return null;
  }

  handleClick(e) {
    this.tmpFile = e.target.value;
    e.target.value = null;
  }

  handleChange(e) {
    let chosen = e.target.files[0];
    if (
      (this.tmpFile === e.target.value && chosen && this.types.includes(chosen.type)) ||
      (chosen && this.types.includes(chosen.type))
    ) {
      this.setState({ file: chosen, error: '', showUploadReview: !this.state.showUploadReview });
      this.previewFile(chosen);
    } else {
      this.setState({ file: null, error: 'Please select a (.png or .jpg) image.' });
    }
  }

  // // TODO: add submit on enter, not just on the button click
  async handleSubmit(event) {
    event.preventDefault();
    if (this.state.file) {
      //https://www.pluralsight.com/guides/asynchronous-file-upload-react
      //Change file before sending
      const file = this.state.file;
      const formData = new FormData();
      formData.append('image', file);
      this.props.uploadPicture(formData, this.props.uploadType);
      this.toggleEdit();

      // set invisible img src to null
      const preview = document.getElementById('hiddenPic');
      preview.src = '';
      if (this.props.toggle) {
        this.props.toggle();
      }
    }
  }

  toggleEdit() {
    this.setState({ showUploadReview: !this.state.showUploadReview, showPic: null, file: null });
  }

  //https://stackoverflow.com/questions/3814231/loading-an-image-to-a-img-from-input-file
  renderModal() {
    if (this.state.file && this.state.showUploadReview && this.state.showPic) {
      return (
        <div id="pic_upload" className="popup" key="upload-pop-up">
          <div className="popup_inner">
            <div id="preview-uploaded-pic-frame">
              <i
                onClick={this.toggleEdit}
                style={{
                  cursor: 'pointer',
                  position: 'absolute',
                  top: '0px',
                  right: '0px',
                }}
                className="material-icons"
              >
                {' '}
                close{' '}
              </i>
              <button onClick={this.handleSubmit}>
                <i className="material-icons">submit</i>
              </button>
              <div className="center" id="preview-uploaded-pic">
                <img id="previewPic" src={this.state.showPic} alt="Upload Preview." />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }

  renderButton() {
    console.log('blahBlah: ', this.props.auth._id, 'usrId: ', this.props.userId);
    if (this.props.auth._id === this.props.userId) {
      return [
        // <div className="mango-gallery-icon-pic-add">
        //   <img className="mango-gallery-icon-pic-add-1" src={mangoSVGS.mangoIconAddPic.mangoIconAddPic1} />
        //   <img className="mango-gallery-icon-pic-add-2" src={mangoSVGS.mangoIconAddPic.mangoIconAddPic2} />
        // </div>,
        <form className="button-add-photo" key="UploadModal123">
          <label className="mango-gallery-icon-pic-add">
            <input
              type="file"
              className="image"
              id="picField"
              onClick={this.handleClick}
              onChange={this.handleChange}
            />
            <img className="mango-gallery-icon-pic-add-1" src={mangoSVGS.mangoIconAddPic.mangoIconAddPic1} />
            <img className="mango-gallery-icon-pic-add-2" src={mangoSVGS.mangoIconAddPic.mangoIconAddPic2} />
          </label>
          <div className="output">{this.state.error && <div className="error">{this.state.error}</div>}</div>
          <img id="hiddenPic" src="" height="200" alt="Preview ..." style={{ display: 'none' }} />
        </form>,
        this.renderModal(),
      ];
    } else {
      return null;
    }
  }

  render() {
    return this.renderButton();
  }
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps, { uploadPicture })(UploadPicModal);
