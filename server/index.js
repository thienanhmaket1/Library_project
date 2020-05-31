const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const path = require('path')
const environment = require('./environments/index')
const apiRouter = require('./router/api/index')
const middleWares = require('./middlewares/index')

app.set('env', 'development')

// app.set('env', 'production')

app.set('trust proxy', true)

app.use(express.static(path.join(__dirname, '/public')))

app.use(cors())

app.use(bodyParser.json())

app.use(middleWares.logMiddleWare)

app.use(middleWares.timeMiddleWare)

app.use('/api', apiRouter)

app.use(middleWares.errorMiddleWare)

const server = app.listen(environment.serverPort, '0.0.0.0', () => {
    console.log('Server is listening !')
})

module.exports = server
