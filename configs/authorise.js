module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if(req.user && req.user.isVerified) {
            return next();
        }
        res.status(401).json({success: false, msg: 'Must be logged in to proceed'});
    },
    forwardAuthentication: (req, res, next) => {
        if(!req.isAuthenticated()) {
            return next();
        }
        res.status(200).json({success: false, msg: 'Successfully Logged In'}); 
    },
    ensureAuthorisation: (req, res, next) => {
        if(req.user.typeOfUser === req.query.actionUserType) {
            return next();
        }
        res.status(401).json({success: false, msg: 'This action is reserved for other users.'});
    }
}