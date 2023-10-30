//
// Authentication using Passport node module
//
const passport = require(`passport`)
const LocalStrategy = require(`passport-local`).Strategy
const bcrypt = require(`bcryptjs`)
const UsersModel = require(`./controllers/models/UsersModel`)

const jwt = require(`jsonwebtoken`)
const config = require(`../server-settings.json`)

module.exports = function Auth() {
  const verifyUserPassword = (request, username, password, cb) => {
    UsersModel.findOne({ username }, async (err, user) => {
      if (err) {
        cb(err)
      } else if (!user) {
        return cb({
          success: false,
          message: `Username not found or password did not match`,
        })
      } else {
        // Check password using bcrypt
        // eslint-disable-next-line no-shadow
        bcrypt.compare(password, user.password, async (err, isMatch) => {
          if (err) {
            return cb({ message: err, success: false })
          }
          if (!isMatch) {
            return cb(null, {
              message: `Username not found or password did not match`,
              success: false,
            })
          }
        })

        const token = jwt.sign({ sub: user._id }, config.server.secret, {
          algorithm: 'HS512',
        })
        const data = {
          success: true,
          token: token,
        }

        cb(null, data)
      }
    })
  }

  // Basic strategy for users
  passport.use(
    `user-basic`,
    new LocalStrategy(
      {
        usernameField: `username`,
        passwordField: `password`,
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        verifyUserPassword(req, username, password, (err, data) => {
          if (err) {
            return done(err, false)
          }
          // Password did not match
          if (!data) {
            return done(null, false)
          }
          return done(null, data)
        })
      }
    )
  )

  // Export the function to authenticate resource requests
  // store this in a session cookie
  this.isUserAuthenticated = async function (req, res, next) {
    return passport.authenticate(`user-basic`, { session: false })(
      req,
      res,
      next
    )
  }

  // Returns the scope as a constructed auth object
  return this
}
