const express = require('express')

const apiRouter = express.Router()
const authenRouter = require('./authen/index')


const middleWares = require('../../middlewares')

apiRouter.use('/authen', authenRouter)

apiRouter.post('/*', middleWares.authenMiddleWare)


module.exports = apiRouter
