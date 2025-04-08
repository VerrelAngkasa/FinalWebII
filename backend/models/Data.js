// backend/models/Note.js
const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    nomor_plat: {
        type: String,
        required: true,
        trim: true, 
    },
    nama: {
        type: String,
        required: true,
        trim: true,
    },
    merk: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Data", dataSchema);
