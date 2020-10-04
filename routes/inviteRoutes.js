const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Mailer = require('../services/Mailer');
const inviteTemplate = require('../services/emailTemplates/inviteTemplate');

const Invite = mongoose.model('invites');

module.exports = app => {
    app.post('/api/invite', requireLogin, (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const invite = new Invite({
            title,
            subject,
            body,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        })

        //Great place to send an email
        const mailer = new Mailer(invite, inviteTemplate(invite));
        mailer.send();
    });
};