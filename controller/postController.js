const db = require('./../models');
let jwt = require("jsonwebtoken");

function getToken(str) {
    const token = jwt.sign(JSON.stringify(str), process.env.ACCESS_KEY_TOKEN);
    return token;
}

function verifyToken(str) {
    const token = jwt.verify(str, process.env.ACCESS_KEY_TOKEN);
    return token;
}

/**
 * create a new post
 *  @param {*} req
 *  @param {*} res
 *  @request
 */

exports.createPost = async function (req, res) {
    try {
        const token = verifyToken((req.headers.authorization.split(' ')[1]).toString());

        const newpost = db.posts.create({
            title: req.body.title,
            user_id: token.id
        })

        return res.json({
            status: 'success',
            message: 'post created successfully'
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
 * delete post methoud
 * @param {*} req
 * @param {*} res
 * @request
 */
exports.deletePost = async function (req, res) {
    try {
        const token = verifyToken((req.headers.authorization.split(' ')[1]).toString());

        const newpost = db.posts.destroy({ where: { userid: token.id } })

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