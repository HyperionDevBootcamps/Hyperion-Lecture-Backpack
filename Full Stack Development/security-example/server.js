// Require the logger module
const logger = require(`morgan`)

// Require the express module
const express = require(`express`)

// Requires express-sessions
const session = require(`express-session`)

// Require the cookie parser module
const cookieParser = require(`cookie-parser`)

// Mongoose database & ORM
const mongoose = require(`mongoose`)

mongoose.Promise = Promise

// Connect middleware for mongoose-passport sessions
const MongoStore = require(`connect-mongo`)(session)

// Require the passport module for authentication
const passport = require(`passport`)

// Require the body-parser module
const bodyParser = require(`body-parser`)

// Require tunnel-ssh
const tunnel = require(`tunnel-ssh`)

// Read in the settings json that configures our server
const settings = require('./server-settings.json')

// Create the express application
const app = express()

// Use environment defined port or 3000
const port = process.env.PORT || settings.server.port || 3000

require(`dotenv`).config()

process.env.NODE_ENV !== `development` && (console.log = () => null)
// Http OPTIONS verb hack
app.use((req, res, next) => {
  if (req._parsedUrl.pathname.includes(`users`)) {
    // Console.log(req)
  }

  res.setHeader(`Access-Control-Allow-Origin`, '*')
  res.setHeader(
    `Access-Control-Allow-Methods`,
    `GET, POST, OPTIONS, PUT, PATCH, DELETE, OPTIONS`
  )
  res.setHeader(`Access-Control-Expose-Headers`, `Content-Length, X-JSON`)
  res.setHeader(
    `Access-Control-Allow-Headers`,
    `Origin,X-Auth-Token,X-Requested-With,Content-Type,Authorization`
  )
  res.setHeader(`Access-Control-Allow-Credentials`, true)

  // Stop the request here
  if (req.method === `OPTIONS`) {
    res.status(200).send()

    return
  }

  next()
})

// eslint-disable-next-line func-style
function startServer(db, dbConnectString) {
  // Use the json parser in our application
  app.use(cookieParser(`${settings.server.name} SessionSecret`))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // Create an express session cookie to use with passport
  app.use(
    session({
      store: new MongoStore({ url: dbConnectString }),
      name: `${settings.server.name} Cookie`,
      secret: `${settings.server.name} SessionSecret`,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: settings.server.sessionDurationSeconds * 1000,
      },
    })
  )

  // Use the Passport middleware in our routes
  app.use(passport.initialize())
  app.use(passport.session())

  // Use the logger module in our development application
  const env = process.env.NODE_ENV || `dev`

  if (env === `dev`) {
    app.use(logger(`dev`))
  }

  app.use((req, res, next) => {
    // eslint-disable-next-line no-shadow
    let { session } = req

    if (!session) {
      session = req.session = {}
    }

    next()
  })

  if (!session) {
    session = req.session = {}
  }

  app.use((req, res, next) => {
    req.database = db

    next() // Move onto the next middleware
  })

  // ****************************************
  // CONFIG SERVER
  // *****************************************

  const cleanup = function () {
    db.close()
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit()
  }

  process.on(`SIGINT`, cleanup)
  process.on(`SIGTERM`, cleanup)

  // ****************************************
  // CREATE ROUTES
  // *****************************************

  app.get(`/heartbeat`, (req, res) => res.sendStatus(200))
  // Create our express router
  // const v1Router = require(`./v1/router`)(db, settings)
  const PublicRouter = require('./v1/routers/router-public')(db, settings)
  const PrivateRouter = require('./v1/routers/router-private')(db, settings)

  // Register ALL routes with /v1
  app.use(`/v1`, PublicRouter)
  app.use('/v1', PrivateRouter)

  // Catch 404 routing error
  app.use((req, res, next) => {
    const err = new Error(`Not Found`)

    err.status = 404

    res.json(err)

    next(err)
  })

  // Dev error handler -- to print stack trace
  if (app.get(`env`) === `development`) {
    app.use((err, req, res, next) => {
      res.status(err.status || 500)
      res.json({ message: err.message, error: err })
    })
  }

  // Production error handler -- no stack traces
  // leaked to user
  app.use((err, req, res, next) => {
    res.status(err.status || 404)
    res.send()
  })

  // ***************************************
  // START THE SERVER
  // ****************************************
  app.listen(port)

  // eslint-disable-next-line no-useless-concat
  console.log(`${settings.server.name} is listening on` + ` port ${port}...`)
}

// eslint-disable-next-line func-style
function startDB(config, next) {
  // *****************************************
  // CONFIGURE THE DATABASE
  // *****************************************

  // Create a mongoose connection
  // const mongooseConnection = mongoose.createConnection()

  // Connect to mongo
  const connectString = `mongodb://127.0.0.1:27017/MainDB`
  mongoose.set(`useCreateIndex`, true)
  mongoose.connect(connectString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  // Check the state of the pending transactions
  const db = mongoose.connection

  db.on(`error`, (err) => {
    // Print the error and close
    console.log(err.stack)
    db.close()
    process.exit(1)
  })

  db.once(`open`, () => {
    console.log(`Connected to database.....`)
    next(db, connectString)
  }) // End db once
}

if (settings.server.ssh.enabled) {
  const config = {
    username: settings.server.ssh.user,
    password: settings.server.ssh.password,
    host: settings.database.url,
    port: 22,
    dstHost: `localhost`,
    dstPort: settings.database.port,
    tryKeyboard: true,
  }

  const tnl = tunnel(config, (error, server) => {
    if (error) {
      console.error(`SSH connection error:`, error)

      return
    }

    startDB({ db: { url: `localhost`, port: config.dstPort } }, startServer)
  })

  tnl.on(`error`, (err) => {
    console.error(`An error occured when running the server =>`, err)
    tnl.close()
    process.exit(1)
  })

  tnl.on(`keyboard-interactive`, (name, descr, lang, prompts, finish) => {
    // For illustration purposes only! It's not safe to do this!
    // You can read it from process.stdin or whatever else...
    const { password } = config

    return finish([password])

    // And remember, server may trigger this event multiple times
    // and for different purposes (not only auth)
  })
} else {
  startDB(
    { db: { url: settings.database.url, port: settings.database.port } },
    startServer
  )
}
