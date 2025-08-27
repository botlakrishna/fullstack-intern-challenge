const { createUser, getUserByEmail } = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { name, email, password, address } = req.body;

    // Basic validation
    if (!name || !email || !password || !address) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const existingUser = await getUserByEmail(email);
        if (existingUser) return res.status(400).json({ message: "Email already exists" });

        const user = await createUser({ name, email, password, address, role: 'user' });
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await getUserByEmail(email);
        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ token, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = { register, login };
