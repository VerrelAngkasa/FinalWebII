// backend/routes/DataRoutes.js
const express = require("express");
const router = express.Router();
const { createData, getData, updateData, deleteData } = require("../controllers/dataController");

// Route untuk membuat catatan baru
router.post("/", createData);

// Route untuk mendapatkan semua catatan
router.get("/", getData);

// Route untuk memperbarui catatan
router.put("/:id", updateData);

// Route untuk menghapus catatan
router.delete("/:id", deleteData);

module.exports = router;
