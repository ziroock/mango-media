// the next middleware is like done in passport it indicates that the middleware is complete
// it is called next because it indicates that it will pass on to hte next middleware
// we don't call next if the current middleware is not executing as needed, otherwise call next
module.exports = (req, res, next) => {
    if(!req.user) {
        //401 unauthorized aka forbidden
        return res.status(401).send({ error: 'You must log in!' })
    }

    next();
};