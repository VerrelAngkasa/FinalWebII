const Data = require("../models/Data");

// Create a new data
exports.createData = async (req, res) => {
  try {
    const { nomor_plat, nama, merk } = req.body;
    const newData = new Data({ nomor_plat, nama, merk });
    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(500).json({ message: "Error creating new data", error });
  }
};

// Get all data
exports.getAllData = async (req, res) => {
  try {
    const data = await Data.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
};

// Update a data
exports.updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const { nomor_plat } = req.body;
    const updatedData = await Data.findByIdAndUpdate(id, { nomor_plat }, { new: true });
    res.status(200).json(updatedData);
  } catch (error) {
    res.status(500).json({ message: `Error updating ${id} data`, error });
  }
};

// Delete a data
exports.deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    await Data.findByIdAndDelete(id);
    res.status(200).json({ message: `Data ${id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Data", error });
  }
};
