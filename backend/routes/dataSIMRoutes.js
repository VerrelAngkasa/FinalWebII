const express = require("express");
const { createSIM, getAllSIM, getSIMById, updateSIMById, deleteSIMById } = require("../controllers/dataSIMController");
const validateToken = require("../middleware/validateToken");

const router = express.Router();

router.post("/", validateToken, createSIM);
router.get("/", validateToken, getAllSIM);
router.get("/:id", validateToken, getSIMById);
router.put("/:id", validateToken, updateSIMById);
router.delete("/:id", validateToken, deleteSIMById);

module.exports = router;
