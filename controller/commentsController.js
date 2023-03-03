const db = require("./../models");
/**
 * create comment methoud
 * @param {*} req
 * @param {*} res
 * @request
 */
exports.addComment = async function (req, res) {
    try {
        const newpost = await db.comments.create({
            user_id: req.user_id,
            post_id: req.body.post_id,
            caption: req.body.caption,
        });
        const postid = await db.posts.findOne({ where: { id: req.body.post_id } });
        const cleanpostid = JSON.parse(JSON.stringify(postid));
        const userid = await db.users.findOne({
            where: { id: cleanpostid.user_id },
        });
        const cleanuserid = JSON.parse(JSON.stringify(userid));
        const postusername = cleanuserid.firstname + " " + cleanuserid.lastname;
        //    const postusername = await db.users.findOne({ where: { id: postid.name } });
        return res.json({
            status: "success",
            message:
                req.name + " added comment to " + postusername + " post successfully",
            data: {
                post_id: req.body.post_id,
                username: req.name,
                comment: req.body.caption,
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
 * delete comment methoud
 * @param {*} req
 * @param {*} res
 * @request
 */
exports.deleteComment = async function (req, res) {
    try {
        const newpost = db.comments.destroy({ where: { user_id: req.params.id } }); //later we will add postid for delete specific comment from user
        return res.json({
            status: "success",
            message: "comment deleted !!",
        });
    } catch (err) {
        console.error(err);
        return res.json({
            status: "error",
            message: "internal server error",
        });
    }
};
