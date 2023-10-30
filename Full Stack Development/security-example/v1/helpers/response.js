exports.success = function(req, res, data, msg) {
    res.send({
        status: true,
        message: msg,
        data: data
    })
}

exports.failure = function(req, res, data, msg) {
    res.send({
        status: false,
        message: msg,
        data: data
    })
}