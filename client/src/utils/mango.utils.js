let isAuth = (reqUserId, urlUserId) => {
    if(reqUserId && urlUserId) {
        return reqUserId === urlUserId;
    }
    return false;
}

module.exports = { isAuth }



