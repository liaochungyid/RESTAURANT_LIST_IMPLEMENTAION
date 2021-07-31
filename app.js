// require express
const express = require("express")
const app = express()
const port = 3000

// require express-handlebars
const exphbs = require('express-handlebars')
const restaurantList = require("./restaurant.json")

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { item: restaurantList.results })
})

app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.results.filter(restaurant => restaurant.id = Number(req.params.id))
  res.render('show', { item: restaurant[0] })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})