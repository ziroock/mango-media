let isPersonal = (reqUserId, urlUserId) => {
    if(reqUserId && urlUserId) {
        return reqUserId.toString() === urlUserId.toString();
    }
    return false;
}

module.exports = { isPersonal }



