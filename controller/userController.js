const db = require('./../models');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

/**
 * user signUp method
 * @param {*} req
 * @param {*} res
 * @return
 */

exports.signUp = async function (req, res) {
    try {

        const createuser = await db.users.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: md5(req.body.password),
            mobileno: req.body.mobileno,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        const token = jwt.sign(JSON.stringify(createuser), process.env.ACCESS_KEY_TOKEN);

        return res.json({
            status: 'success',
            message: 'user registed successfully',
            data: {
                user: createuser,
                token: token,
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

/**
 * signIn mmethoud
 * @param {*} req
 * @param {*} res 
 * @return
 */

exports.signIn = async function (req, res, next) {
    try {
        const userlogin = await db.users.findOne({ where: { email: req.body.email, password: md5(req.body.password) } })

        if (!userlogin) {
            return res.json({
                status: 'error',
                message: 'Username or password is incorrect'
            })
        } else {
            const token = jwt.sign(JSON.stringify(userlogin), process.env.ACCESS_KEY_TOKEN);
            return res.json({
                status: 'success',
                message: 'user loggedin successfully',
                data: {
                    token: token
                }
            })
        }
    } catch (err) {
        console.error(err);
        return res.json({
            status: 'error',
            message: 'internal server error'
        })
    }
}