export const ensureAuthentication = (req, res, next) => {
    if (req.session.authenticated) {
        return next();
    } else {
        res.status(403).json({ msg: '403 Forbidden: unauthorized request.'})
    }
}