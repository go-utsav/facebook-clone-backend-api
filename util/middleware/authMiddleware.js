// const db = require('./../../models');
const jwt = require('jsonwebtoken');
// todo if no token pASSED HOULD RETURN UNAAUTHORIZED  MESSAGE
const auth = ((req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        const verifyToken = jwt.verify(token.toString(), process.env.ACCESS_KEY_TOKEN);

        if (verifyToken) {
            req.user_id = verifyToken.id;
            req.name = verifyToken.firstname + ' ' + verifyToken.lastname;
            next();
        } else {
            return res.json({
                status: 'error',
                message: 'Unauthorized access'
            })
        }
    } catch (err) {
        console.error(err);
        return res.json({
            status: 'error',
            message: 'internal server error '
        })
    }
});

module.exports = auth;