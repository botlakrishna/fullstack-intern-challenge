const { createUser, getUsers, getStores, createStore, getStats } = require('../models/Admin');
const { validateName, validateAddress, validatePassword, validateEmail } = require('../utils/validators');

const addUser = async (req, res) => {
    const { name, email, password, address, role } = req.body;

    if (!validateName(name)) return res.status(400).json({ message: 'Name must be 20-60 characters' });
    if (!validateAddress(address)) return res.status(400).json({ message: 'Address max 400 characters' });
    if (!validatePassword(password)) return res.status(400).json({ message: 'Password must be 8-16 chars, 1 uppercase, 1 special' });
    if (!validateEmail(email)) return res.status(400).json({ message: 'Invalid email' });

    try {
        const user = await createUser({ name, email, password, address, role });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const listUsers = async (req, res) => {
    try {
        const users = await getUsers(req.query);
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const addStore = async (req, res) => {
    const { name, email, address, owner_id } = req.body;
    try {
        const store = await createStore({ name, email, address, owner_id });
        res.json(store);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const listStores = async (req, res) => {
    try {
        const stores = await getStores(req.query);
        res.json(stores);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const dashboardStats = async (req, res) => {
    try {
        const stats = await getStats();
        res.json(stats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { addUser, listUsers, addStore, listStores, dashboardStats };
