const router = require(`express`).Router()

// Require the auth module
const _auth = require(`../auth`)

// USERS RESOURCE
const users = require(`../controllers/Users`)

module.exports = function RouterPublic(database, settings) {
  const db = database
  const auth = _auth()

  router.get(`/login`, users.authenticateUser)

  router.route(`/users`).post(users.AddUser)

  return router
}
