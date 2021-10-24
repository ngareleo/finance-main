var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var dotenv = require('dotenv')
var passport = require('passport')
var session = require('express-session')
var bodyParser = require('body-parser')
var cors = require('cors')
var morgan = require('morgan')

//Routers
var indexRouter = require('./server/routes/index')
var uploadRouter = require('./server/routes/upload')
var testRouter = require('./server/routes/test')
var loginRouter = require('./server/routes/login')
var signupRouter = require('./server/routes/signup')
var failureRouter = require('./server/routes/loginFailure')
var isAuthenticatedRouter = require('./server/routes/is_authenticated')
var logoutRouter = require('./server/routes/logout')

//Express app

var app = express()
const viewsDir = path.join(__dirname, 'server', 'views')
const layoutsDir = path.join(viewsDir, 'layouts')

// view engine setup

require('./config') // our mongodb database instance

var handlebars = require('express3-handlebars').create({
  defaultLayout: `${layoutsDir}/main`,
})
app.engine('handlebars', handlebars.engine)
app.set('views', viewsDir)
app.set('view engine', 'handlebars')

////////////////////////////////////////////////////////////////////

require('./server/boot/auth')()

app.use(cors())
dotenv.config()
app.use(
  session({
    secret: 'ITS ABOUT TIME',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
  }),
)

app.use(morgan('dev'))
app.use(
  express.json({
    limit: '500mb',
  }),
)
app.use(
  express.urlencoded({
    limit: '500mb',
    extended: false,
    parameterLimit: 100000,
  }),
)
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'server', 'public')))

app.use(passport.initialize())
app.use(passport.session())

app.use(indexRouter)
app.use(loginRouter)
app.use(logoutRouter)
app.use(signupRouter)
app.use(testRouter)
app.use(failureRouter)
app.use(uploadRouter)
app.use(isAuthenticatedRouter)

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).render('error')
})

// this should appear AFTER all of your routes
app.use(function (req, res) {
  res.status(404).render('error')
})

module.exports = app
