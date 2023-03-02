// const db = require('./../../models');
const jwt = require('jsonwebtoken');

const auth = ((req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const verify = jwt.verify(token.toString(), process.env.ACCESS_KEY_TOKEN);
        if (verify) {
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