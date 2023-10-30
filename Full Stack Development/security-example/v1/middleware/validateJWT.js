const passportJWT = require('./passportConfig')

const authentication = {
  authenticate: (req, res, next) => {
    passportJWT.authenticate(`jwt`, { session: false }, (err, user, info) => {
      if (err) {
        return next(err)
      }

      if (!user) {
        return res.sendStatus(401)
      }
      req.user = user
      return next()
    })(req, res, next)
  },
}
module.exports = authentication
