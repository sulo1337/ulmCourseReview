const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided');

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
        //!access by using req.student._id
        req.student = decoded;
        next();
    } catch (e) {
        return res.status(400).send('Invalid token');
    }
}
