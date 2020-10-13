/**
 * InvitationFormReview shows users their form inputs for review
 * **/
import React from 'react';

const InvitationFormReview = ({ onCancel }) => {
    return(
        <div>
            <h5>Please confirm your entries</h5>
            <button
                className="yellow darken-3 btn-flat"
                onClick={onCancel}
            >
                <i className="material-icons right">arrow_back</i>
                Back
            </button>
        </div>
    );
};

export default InvitationFormReview;