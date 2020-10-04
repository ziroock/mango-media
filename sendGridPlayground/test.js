//2. key oragnemango
// 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

// 3.
// echo "export SENDGRID_API_KEY='SG.vBA3E1NsRcCr-wS9uzkINA.dhZqLn6PDhnLZfp7z98rFyFUR-/bHzf0gIAkCCTXUxfY'" > sendgrid.env
// echo "sendgrid.env" >> .gitignore
// source ./sendgrid.env
// 4.
// npm install --save @sendgrid/mail


// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');
const msg = {
  to: 'zapbuba.tech@gmail.com',
  from: 'zapbuba.tech@gmail.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })