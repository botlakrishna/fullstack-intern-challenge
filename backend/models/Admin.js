const pool = require('../config/db');
const bcrypt = require('bcryptjs');

// Create a new user (admin can create normal, store owner, or admin)
const createUser = async ({ name, email, password, address, role }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
        'INSERT INTO users(name, email, password, address, role) VALUES($1,$2,$3,$4,$5) RETURNING *',
        [name, email, hashedPassword, address, role]
    );
    return result.rows[0];
};

// Get all users with optional filters
const getUsers = async (filters) => {
    let baseQuery = 'SELECT id, name, email, address, role FROM users WHERE 1=1';
    const values = [];
    let index = 1;

    if(filters.name){
        baseQuery += ` AND name ILIKE $${index}`;
        values.push(`%${filters.name}%`);
        index++;
    }
    if(filters.email){
        baseQuery += ` AND email ILIKE $${index}`;
        values.push(`%${filters.email}%`);
        index++;
    }
    if(filters.address){
        baseQuery += ` AND address ILIKE $${index}`;
        values.push(`%${filters.address}%`);
        index++;
    }
    if(filters.role){
        baseQuery += ` AND role=$${index}`;
        values.push(filters.role);
        index++;
    }

    const result = await pool.query(baseQuery, values);
    return result.rows;
};

// Get all stores with optional filters
const getStores = async (filters) => {
    let baseQuery = 'SELECT s.id, s.name, s.email, s.address, u.name as owner_name FROM stores s LEFT JOIN users u ON s.owner_id = u.id WHERE 1=1';
    const values = [];
    let index = 1;

    if(filters.name){
        baseQuery += ` AND s.name ILIKE $${index}`;
        values.push(`%${filters.name}%`);
        index++;
    }
    if(filters.email){
        baseQuery += ` AND s.email ILIKE $${index}`;
        values.push(`%${filters.email}%`);
        index++;
    }
    if(filters.address){
        baseQuery += ` AND s.address ILIKE $${index}`;
        values.push(`%${filters.address}%`);
        index++;
    }

    const result = await pool.query(baseQuery, values);
    return result.rows;
};

// Add a new store
const createStore = async ({ name, email, address, owner_id }) => {
    const result = await pool.query(
        'INSERT INTO stores(name,email,address,owner_id) VALUES($1,$2,$3,$4) RETURNING *',
        [name,email,address,owner_id]
    );
    return result.rows[0];
};

// dashboard stats
const getStats = async () => {
    const totalUsers = await pool.query('SELECT COUNT(*) FROM users');
    const totalStores = await pool.query('SELECT COUNT(*) FROM stores');
    const totalRatings = await pool.query('SELECT COUNT(*) FROM ratings');
    return {
        totalUsers: parseInt(totalUsers.rows[0].count),
        totalStores: parseInt(totalStores.rows[0].count),
        totalRatings: parseInt(totalRatings.rows[0].count)
    };
};

module.exports = { createUser, getUsers, getStores, createStore, getStats };
