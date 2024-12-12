const express = require("express");
const googlePlaces = express.Router();
const { getNearbyPlaces, getPlaceDetails, getGeoData } = require("../queries/googlePlaces.queries");

googlePlaces.post('/nearBy', async (req, res) => {
    try {
        const nearbyPlaces = await getNearbyPlaces(req.body)
        res.status(200).json(nearbyPlaces);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

googlePlaces.post('/details', async (req, res) => {
    try {
        const placeDetails = await getPlaceDetails(req.body)
        res.status(200).json(placeDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

googlePlaces.post('/geo-data', async (req, res) => {
    try {
        const geoData = await getGeoData(req.body)
        res.status(200).json(geoData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = googlePlaces;