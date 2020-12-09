import React, { Component } from "react";
import UploadPicModal from "../photos/UploadPicModal";

// TODO: When I come back to fasten up my work process, create a base popup component gist

class CoverSettingsModal extends Component {


    renderModal() {
        return (
            <div id='pic_upload' className='popup' key="upload-pop-up">
                <div className='popup_inner'>
                    <div id="preview-uploaded-pic-frame">
                        <i onClick={this.props.toggle}
                            style={{
                               cursor: 'pointer',
                               position: 'absolute',
                               top: "0px",
                               right: "0px"
                           }}
                           className='material-icons'
                        > close </i>
                        <div style={{zIndex: "5"}}>
                            <UploadPicModal
                                userId={this.props.userId}
                                toggle={this.props.toggle}
                                uploadType={"cover"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    render() {
        return this.renderModal();
    }
}

export default CoverSettingsModal;
