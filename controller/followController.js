const db = require('./../models');
const jwt = require('jsonwebtoken');

function verifyToken(str) {
    const token = jwt.verify(str, process.env.ACCESS_KEY_TOKEN);
    return token;
}
/**
 * follow user 
 * @param {*} req
 * @param {*} res
 * @request
 */

exports.followUser = async function (req, res) {
    try {
        const token = verifyToken(req.headers.authorization.split(' ')[1]);
        console.log(token);
        const user = await db.followers.create({
            userid: token.id,
            targetuserid: req.body.targetuserid
        });

        return res.json({
            status: 'success',
            message: 'following... '
        });

    } catch (e) {
        console.error(e);
        return res.json({
            status: 'error',
            message: 'internal server error'
        });
    }
}

/**
 * follow user 
 * @param {*} req
 * @param {*} res
 * @request
 */

exports.unfollowUser = async function (req, res) {
    try {
        const token = verifyToken(req.headers.authorization.split(' ')[1]);
        console.log(token);
        const user = await db.followers.destroy({
            where: {
                userid: token.id,
                targetuserid: req.body.targetuserid
            }
        });

        return res.json({
            status: 'success',
            message: 'unfollowed... '
        });

    } catch (e) {
        console.error(e);
        return res.json({
            status: 'error',
            message: 'internal server error'
        });
    }
}
