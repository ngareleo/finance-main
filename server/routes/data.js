const express = require('express')
const router = express.Router()
const Axios = require('axios').default'


router.get('/get-data', async (req, res) => {
  //will deal with data required by the application
  //dashboard data => https://finance.leongari/get-data?dType=dashboard
  if (req.isAuthenticated()) {
    let dataReq = req.query.dType
    switch (dataReq) {
      case 'dashboard':
        const dashData = await getDashData(req.session.passport.user)
        console.log(dashData)
        return res.json(dashData)
    }
    return res.json({ message: 'Wrong request' })
  } else {
    return res.redirect('/login')
  }
})

const getDashData = (u_id) => {
  //request data from flask app
  const url = `http://127.0.0.1:5000/dash?uuid=${u_id}`
  Axios.get(url)
    .then((res) => {
      console.log(res.data)
      return res.data
    })
    .catch((err) => {
      console.error(err)
      return {
        complete: -1,
      }
    })
}

module.exports = router
