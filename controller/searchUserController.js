const db = require("./../models");
const { Op } = require("sequelize");

/**
 * search user
 * @param {*} req
 * @param {*} res
 * @request
 */

exports.searchUser = async function (req, res) {
    try {
        // or query to find username if first name and last name are swapped
        // const user = await db.users.findAll({
        //     where: {
        //         [Op.or]: [
        //             { firstname: req.body.firstname, lastname: req.body.lastname },
        //             { firstname: req.body.lastname, lastname: req.body.firstname }
        //         ]
        //     },
        // });

        // like query to find username
        const username = await db.users.findAll({
            where: {
                [Op.or]: [
                    {
                        firstname: { [Op.like]: `%` + req.body.firstname + `%` },
                        lastname: { [Op.like]: `%` + req.body.lastname + `%` }
                    }
                ]
            }
        });



        if (!username) {
            return res.json({
                status: "success",
                data: "no user found",
            });
        } else {

            return res.json({
                status: "success",
                data: username,
            });
        }
    } catch (e) {
        console.error(e);
        return res.json({
            status: "error",
            message: "internal server error",
        });
    }
};
