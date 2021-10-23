var express = require('express')
var router = express.Router()
var Transactions = require('../models/transactions')

router.get('/test', (req, res, next) => {
  if (req.isAuthenticated()) {
    //send the credentials
    let query = {
      user_id: req.session.passport.user,
    }
    let order = {
      message_id: -1,
    }
    var data
    Transactions.findOne(query)
      .sort(order)
      .limit(1)
      .then((result) => {
        if (data != null && data != undefined) {
          res.json({ message: 'Okay', limit: data })
        }
      })
      .catch((err) => {
        res.json({ message: 'Failure', errorMessage: err })
      })
    res.json({ message: 'Okay', limit: 0 })
  } else {
    res.redirect('/login')
  }
})

module.exports = router
