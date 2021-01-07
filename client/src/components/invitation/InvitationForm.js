import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import validateEmails from '../../utils/validateEmails';
import InvitationField from './invitationField';

/**
 * InvitationForm shows a from for a user to add input
 * **/

const FIELDS = [
  { label: 'Invite Your Friends To Mango Media!', name: 'recipients', errorMsg: 'You must input recipients emails!' },
];

class InvitationForm extends Component {
  renderFields() {
    return FIELDS.map(({ label, name }) => {
      return <Field key={name} component={InvitationField} type="text" label={label} name={name} />;
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to="/" className="red btn-flat left white-text">
            Cancel
          </Link>
          <button type="submit" className="teal btn-flat right white-text">
            Next
            <i className="material-icons right">arrow_forward</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || '');

  FIELDS.forEach(({ name, errorMsg }) => {
    if (!values[name]) {
      errors[name] = errorMsg;
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'invitationForm',
  destroyOnUnmount: false,
})(InvitationForm);
