const { getStores, submitRating } = require('../models/UserRoutes');

const listStores = async (req, res) => {
    try {
        const stores = await getStores();
        res.json(stores);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const rateStore = async (req, res) => {
    const { store_id, rating } = req.body;
    try {
        const result = await submitRating({ user_id: req.user.id, store_id, rating });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { listStores, rateStore };
