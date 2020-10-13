import React, { Component } from "react";
import InvitationForm from "./InvitationForm";
import InvitationFormReview from "./InvitationFormReview";
/**
 * InvitationNew shows InvitationForm and InvitationFormReview
 * **/

class InvitationNew extends Component {
    state = { showFormReview: false };

    renderContent() {
        if (this.state.showFormReview) {
            return <InvitationFormReview
                onCancel={() => this.setState({showFormReview: false})}
            />;
        }

        return <InvitationForm
                onSurveySubmit={() => this.setState({showFormReview: true})}
        />;
    }

    render() {
        return(
        <div>
            {this.renderContent()}
        </div>
        );
    }
}

export default InvitationNew;