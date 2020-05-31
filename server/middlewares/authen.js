const jwt = require('jsonwebtoken')
const db = require('../services/db')

const environment = require('../environments/environment.dev')

const getUser = async (user_id) => {
    const user_query = `
        SELECT *
        FROM tbl_users
        WHERE user_id = '${user_id}'
    `

    const result = await db.postgre.run(user_query).catch(() => null)

    if (result) {
        const { rows } = result
        if (rows.length === 1) {
            return rows[0]
        }

        return null
    }

    return null
}

// const authenMiddleware = (req, res, next) => {
//     req.user = undefined
//     if (!req.headers || !req.headers.authorization) {
//         return res.status(401).json({
//             err: 'Unauthorized User!',
//             code: 7, 
//         })
//     }

//     const token = req.headers.authorization

//     return jwt.verify(token, environment.privateKey, async (err, decode) => {
//         if (err) {
//             return res.status(401).json({
//                 err,
//                 code: 6, 
//             })
//         }

//         const user = {
//             user_username: decode.user_username,
//             user_id: decode.user_id,
//             user_permission_code: '01',
//         }

//         // const getUserResult = await getUser(user.user_id)
//         // if (getUserResult) {
//         //     const { user_password, user_salt, user_iteration, ...newUser } = getUserResult
//         //     if (newUser) {
//         //         req.user = newUser
//         //         return next()
//         //     }
//         // }

//         return res.status(401).json({
//             err,
//             code: 6,
//         })
//     })
// }

const authenMiddleware = (req, res, next) => {
    req.user = undefined
    if (!req.headers || !req.headers.authorization) {
        return res.status(401).json({
            err: 'Unauthorized User!',
            code: 7,
        })
    }
}

module.exports = authenMiddleware
