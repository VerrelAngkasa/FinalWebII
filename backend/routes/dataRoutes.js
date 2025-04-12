const express = require("express");
const { createData, getData, updateData, deleteData } = require("../controllers/dataController");

const router = express.Router();

router.post("/", createData);
router.get("/", getData);
router.put("/:id", updateData);
router.delete("/:id", deleteData);

module.exports = router;
