import React, { Component } from "react";
import { reduxForm, Field } from 'redux-form';

/**
 * InvitationForm shows a from for a user to add input
 * **/

class InvitationForm extends Component {
    render() {
        return(
            <div>
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
                <Field
                    type="text"
                    name="inviteTitle"
                    component="input"
                />
                <button type="submit"> Submit </button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'invitationForm'
})(InvitationForm);