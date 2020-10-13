const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// TODO: Try to detect and validate based on other delimiters, like ';' ':' '|' '.' etc...
// https://stackoverflow.com/questions/19053827/csv-separator-auto-detection-in-javascript
export default (emailsString) => {
    // In case of trailing comma
    // 1. trim trailing if white space
    emailsString = emailsString.trim();
    const stringLength = emailsString.length;
    // 2. remove the trailing ','
    if (emailsString[stringLength - 1] === ',') {
        emailsString = emailsString.substr(0, stringLength - 2);
    }

    const invalidEmails = emailsString
        .split(',')
        .map(email => email.trim())
        .filter(email => re.test(email) === false);

    if (invalidEmails.length > 0) {
        return `These emails are invalid: ${invalidEmails}!`;
    }

    return null;
}