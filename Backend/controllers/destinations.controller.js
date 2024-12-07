const express = require("express");
const destinations = express.Router();
const {
  getAllDestinations,
  getNearbyPlaces
} = require("../queries/destinations.queries");

destinations.get("/", async (req, res) => {
  try {
    const allDestinations = await getAllDestinations(req.body.name);
    res.status(200).json(allDestinations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

destinations.get("/nearby", async (req, res) => {
  try {
    const nearbyPlaces = await getNearbyPlaces(req.body);
    res.status(200).json(nearbyPlaces);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

destinations.post("/", async (req, res) => {
  try {
    const newDestination = await createDestination(req.body);
    res.status(201).json(newDestination);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

destinations.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedDestination = await updateDestination(id, req.body);
    res.status(200).json(updatedDestination);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

destinations.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteDestination(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = destinations;