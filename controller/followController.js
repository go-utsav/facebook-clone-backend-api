const db = require("./../models");
async function getdata(myid) {
    const rawdata = await db.users.findOne({ where: { id: myid } });
    const clendata = JSON.parse(JSON.stringify(rawdata));
    return clendata.firstname + " " + clendata.lastname;
}
/**
 * follow user
 * @param {*} req
 * @param {*} res
 * @request
 */
exports.followUser = async function (req, res) {
    try {
        const targertuser = await getdata(req.params.id);

        const finduser = await db.followers.findOne({
            where: {
                userid: req.user_id,
                targetuserid: req.params.id,
            }
        });

        if (finduser) {
            return res.json({
                status: "success",
                message: req.name + " is allready following the user " + targertuser,
            });
        } else {
            const user = await db.followers.create({
                userid: req.user_id,
                targetuserid: req.params.id,
            });

            return res.json({
                status: "success",
                message: req.name + " started following " + targertuser,
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

/**
 * follow user
 * @param {*} req
 * @param {*} res
 * @request
 */
exports.unfollowUser = async function (req, res) {
    try {
        const targertuser = await getdata(req.params.id);
        const user = await db.followers.destroy({
            where: {
                userid: req.user_id,
                targetuserid: req.params.id,
            },
        });

        return res.json({
            status: "success",
            message: req.name + " has unfollowed " + targertuser,
        });
    } catch (e) {
        console.error(e);
        return res.json({
            status: "error",
            message: "internal server error",
        });
    }
};
