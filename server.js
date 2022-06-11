const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./controllers/routes')
const connection = require('./models/connection')
const TokenParser = require('cookie-parser')
require('dotenv').config()

app.use(TokenParser())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use('/', routes)
connection()
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`app is running on http://localhost:${PORT}`)
})
