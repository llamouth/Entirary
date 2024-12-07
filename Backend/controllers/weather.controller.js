const express = require("express");
const weather = express.Router();
const { getPastWeather, getCurrentWeather, getFiveDayForeCast } = require("../queries/weather.queries");

weather.get("/past", async (req, res) => {
  try {
    const allDestinations = await getPastWeather(req.body)
    res.status(200).json(allDestinations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

weather.get('/current', async (req, res) => {
  try {
    const currentWeather = await getCurrentWeather(req.body)
    res.status(200).json(currentWeather);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

weather.get('/five-day-forecast', async (req, res) => {
  try {
    const forecast = await getFiveDayForeCast(req.body)
    res.status(200).json(forecast);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

module.exports = weather;