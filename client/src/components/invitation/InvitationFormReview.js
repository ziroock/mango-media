import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';
/**
 * InvitationFormReview shows users their form inputs for review
 * **/

const FIELDS = [
  { label: 'Invite Your Friends To Mango Media!', name: 'recipients', errorMsg: 'You must input recipients emails!' },
];

// history object is provided by react-router-dom 178 Redirect on Submit
const InvitationFormReview = ({ onCancel, formValues, submitInvite, history }) => {
  const reviewFields = FIELDS.map(({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>{formValues[name]}</div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button className="yellow darken-3 btn-flat" onClick={onCancel}>
        <i className="material-icons left">arrow_back</i>
        Back
      </button>
      <button
        // wrapping it with an arrow function so id does not execute unless clicked
        onClick={() => submitInvite(formValues, history)}
        className="green btn-flat right white-text"
      >
        Send Invites
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  // console.log(state);
  return { formValues: state.form.invitationForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(InvitationFormReview));
