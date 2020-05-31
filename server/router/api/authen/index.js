const express = require('express')
const jwt = require('jsonwebtoken')
const db = require('../../../services/db')
const crypto = require('../../../services/crypto')
const environment = require('../../../environments')
const authenMiddleWare = require('../../../middlewares/authen')

const authenRouter = express.Router()


authenRouter.post('/login', async(req, res) => {
    try {
        const user_username = req.body.user_username
        const query = `
            SELECT *
            FROM tbl_users
            WHERE user_username = '${user_username}'
            AND user_is_deleted = false;
        `
        console.log(query)
        const result = await db.postgre.run(query).catch((error) => {
            return null
        })
        if (result) {
            const { rows } = result
            console.log(rows.length)
            if (rows.length === 1) {
                return res.status(200).json({
                    code: 0,
                    data: {
                        user: rows[0] || {},
                    },
                })
            }

            return res.status(200).json({
                code: 1,
                data: {
                    user: rows[0] || {},
                },
            })

        }
        return res.status(401).json({
            code: 1,
        })
    } catch (error) {
        return res.status(500).json({
            code: 1,
        })
    }
})

authenRouter.post('/verify-token', authenMiddleWare, async(req, res) => {
    return res.status(200).json({
            code: 0,
            data: {
                user: req.user,
            },
        })
})

// authenRouter.post('/register', async(req, res) => {
//     try {
//         // console.log(req.body)
//         const {
//             user_id,
//             user_username,
//             user_password,
//             user_fullname,
//             user_email,
//             user_phone,
//             user_permission_code,
//         } = req.body
//         const sql = `
//             INSERT INTO tbl_users (user_id, user_username, user_fullname, user_email, user_phone, user_permission_code, user_password)
//             VAlUES ('${user_id}','${user_username}', '${user_fullname}', '${user_email}', '${user_phone}', '${user_permission_code}', '${user_password}')
//             RETURNING *;
//         `
//         console.log(sql)
//         const result = await db.postgre.runWithPrepare(sql).catch((error) => {
//             return error
//         })
//         if (result.rows) {
//             const { rows } = result
//             return res.status(201).json({
//                 code: 0,
//                 data: rows[0],
//             })
//         }
//         if (result.constraint === 'unique_user_username') {
//             return res.status(500).json({
//                 code: 5,
//                 data: {},
//             })
//         }
//         return res.status(500).json({
//             code: 2,
//             data: {},
//         })
//     } catch (error) {
//         return res.status(500).json({
//             code: 1,
//             data: {},
//         })
//     }
// })


authenRouter.post('/register', async(req, res) => {
    try {
        console.log(req.body)
        const {
            user_id,
            user_username,
            user_password,
            user_fullname,
            user_email,
            user_phone,
            user_permission_code
        } = req.body
        // const arrCells = [
        //     user_id,
        //     user_username,
        //     user_password,
        //     user_fullname,
        //     user_email,
        //     user_phone,
        //     user_permission_code,
        // ]
        const sql = `
            INSERT INTO tbl_users (user_id, user_username, user_password, user_fullname, user_email, user_phone, user_permission_code)
            VAlUES ('${user_id}','${user_username}', '${user_fullname}', '${user_email}', '${user_phone}', '${user_permission_code}', '${user_password}')
            RETURNING *;
        `//VAlUES ($1, $2, $3, $4, $5, $6, $7)
        console.log(sql)
        const result = await db.postgre.runWithPrepare(sql).catch((error) => {
            return error
        })
        if (result.rows) {
            const { rows } = result
            console.log(rows)
            console.log(hihi)
            return res.status(201).json({
                code: 0,
                data: rows[0],
            })
        }
        if (result.constraint === 'unique_user_username') {
            return res.status(500).json({
                code: 5,
                data: {},
            })
        }
        return res.status(500).json({
            code: 2,
            data: {},
        })
    } catch (error) {
        return res.status(500).json({
            code: 1,
            data: {},
        })
    }
})

module.exports = authenRouter