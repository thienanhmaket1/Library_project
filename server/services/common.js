const dateFormatYYYYMMDDHHMMSS = () => {
    const now = new Date()
    function pad2(n) {
        // always returns a string
        return (n < 10 ? '0' : '') + n
    }

    return now.getFullYear() + pad2(now.getMonth() + 1) + pad2(now.getDate()) + pad2(now.getHours()) + pad2(now.getMinutes()) + pad2(now.getSeconds())
}

module.exports = { dateFormatYYYYMMDDHHMMSS }
