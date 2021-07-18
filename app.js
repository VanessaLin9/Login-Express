const express = require('express')
const app = express()
const port = 3000
const methOverride = require('method-override')
const cookieParser = require('cookie-parser')
const routes = require('./routes')



const User = require('./models/login')

const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
require('./config/mongoose')


app.use(methOverride('_method'))
app.use(routes)
app.use(cookieParser())

app.listen(port, () => {
  console.log(`express is listen on localhast${port}!`)
})