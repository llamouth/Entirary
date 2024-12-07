const db = require("../db/dbconfig");

// Get all recommendations
const getAllRecommendations = async () => {
  try {
    const recommendations = await db.any(`
      SELECT r.*, d.name AS destination_name, u.username AS user_name
      FROM recommendations r
      LEFT JOIN destinations d ON r.destination_id = d.id
      LEFT JOIN users u ON r.user_id = u.id
    `);
    return recommendations;
  } catch (error) {
    console.error("Error retrieving recommendations:", error);
    throw new Error("Could not retrieve recommendations");
  }
};

// Get a single recommendation by ID
const getRecommendationById = async (id) => {
  try {
    const recommendation = await db.oneOrNone(`
      SELECT r.*, d.name AS destination_name, u.username AS user_name
      FROM recommendations r
      LEFT JOIN destinations d ON r.destination_id = d.id
      LEFT JOIN users u ON r.user_id = u.id
      WHERE r.id = $1
    `, [id]);
    if (!recommendation) {
      throw new Error("Recommendation not found");
    }
    return recommendation;
  } catch (error) {
    console.error("Error retrieving recommendation:", error);
    throw new Error("Could not retrieve recommendation");
  }
};

// Create a new recommendation
const createRecommendation = async (recommendation) => {
  const { destination_id, user_id, name, description, rating } = recommendation;
  try {
    const newRecommendation = await db.one(`
      INSERT INTO recommendations (destination_id, user_id, name, description, rating) 
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, destination_id, user_id, name, description, rating, total_reviews, created_at;
    `, [destination_id, user_id, name, description, rating]);
    return newRecommendation;
  } catch (error) {
    console.error("Error creating recommendation:", error);
    throw new Error("Could not create recommendation");
  }
};

// Update an existing recommendation
const updateRecommendation = async (id, updates) => {
  const { name, description, rating } = updates;

  const query = `
    UPDATE recommendations 
    SET 
      name = COALESCE($1, name), 
      description = COALESCE($2, description), 
      rating = COALESCE($3, rating),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $4
    RETURNING id, destination_id, user_id, name, description, rating, total_reviews, created_at, updated_at;
  `;

  const params = [name, description, rating, id];

  try {
    const updatedRecommendation = await db.oneOrNone(query, params);
    if (!updatedRecommendation) {
      throw new Error("Recommendation not found or could not be updated");
    }
    return updatedRecommendation;
  } catch (error) {
    console.error("Error updating recommendation:", error);
    throw new Error("Could not update recommendation");
  }
};

// Delete a recommendation
const deleteRecommendation = async (id) => {
  try {
    const deletedRecommendation = await db.result(
      `DELETE FROM recommendations WHERE id = $1;`, 
      [id]
    );
    if (deletedRecommendation.rowCount === 0) {
      throw new Error("Recommendation not found or could not be deleted");
    }
    return { message: "Recommendation successfully deleted" };
  } catch (error) {
    console.error("Error deleting recommendation:", error);
    throw new Error("Could not delete recommendation");
  }
};

// Update rating and total reviews for a recommendation
const updateRating = async (id, newRating) => {
  try {
    const updatedRecommendation = await db.one(`
      UPDATE recommendations
      SET 
        total_reviews = total_reviews + 1,
        rating = (rating * (total_reviews - 1) + $1) / total_reviews,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING id, name, rating, total_reviews, updated_at;
    `, [newRating, id]);
    return updatedRecommendation;
  } catch (error) {
    console.error("Error updating rating:", error);
    throw new Error("Could not update recommendation rating");
  }
};

module.exports = {
  getAllRecommendations,
  getRecommendationById,
  createRecommendation,
  updateRecommendation,
  deleteRecommendation,
  updateRating,
};
