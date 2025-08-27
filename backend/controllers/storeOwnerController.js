const { getStoreAverageRating, getStoreRatings } = require('../models/StoreOwner');

const storeAverage = async (req, res) => {
    try {
        const data = await getStoreAverageRating(req.user.id);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const storeRatings = async (req, res) => {
    try {
        const data = await getStoreRatings(req.user.id);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { storeAverage, storeRatings };
