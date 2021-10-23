var express = require('express')
var router = express.Router()
var passport = require('passport')

/* GET home page. */
router.get('/', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render('index')
  } else {
    console.log('Not authenticated')
    res.redirect('/login')
  }
})

module.exports = router
