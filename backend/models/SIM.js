const mongoose = require("mongoose");

const simSchema = new mongoose.Schema({
    layanan: {
        type: String,
        required: true,
        enum: ["Pembaharuan STNK", "Pembuatan SIM"],
    },
    nama: {
        type: String,
        required: true,
        trim: true,
    },
    alamat: {
        type: String,
        required: true,
    },
    tipe: {
        type: String,
        required: true,
        enum: ['SIM A', 'SIM B1', 'SIM C'],
    },
    tahun: {
        type: Number,
        required: true,
    },
    harga: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        default: "Pending",
        enum: ["Pending", "In Progress", "Done"],
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
