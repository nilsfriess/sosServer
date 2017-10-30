let express = require('express')
let app = express()
const port = process.env.PORT || 44662
let mongoose = require('mongoose')
let Contact = require('./api/models/contactModel')
let Guestbook = require('./api/models/guestbookModel')
let bodyParser = require('body-parser')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://admin:123456@ds241055.mlab.com:41055/straightouttasoul-contact', {useMongoClient: true})
let db = mongoose.connection
db.on('error', console.error.bind(console, 'Mongo Connection Error: '))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

let contactRoutes = require('./api/routes/contactRoutes')
let guestbookRoutes = require('./api/routes/guestbookRoutes')
contactRoutes(app)
guestbookRoutes(app)

app.listen(port, () => {
  console.log("Server started on port ", port)
})