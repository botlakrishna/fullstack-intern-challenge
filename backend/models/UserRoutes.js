const pool = require('../config/db');

// Get all stores with average rating
const getStores = async () => {
    const result = await pool.query(
        `SELECT s.id, s.name, s.address, u.name as owner_name,
                COALESCE(AVG(r.rating),0) as avg_rating
         FROM stores s
         LEFT JOIN users u ON s.owner_id = u.id
         LEFT JOIN ratings r ON s.id = r.store_id
         GROUP BY s.id, u.name`
    );
    return result.rows;
};

// Submit or update rating
const submitRating = async ({ user_id, store_id, rating }) => {
    // Check if rating exists
    const exists = await pool.query('SELECT * FROM ratings WHERE user_id=$1 AND store_id=$2', [user_id, store_id]);
    if(exists.rows.length > 0){
        const result = await pool.query(
            'UPDATE ratings SET rating=$1, created_at=NOW() WHERE user_id=$2 AND store_id=$3 RETURNING *',
            [rating, user_id, store_id]
        );
        return result.rows[0];
    } else {
        const result = await pool.query(
            'INSERT INTO ratings(user_id, store_id, rating) VALUES($1,$2,$3) RETURNING *',
            [user_id, store_id, rating]
        );
        return result.rows[0];
    }
};

module.exports = { getStores, submitRating };
