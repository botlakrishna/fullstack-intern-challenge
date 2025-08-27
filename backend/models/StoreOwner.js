const pool = require('../config/db');

// Get average rating for store
const getStoreAverageRating = async (ownerId) => {
    const result = await pool.query(
        `SELECT s.id, s.name, AVG(r.rating) as avg_rating
         FROM stores s
         LEFT JOIN ratings r ON s.id = r.store_id
         WHERE s.owner_id=$1
         GROUP BY s.id`, [ownerId]);
    return result.rows;
};

// Get all ratings for store
const getStoreRatings = async (ownerId) => {
    const result = await pool.query(
        `SELECT r.id, u.name as user_name, r.rating, r.created_at, s.name as store_name
         FROM ratings r
         JOIN users u ON r.user_id = u.id
         JOIN stores s ON r.store_id = s.id
         WHERE s.owner_id=$1`, [ownerId]);
    return result.rows;
};

module.exports = { getStoreAverageRating, getStoreRatings };
