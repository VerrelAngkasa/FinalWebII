const express = require("express");
const { createSIM, getAllSIM, updateSIM, deleteSIM } = require("../controllers/dataSIMController");

const router = express.Router();

router.post("/", createSIM);
router.get("/", getAllSIM);
router.put("/id", updateSIM);
router.delete("/id", deleteSIM);

module.exports = router;
