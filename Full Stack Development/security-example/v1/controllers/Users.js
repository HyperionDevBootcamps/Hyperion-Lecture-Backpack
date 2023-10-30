// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-throw-literal */
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-shadow */
//
// Users uses routes use to POST and GET resources from the Mongo DB
//

const UsersModel = require(`./models/UsersModel`)
const jwt = require(`jsonwebtoken`)
const config = require(`../../server-settings.json`)
const bcrypt = require(`bcryptjs`)
const controller = {}

const validateUserName = async function (name) {
  let result = false
  // eslint-disable-next-line id-length
  const p = UsersModel.findOne({ username: name }).exec()

  await p.then((user) => {
    if (user === null) {
      result = true
    }
  })

  return result
}

// POST API_IP/VERSION/users/
// Create a NEW User
// AddUser
controller.AddUser = async function (req, res) {
  try {
    const user = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    }

    if ((await validateUserName(user.username)) === false) {
      return res.status(500).json({ error: `That username already exists` })
    }

    // Execute a query
    const model = new UsersModel(user)
    await model.save()

    return res
      .status(200)
      .json({ success: true, data: model, message: 'Success!' })
  } catch (ex) {
    return res.status(502).json({ success: false, message: ex.message })
  }
}

controller.authenticateUser = async function (req, res) {
  try {
    let user = await UsersModel.findOne({ username: req.body.username })
    let isMatch = await bcrypt.compare(req.body.password, user.password)

    if (!isMatch) {
      throw 'Username not found or password did not match'
    }

    const token = jwt.sign({ sub: user._id }, config.server.secret, {
      algorithm: 'HS512',
    })

    return res.status(200).json({
      success: true,
      message: 'Login success!',
      token: token,
    })
  } catch (err) {
    return res.status(502).json({ success: false, message: err.message })
  }
}

// GET API_IP/VERSION/users/
// Get ALL Users
// GetUsersList
controller.GetUsersList = function (req, res) {
  UsersModel.find({}, (err, users) => {
    if (err) {
      res.status(500).json(err)
    } else {
      res.json(users)
    }
  })
}

module.exports = controller
