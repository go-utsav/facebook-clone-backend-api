const db = require("./../models");

/**
 * create a new post
 *  @param {*} req
 *  @param {*} res
 *  @request
 */
exports.createPost = async function (req, res) {
  try {
    const newpost = await db.posts.create({
      title: req.body.title,
      user_id: req.user_id,
    });
    return res.json({
      status: "success",
      message: req.name + " created a post successfully !!",
      data: {
        post: newpost,
      },
    });
  } catch (err) {
    console.error(err);
    return res.json({
      status: "error",
      message: err,
    });
  }
};

/**
 * delete post methoud
 * @param {*} req
 * @param {*} res
 * @request
 */
exports.deletePost = async function (req, res) {
  try {
    // we will  later set condition for user can only delete commment done by that user not any external user
    const newpost = db.posts.destroy({ where: { user_id: req.params.id } });
    return res.json({
      status: "success",
      message: req.name + " deleted a post successfully !!",
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
 *  get all post with commets
 *  @param {*} req
 *  @param {*} res
 *  @request
 */

exports.getallpostwithuser = async function (req, res) {
  try {
    const newpost = await db.posts.findAll({
      include: [
        {
          model: db.comments,
          as: "postcomment",
        }
      ]
    });
    return res.json({
      status: "success",
      message: "get all post",
      data: {
        post: newpost,
      },
    });
  } catch (err) {
    console.error(err);
    return res.json({
      status: "error",
      message: err,
    });
  }
};
