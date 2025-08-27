const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const updatePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if(!newPassword || newPassword.length < 8 || newPassword.length >16)
        return res.status(400).json({ message: 'Password must be 8-16 characters long.' });
    if(!/[A-Z]/.test(newPassword)) 
        return res.status(400).json({ message: 'Password must contain at least one uppercase letter.' });
    if(!/[!@#$%^&*]/.test(newPassword))
        return res.status(400).json({ message: 'Password must contain at least one special character.' });

    try {
        const userResult = await pool.query('SELECT * FROM users WHERE id=$1', [req.user.id]);
        const user = userResult.rows[0];
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch) return res.status(400).json({ message: 'Old password is incorrect' });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await pool.query('UPDATE users SET password=$1 WHERE id=$2', [hashedPassword, req.user.id]);
        res.json({ message: 'Password updated successfully' });
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { updatePassword };
