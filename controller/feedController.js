const db = require('./../models');

/**
 * news feed
 * @param {*} req
 * @param {*} res
 * @request
 */

exports.feed = async (req, res) => {
    try {

        const postTitle = await db.posts.findAll({});
        // const CommentTitle = await db.comments.findAll({});
        return res.json({
            status: 'success',
            data: {
                postid: postTitle,


            }
        })

    } catch (err) {
        console.error(err);
        return res.json({
            status: 'error',
            message: 'internal server error'
        })
    }
}