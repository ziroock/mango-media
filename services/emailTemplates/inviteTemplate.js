const keys = require('../../config/keys');

module.exports = invite => {
    return `
    <html>
        <body>
            <div style ="text-align: center;">
                <h3>Would you like to join Mongo Media?</h3>
                <p> Your friend ${invite.body} has sent you an invite!</p>
                <div>
                    <a href="${keys.mailRedirectDomain}/registerInvite/${invite.id}">Register</a>
                </div>
            </div>
        </body>
    </html>
    `;
};
