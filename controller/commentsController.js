const db = require('./../models');
const jwt = require('jsonwebtoken');

function getToken(str) {
    const token = jwt.sign(JSON.stringify(str), process.env.ACCESS_KEY_TOKEN);
    return token;
}

function verifyToken(str) {
    const token = jwt.verify(str, process.env.ACCESS_KEY_TOKEN);
    return token;
}

/**
 * create comment methoud
 * @param {*} req
 * @param {*} res
 * @request
 */

exports.addComment = async function (req, res) {
    try {
        const token = verifyToken((req.headers.authorization.split(' ')[1]).toString());

        const newpost = db.comments.create({
            user_id: token.id,
            post_id: req.body.post_id,
            caption: req.body.caption,
        })
        return res.json({
            status: 'success',
            message: 'comment added successfully'
        })
    } catch (err) {
        console.error(err);
        return res.json({
            status: 'error',
            message: 'internal server error'
        })
    }
}

/**
 * delete comment methoud
 * @param {*} req
 * @param {*} res
 * @request
 */
exports.deleteComment = async function (req, res) {
    try {
        const token = verifyToken((req.headers.authorization.split(' ')[1]).toString());

        const newpost = db.comments.destroy({ where: { userid: token.id } })

        return res.json({
            status: 'success',
            message: 'comment deleted !!'
        })
    } catch (err) {
        console.error(err);
        return res.json({
            status: 'error',
            message: 'internal server error'
        })
    }
}