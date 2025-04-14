const express = require("express");
const { createSTNK, getAllSTNK, getSTNKById, updateSTNKById, deleteSTNKById } = require("../controllers/dataSTNKController");
const validateToken = require("../middleware/validateToken");

const router = express.Router();

router.post("/", validateToken, createSTNK);
router.get("/", validateToken, getAllSTNK);
router.get("/data", validateToken, getSTNKById);
router.put("/data", validateToken, updateSTNKById);
router.delete("/data", validateToken, deleteSTNKById);

module.exports = router;
