const db = require('./../models');

/**
 * @param {*} req
 * @param {*} res
 * @return
 */

exports.mediaupload = async function (req, res) {
    try {
        const mediaupload = await db.media.create({
            user_id: req.user_id,
            post_id: req.params.id,
            media: '/src/uploads/' + req.file.filename
        })

        return res.json({
            status: 'success',
            message: 'file upload successful to the post',
            urmedia: mediaupload
        })
    } catch (err) {
        console.error(err);
        return res.json({
            status: "error",
            message: "internal server error",
        });
    }
};


/**
 * delete post methoud
 * @param {*} req
 * @param {*} res
 * @request
 */
exports.mediaDelete = async function (req, res) {
    try {
        // we will  later set condition for user can only delete commment done by that user not any external user
        const newpost = db.media.destroy({ where: { id: req.params.id } });
        return res.json({
            status: "success",
            message: " media deleted successfully !!",
        });
    } catch (err) {
        console.error(err);
        return res.json({
            status: "error",
            message: "internal server error",
        });
    }
};
