// require express
const express = require("express")
const app = express()
const port = 3000

// require express-handlebars
const exphbs = require('express-handlebars')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// require restaurants data
const restaurantList = require("./restaurant.json")

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
  const keyword = req.query.keyword.toLowerCase()
  const restaurants = restaurantList.results.filter(restaurant =>
    restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword)
  )
  res.render('index', { item: restaurants, keyword })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})