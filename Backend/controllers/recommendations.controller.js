const express = require("express");
const recommendations = express.Router();
const {
  getAllRecommendations,
  getRecommendationById,
  createRecommendation,
  updateRecommendation,
  deleteRecommendation,
  updateRating,
} = require("../queries/recommendations.queries");

recommendations.get("/", async (req, res) => {
  try {
    const allRecommendations = await getAllRecommendations();
    res.status(200).json(allRecommendations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

recommendations.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const recommendation = await getRecommendationById(id);
    res.status(200).json(recommendation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

recommendations.post("/", async (req, res) => {
  try {
    const newRecommendation = await createRecommendation(req.body);
    res.status(201).json(newRecommendation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

recommendations.put("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedRecommendation = await updateRecommendation(id, req.body);
    res.status(200).json(updatedRecommendation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

recommendations.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await deleteRecommendation(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

recommendations.patch("/:id/rating", async (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;
  try {
    const updatedRating = await updateRating(id, rating);
    res.status(200).json(updatedRating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = recommendations;
