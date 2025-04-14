const express = require("express");
const { createSIM, getAllSIM, getSIMById, updateSIMById, deleteSIMById } = require("../controllers/dataSIMController");
const validateToken = require("../middleware/validateToken");

const router = express.Router();

router.post("/", validateToken, createSIM);
router.get("/", validateToken, getAllSIM);
router.get("/data", validateToken, getSIMById);
router.put("/data", validateToken, updateSIMById);
router.delete("/data", validateToken, deleteSIMById);

module.exports = router;
