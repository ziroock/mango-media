const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Mailer = require('../services/Mailer');
const inviteTemplate = require('../services/emailTemplates/inviteTemplate');

const Invite = mongoose.model('invites');

module.exports = app => {

    app.get('/api/invite/mango', (req, res) => {
        res.send('Thanks for registering!');
    })


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
            console.log("There are " + invite.recipients.length + " recipients.");
            await invite.save();
            req.user.totalNumInvSent += invite.recipients.length;
            const user = await req.user.save();
            res.send(user);
        } catch (err) {
            res.status(422).send(err.message);
        }
    });
};