const express = require("express");
const { createSTNK, getAllSTNK, getSTNKById, updateSTNKById, deleteSTNKById } = require("../controllers/dataSTNKController");
const validateToken = require("../middleware/validateToken");

const router = express.Router();

router.post("/", validateToken, createSTNK);
router.get("/", validateToken, getAllSTNK);
router.get("/:id", validateToken, getSTNKById);
router.put("/:id", validateToken, updateSTNKById);
router.delete("/:id", validateToken, deleteSTNKById);

module.exports = router;
