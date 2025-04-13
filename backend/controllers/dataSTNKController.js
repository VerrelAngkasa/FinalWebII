const STNK = require("../models/STNK");

// Create New Data STNK
exports.createSTNK = async (req, res) => {
  try {
    const { layanan, nomor_plat, nama, merk, tipe, tahun } = req.body;

    // Check if the required fields are provided
    if (!layanan || !nomor_plat || !nama || !merk || !tipe || !tahun) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    // Check if the layanan is valid
    const validLayanan = ["Pembaharuan STNK", "Pembuatan SIM"];
    if (!validLayanan.includes(layanan)) {
      return res.status(400).json({ message: "Invalid layanan type" });
    }

    // Check if the nomor_plat already exists
    const existingSTNK = await STNK.findOne({ nomor_plat });
    if (existingSTNK) {
      return res.status(400).json({ message: "Nomor plat already exists" });
    }

    const newSTNK = new STNK({ layanan, nomor_plat, nama, merk, tipe, tahun });
    const savedSTNK = await newSTNK.save();
    res.status(201).json({ message: `Successfully created new STNK ${id} data`, savedSTNK });
  } catch (err) {
    res.status(500).json({ message: "Error creating new STNK data", err });
  }
};

// Get All STNK
exports.getAllSTNK = async (req, res) => {
  try {
    const stnk = await STNK.find().sort({ createdAt: -1 });
    res.status(200).json(stnk);
  } catch (err) {
    res.status(500).json({ message: `Error fetching STNK ${id} data`, err });
  }
};

// Update STNK
exports.updateSTNK = async (req, res) => {
  try {
    const { id } = req.params;
    const { nomor_plat } = req.body;
    const updatedAt = new Date().toISOString();
    const updatedSTNK = await STNK.findByIdAndUpdate(id, { nomor_plat, updatedAt }, { new: true });
    res.status(200).json({ message: `Successfully update STNK ${id} data`, updatedSTNK });
  } catch (err) {
    res.status(500).json({ message: `Error updating STNK ${id} data`, err });
  }
};

// Delete STNK
exports.deleteSTNK = async (req, res) => {
  try {
    const { id } = req.params;
    await STNK.findByIdAndDelete(id);
    res.status(200).json({ message: `STNK ${id} deleted successfully` });
  } catch (err) {
    res.status(500).json({ message: `Error deleting STNK ${id} data`, err });
  }
};
