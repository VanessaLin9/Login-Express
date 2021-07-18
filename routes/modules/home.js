const express = require('express')
const router = express.Router()
const User = require('../../models/login')

//定義首頁路由
router.get('/', (req, res) => {
  res.render('index')
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
        return res.render('index', { nonUser})
      } else if (user[0].password !== password) {
        console.log('打錯密碼')
        const errorPassword = 'is-invalid'
        const option = req.body
        return res.render('index', { errorPassword, option })
      } else {
        return res.render('welcome', { user: user[0] })
      }
    })
})

//匯出路由模組
module.exports = router