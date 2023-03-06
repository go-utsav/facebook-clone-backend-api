const db = require('./../models');

/**
 *  user like a post
 *  @param {*} req
 *  @param {*} res
 *  @request
 */
exports.likepost = async function (req, res) {
    try {
        const likepost = await db.likes.create({
            user_id: req.user_id,
            post_id: req.params.id
        });
        return res.json({
            status: "success",
            message: "user liked the post",
            data: {
                post: likepost
            },
        });
    } catch (err) {
        console.error(err);
        return res.json({
            status: "error",
            message: "internal server error",
        });
    }
};

/**
 * create a new post
 *  @param {*} req
 *  @param {*} res
 *  @request
 */
exports.unlikepost = async function (req, res) {
    try {
        const unlike = await db.likes.destroy({
            where: {
                post_id: req.params.id
            }
        });
        return res.json({
            status: "success",
            message: "user unlike the post",
        });
    } catch (err) {
        console.error(err);
        return res.json({
            status: "error",
            message: "internal server error",
        });
    }
};

