const express = require("express");
const { createSTNK, getAllSTNK, updateSTNK, deleteSTNK } = require("../controllers/dataSTNKController");

const router = express.Router();

router.post("/", createSTNK);
router.get("/", getAllSTNK);
router.put("/id", updateSTNK);
router.delete("/id", deleteSTNK);

module.exports = router;
