const authenMiddleWare = require('./authen')
const errorMiddleWare = require('./error')
const timeMiddleWare = require('./time')
const logMiddleWare = require('./log')

module.exports = {
    authenMiddleWare,
    errorMiddleWare,
    timeMiddleWare,
    logMiddleWare,
}
