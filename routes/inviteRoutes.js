const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Mailer = require('../services/Mailer');
const inviteTemplate = require('../services/emailTemplates/inviteTemplate');

const Invite = mongoose.model('invites');
const User = mongoose.model('users');

module.exports = app => {
    app.post('/api/invite/webhooks', (req, res) => {
        const p = new Path('/registerInvite/:inviteId');
        // console.log("parseObject: ", p);
        // console.log(req.body);

        const events = _.chain(req.body)
            .map(({ email, url }) => {
                //if the url exists, b/c it is not always present
                if (url) {
                    const match = p.test(new URL(url).pathname);
                    if (match) {
                        return { email: email, inviteId: match.inviteId };
                    }
                } else {
                    console.log('THE URL IS NOT PRESENT IN WEBHOOK DATA!');
                }
            })
            .compact()
            .uniqBy('email', 'inviteId')
            .forEach(async ({ email, inviteId }) => {
                const inviteUpdated = await Invite.findOneAndUpdate(
                    {
                        _id: inviteId,
                        recipients: {
                            $elemMatch: { email: email, opened: false },
                        },
                    },
                    //Update the invite after it was found. IT is done in mongoDB so
                    //   express doesn't need to deal with it.
                    {
                        $set: { 'recipients.$.opened': true },
                    }
                ).exec();
                // console.log('BATEEEE: ', inviteUpdated);
                //update clickedInv
                if (inviteUpdated) {
                    await User.updateOne(
                        {
                            _id: inviteUpdated._user,
                        },
                        {
                            $inc: { totalNumInvClicked: 1 },
                        }
                    ).exec();
                }
            })
            .value(); //return value aka array

        // console.log('SENDGRID WEBHOOK EVENTS: ', events);
        res.send({});
    });

    app.post('/api/invite', requireLogin, async (req, res) => {
        const { recipients } = req.body;

        const invite = new Invite({
            subject: 'You have been invited to join Mongo Media!',
            body: req.user.name,
            recipients: recipients.split(',').map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now(),
        });

        //Great place to send an email
        const mailer = new Mailer(invite, inviteTemplate(invite));
        try {
            await mailer.send();
            // console.log('There are ' + invite.recipients.length + ' recipients.');
            await invite.save();
            req.user.totalNumInvSent += invite.recipients.length;
            const user = await req.user.save();
            res.send(user);
        } catch (err) {
            res.status(422).send(err.message);
        }
    });
};
