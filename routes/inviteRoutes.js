const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Mailer = require('../services/Mailer');
const inviteTemplate = require('../services/emailTemplates/inviteTemplate');

const Invite = mongoose.model('invites');

module.exports = app => {
    app.post('/api/invite', requireLogin, async (req, res) => {
        const { recipients } = req.body;

        const invite = new Invite({
            subject: "You have been invited to join Mongo Media!",
            body: req.user.name,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now()
        })

        //Great place to send an email
        const mailer = new Mailer(invite, inviteTemplate(invite));
        try {
            await mailer.send();
            //await invite.save();
            // req.user.invites sent += recipients ( need to figure out how to get # recipients )
            // const user = await req.user.save();
            //res.send(user);
        } catch (err) {
            res.status(422).send(err.message);
        }

    });
};