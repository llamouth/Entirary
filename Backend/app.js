const express = require('express');
const app = express()
const cors = require('cors');
const usersController = require('./controllers/users.controller');
const destinationsController = require('./controllers/destinations.controller');
const recommendationsController = require('./controllers/recommendations.controller');
const weatherController = require('./controllers/weather.controller');
const googlePlacesController = require('./controllers/googlePlaces.controller');

app.use(express.json())
app.use(cors())

// Routes
app.use('/users', usersController)
app.use('/destinations', destinationsController)
app.use('/recommendations', recommendationsController)
app.use('/weather', weatherController)
app.use('/googlePlaces', googlePlacesController)

app.get('/', (req, res) => {
    res.status(200).json({message: 'Welcome to Entirary'})
})
app.get('*', (req, res) => {
    res.status(404).json({ error: 'NOT FOUND'})
})

module.exports = app