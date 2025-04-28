// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const adminRoutes = require('./routes/adminRoutes');
const dataSTNKRoutes = require('./routes/dataSTNKRoutes');
const dataSIMRoutes = require('./routes/dataSIMRoutes');

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect('mongodb+srv://sja-user:sja123@cluster1.8oox96x.mongodb.net/db-sja', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected successfully"))
.catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use('/admin', adminRoutes);
app.use('/data/stnk', dataSTNKRoutes);
app.use('/data/sim', dataSIMRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
