const mongoose = require("mongoose");

const simSchema = new mongoose.Schema({
    layanan: {
        type: String,
        required: true,
        enum: ["Pembaharuan STNK", "Pembuatan SIM"],
    },
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
    tipe: {
        type: String,
        required: true,
    },
    tahun: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("SIM", simSchema);
