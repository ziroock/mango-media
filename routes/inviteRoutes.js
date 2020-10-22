const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Mailer = require('../services/Mailer');
const inviteTemplate = require('../services/emailTemplates/inviteTemplate');

const Invite = mongoose.model('invites');

module.exports = app => {

    app.get('/api/invite/:inviteId', (req, res) => {
        res.send('Thanks for registering!');
    })


    app.post('/api/invite/webhooks', (req, res) => {
        const events = _.map(req.body, ({email, url}) => {
            console.log("URL: " + new URL(url).pathname);
            console.log("PATHNAME: " + url)
            const pathname = new URL(url).pathname;
            const p = new Path('/api/invite/:inviteId');
            const match = p.test(pathname);

            if (match) {
                return { email: email, surveyId: match.surveyId };
            }
        });
        console.log(events);
        res.send({});
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