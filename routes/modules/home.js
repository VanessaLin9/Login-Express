const express = require('express')
const router = express.Router()
const User = require('../../models/login')

//定義首頁路由
router.get('/', (req, res) => {
  res.render('index')
})

//匯出路由模組
module.exports = router