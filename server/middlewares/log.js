const fs = require('fs')


const logMiddleWare = (req, res, next) => {
    const date = new Date().toLocaleString()
    const apiName = req.url
    const ip = req.headers.origin || req.ip

    next()
}

module.exports = logMiddleWare
