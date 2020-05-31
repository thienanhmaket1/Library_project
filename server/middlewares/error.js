const errorMiddleWare = (err, req, res, next) => {
    console.log(err.stack)
    return res.status(500).send('Something broke !')
}

module.exports = errorMiddleWare
