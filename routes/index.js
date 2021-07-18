const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser')

const home = require('./modules/home')
router.use('/', home)


module.exports = router