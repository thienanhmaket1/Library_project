const express = require('express')
const multer = require('multer')
const path = require('path')

const router = express.Router()
const crypto = require('../../../../services/crypto')
const db = require('../../../../services/db')
const commonService = require('../../../../services/common')

router.post('/list', (req, res) => {
            const user_username = req.body.user_username || []
            const { showDeletedUser } = req.body
            const sql = `
        SELECT user_username, user_firstname, user_lastname, user_email, user_phone, user_permission_code, user_is_deleted
        FROM tbl_users
        WHERE ${user_username.length > 0 ? `user_username IN (${user_username.join(', ')})` : 'TRUE'}
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
        const {
            
            column_username,
            column_password,
            column_firstname,
            column_lastname,
            column_email,
            column_phone,
            column_permission_code,
        } = input
        const hashed = crypto.hash(column_password)
        const sql = `
            INSERT INTO tbl_users (user_id, user_username, user_firstname, user_lastname, user_email, user_phone, user_permission_code, user_salt, user_iteration, user_password, user_group, user_theme)
            VAlUES ('${commonService.uuidv4()}','${column_username}', '${column_firstname}', '${column_lastname}', '${column_email}', '${column_phone}', '${column_permission_code}',
            '${hashed.split('$')[0]}', ${hashed.split('$')[1]}, '${hashed}', '${column_group}', '${column_theme}')
            RETURNING *;
        `
        console.log(sql)
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

router.post('/delete-user', async (req, res) => {
    try {
        const { user_username } = req.body
        const arrCells = [user_username]
        const sql = `
            UPDATE tbl_users
            SET user_is_deleted = true
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
        const {
            column_username,
            column_firstname,
            column_lastname,
            column_email,
            column_phone,
            column_permission_code,
            column_is_deleted,
            column_group,
            column_theme,
        } = input
        let { column_password } = input
        if (column_password === null) column_password = ''
        const hashed = crypto.hash(column_password)
        const sql = `
            UPDATE tbl_users
            SET
            user_username = '${column_username}',
            user_firstname = '${column_firstname}',
            user_lastname = '${column_lastname}',
            user_email = '${column_email}',
            user_phone = '${column_phone}',
            user_permission_code = '${column_permission_code}',
            user_is_deleted = '${column_is_deleted}',
            user_group = '${column_group}',
            user_theme = '${column_theme}',
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

const diskStorage = multer.diskStorage({
    destination: async (req, file, cb) => {
        cb(null, 'public/images/avatars')
    },
    filename: (req, file, callback) => {
        const math = ['image/png', 'image/jpeg']
        if (math.indexOf(file.mimetype) === -1) {
            const errorMess = `The file <strong>${file.originalname}</strong> is invalid. Only allowed to upload image jpeg or png.`
            return callback(errorMess, null)
        }
        // const name = file.originalname.split(path.extname(file.originalname))[0]
        // const filename = `${name}_${Date.now()}${path.extname(file.originalname)}`
        const filename = file.originalname
        return callback(null, filename)
    },
})

const uploadImage = multer({ storage: diskStorage }).single('file')

router.post('/change-picture', (req, res) => {
    uploadImage(req, res, (error) => {
        if (error) {
            return res.status(500).json({ code: 1 })
            // .send(`Error when trying to upload: ${error}`)
        }
        return res.status(200).json({ code: 0 })
        // .send(req.file)
    })
})

router.post('/edit-profile', async (req, res) => {
    try {
        const { user_email, user_firstname, user_id, user_lastname, user_phone } = req.body
        let { user_password } = req.body
        if (user_password === null) user_password = ''
        const hashed = crypto.hash(user_password)
        const query = `
            UPDATE tbl_users
            SET user_email = $1,
                user_firstname = $2,
                user_lastname = $3,
                user_phone = $4
                ${
                    user_password.trim() !== ''
                        ? `
                , user_password = '${hashed}'`
                        : ``
                }
            WHERE user_id = $5
            RETURNING *;
        `
        const arrCells = [user_email, user_firstname, user_lastname, user_phone, user_id]
        const result = await db.postgre.runWithPrepare(query, arrCells).catch(() => {
            return null
        })
        if (result !== null) {
            const { rows } = result
            if (rows.length !== 0) {
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

module.exports = router