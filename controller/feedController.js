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
        const postarray = JSON.stringify(postTitle);
        const cleandata = JSON.parse(postarray);
        // const cleandata = JSON.parse(JSON.stringify(postTitle));
        // // console.log(postTitle.toString());

        // const cleanComment = JSON.parse(JSON.stringify(CommentTitle));
        for (let i = 0; i < postarray.length; i++) {

            //username
            const username = await db.users.findOne({ id: cleandata[i].user_id });
            const cleanUserdata = JSON.parse(JSON.stringify(username));
            const name = cleanUserdata.firstname + " " + cleanUserdata.lastname;

            //comment 
            const rawcomment = await db.comments.findAll({ where: { post_id: cleandata[i].id } })
            const cleancommentdata = JSON.parse(JSON.stringify(rawcomment));
            console.log(cleancommentdata);

            //comment username
            const Cusername = await db.users.findOne({ id: cleancommentdata.user_id });
            const CcleanUserdata = JSON.parse(JSON.stringify(Cusername));
            const Cname = CcleanUserdata.firstname + " " + CcleanUserdata.lastname;

            return res.json({
                data: {
                    // data: cleandata[0].id,
                    "User name": name,
                    "post title": cleandata[i].title,
                    "comment": {
                        "username": Cname,
                        "text": cleancommentdata[i].caption
                    }   
                    // "comments": cleanComment[i].caption
                }
            });
        }

    } catch (err) {
        console.error(err);
        return res.json({
            status: 'error',
            message: 'internal server error'
        })
    }
}