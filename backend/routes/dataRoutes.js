const express = require("express");
const { createData, getAllData, updateData, deleteData } = require("../controllers/dataController");

const router = express.Router();

router.post("/", createData);
router.get("/", getAllData);
router.put("/:id", updateData);
router.delete("/:id", deleteData);

module.exports = router;
