const express = require('express')
const multer = require('multer')
const path = require('path')

const router = express.Router()
const crypto = require('../../../../services/crypto')
const db = require('../../../../services/db')


router.post('/list', (req, res) => {
    const user_username = req.body.user_username || []
    const sql = `
        SELECT user_id, user_username, user_fullname, user_email, user_phone, user_permission_code
        FROM tbl_users
        WHERE ${user_username.length > 0 ? `user_username IN (${user_username.join(', ')})` : 'TRUE'}
        ORDER BY user_salt DESC
    `
    return db.postgre
        .run(sql)
        .then((result) => {
            return res.status(200).json({
                code: 0,
                data: result.rowCount > 0 ? result.rows : [],
            })
        })
        .catch((error) => {
            return res.status(500).json({
                code: 1,
                data: [],
                error,
            })
        })
})


router.post('/create-user', async (req, res) => {
    try {
        const { input } = req.body
        const { column_id, column_username, column_password, column_fullname, column_email, column_phone, column_permission_code} = input
        const hashed = crypto.hash(column_password)
        const sql = `
            INSERT INTO tbl_users (user_id, user_username, user_fullname, user_email, user_phone, user_permission_code, user_salt, user_iteration, user_password)
            VAlUES ('${column_id}', '${column_username}', '${column_fullname}', '${column_email}', '${column_phone}', '${column_permission_code}',
            '${hashed.split('$')[0]}', ${hashed.split('$')[1]}, '${hashed}')
            RETURNING *;
        `
        const result = await db.postgre.run(sql).catch((error) => {
            return error
        })
        if (result.rows) {
            const { rows } = result
            return res.status(201).json({
                code: 0,
                data: rows[0],
            })
        }
        if (result.constraint === 'unique_user_username') {
            return res.status(200).json({
                code: 5,
                data: {},
            })
        }
        if (result.constraint === 'unique_user_email') {
            return res.status(200).json({
                code: 6,
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

router.post('/delete-user', async (req, res) => {
    try {
        const { user_username, status } = req.body
        const arrCells = [user_username, !status]
        const sql = `
            UPDATE tbl_users
            SET user_is_deleted = $2
            WHERE user_username = $1
        `
        const result = await db.postgre.runWithPrepare(sql, arrCells).catch(() => {
            return null
        })

        if (result) {
            const { rowCount } = result

            if (rowCount !== 0) {
                return res.status(200).json({
                    code: 0,
                })
            }
        }
        return res.status(500).json({
            code: 1,
        })
    } catch (error) {
        return res.status(500).json({
            code: 2,
        })
    }
})

router.post('/edit-user', async (req, res) => {
    try {
        const { input } = req.body
        const { column_id, column_username, column_fullname, column_email, column_phone, column_permission_code } = input
        let { column_password } = input
        if (column_password === null) column_password = ''
        const hashed = crypto.hash(column_password)
        const sql = `
            UPDATE tbl_users
            SET
            user_id = '${column_id}',
            user_username = '${column_username}',
            user_fullname = '${column_fullname}',
            user_email = '${column_email}',
            user_phone = '${column_phone}',
            user_permission_code = '${column_permission_code}',
            user_salt = '${hashed.split('$')[0]}',
            user_iteration = ${hashed.split('$')[1]}
            ${
                column_password.trim() !== ''
                    ? `
            , user_password = '${hashed}'`
                    : ``
            }
            WHERE user_username = '${column_username}'
            RETURNING *;
        `
        const result = await db.postgre.run(sql).catch((err) => {
            return err
        })
        if (result.rows) {
            const { rows } = result
            if (rows.length !== 0) {
                return res.status(200).json({
                    code: 0,
                    data: rows[0],
                })
            }
        }

        return res.status(500).json({
            code: 1,
        })
    } catch (error) {
        return res.status(500).json({
            code: 2,
        })
    }
})

module.exports = router
