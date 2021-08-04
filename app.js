// require express
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const port = 3000

// require express-handlebars
const exphbs = require('express-handlebars')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// require restaurants data
const restaurantList = require("./restaurant.json")

// connect to mongodb
mongoose.connect("mongodb://127.0.0.1:27017/restaurant-list", { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log("mongodb error!")
})

db.once('open', () => {
  console.log("mongodb connect successfully !")
})

// pre-processing
function LCandRS(string) {
  // combination of tolowerCase and remove spacing
  return string.toLowerCase().split(' ').join('')
}

// setting static files
app.use(express.static('public'))

// routes setting
// index page
app.get('/', (req, res) => {
  res.render('index', { item: restaurantList.results })
})

// show page
app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.results.filter(restaurant => restaurant.id = Number(req.params.id))
  res.render('show', { item: restaurant[0] })
})

// search (index page)
app.get('/search', (req, res) => {
  const keyword = LCandRS(req.query.keyword)
  const restaurants = restaurantList.results.filter(restaurant => LCandRS(restaurant.name).includes(keyword) || LCandRS(restaurant.category).includes(keyword))
  res.render('index', { item: restaurants, keyword }) // 'keyword >> object literal extension
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})