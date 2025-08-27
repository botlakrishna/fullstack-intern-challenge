const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const storeOwnerRoutes = require('./routes/storeOwner');
const userRoutes = require('./routes/user');
const passwordRoutes = require('./routes/password');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/store-owner', storeOwnerRoutes);
app.use('/api/user', userRoutes);
app.use('/api/password', passwordRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
