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
app.use(cors({
    origin: 'https://sumatera-jaya-abadi-629152958854.asia-southeast2.run.app',
    credentials: true,
}));
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use('/admin', adminRoutes);
app.use('/data/stnk', dataSTNKRoutes);
app.use('/data/sim', dataSIMRoutes);

// Start Server
app.listen(PORT || 5000, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
