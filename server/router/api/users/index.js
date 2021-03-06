const express = require('express')
const multer = require('multer')

const usersRouter = express.Router()
const manageUsersRouter = require('./manage-users')
const crypto = require('../../../services/crypto')
const db = require('../../../services/db')

usersRouter.use('/manage-users', manageUsersRouter)



module.exports = usersRouter
