const express = require('express')
const router = express.Router()
const User = require('../../models/login')
const cookieParser = require('cookie-parser')
router.use(cookieParser())


//定義首頁路由
router.get('/', (req, res) => {
  const userid = req.cookies.userid
  console.log(userid)

  if (userid === "") {
    res.render('index')
  }

  User.find({ _id: userid })
    .lean()
    .then(user => {
      if (user.length === 1) {
        res.render('welcome', { user: user[0] })
      } else {
        res.render('index')
      }
    })
    .catch(error => console.log(error))
})


router.post('/', (req, res) => {
  const account = req.body.account
  const password = req.body.password
  User.find({ email: account })
    .lean()
    .then(user => {
      if (user.length === 0) {
        console.log('無使用者')
        const nonUser = 'is-invalid'
        return res.render('index', { nonUser })
      } else if (user[0].password !== password) {
        console.log('打錯密碼')
        const errorPassword = 'is-invalid'
        const option = req.body
        return res.render('index', { errorPassword, option })
      } else {
        console.log(user[0]._id)
        res.cookie('userid', user[0]._id)
        res.render('welcome', { user: user[0] })
        return
      }
    })
})

//匯出路由模組
module.exports = router