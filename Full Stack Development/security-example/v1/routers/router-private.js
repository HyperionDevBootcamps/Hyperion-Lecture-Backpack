const router = require(`express`).Router()

// USERS RESOURCE
const auth = require('../auth')
const users = require(`../controllers/Users`)

const authentication = require('../middleware/validateJWT')

const tokenMW = require('../middleware/BearerTokenHelper')

module.exports = function RouterPrivate(database, settings) {
  const _auth = auth()
  router.use(tokenMW.setToken)
  router.use(authentication.authenticate)

  router.route(`/users`).get(users.GetUsersList)

  return router
}
