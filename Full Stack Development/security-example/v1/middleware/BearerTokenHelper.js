const token = {
  setToken: (req, res, next) => {
    const bearerHeader = req.headers['authorization']
    const bearer = bearerHeader?.split(' ')
    const bearerToken = bearer ? bearer[1] : null

    if (bearerToken) {
      req.token = bearerToken
      return next()
    } else {
      return next()
    }
  },
}

module.exports = token
