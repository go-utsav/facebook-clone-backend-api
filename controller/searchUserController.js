const db = require('./../models');

/**
 * search user 
 * @param {*} req
 * @param {*} res
 * @request
 */

exports.searchUser = async function (req, res) {
    try {

        //
        const user = await db.users.findAll({
            where: {

                firstname: req.body.search, lastname: req.body.search
            }
        });
        if (!user) {
            return res.json({
                status: 'success',
                data: "no user found"
            })
        } else {
            return res.json({
                status: 'success',
                data: user
            })
        }

    } catch (e) {
        console.error(e);
        return res.json({
            status: 'error',
            message: 'internal server error'
        });
    }
}