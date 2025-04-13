const SIM = require("../models/SIM");

// Create New Data SIM
exports.createSIM = async (req, res) => {
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
    const existingSIM = await SIM.findOne({ nomor_plat });
    if (existingSIM) {
      return res.status(400).json({ message: "Nomor plat already exists" });
    }

    const newSIM = new SIM({ layanan, nomor_plat, nama, merk, tipe, tahun });
    const savedSIM = await newSIM.save();
    res.status(201).json({ message: `Successfully created new SIM ${id} data`, savedSIM });
  } catch (err) {
    res.status(500).json({ message: "Error creating new SIM data", err });
  }
};

// Get All SIM
exports.getAllSIM = async (req, res) => {
  try {
    const sim = await SIM.find().sort({ createdAt: -1 });
    res.status(200).json(sim);
  } catch (err) {
    res.status(500).json({ message: `Error fetching SIM ${id} data`, err });
  }
};

// Update SIM
exports.updateSIM = async (req, res) => {
  try {
    const { id } = req.params;
    const { nomor_plat } = req.body;
    const updatedAt = new Date().toISOString();
    const updatedSIM = await SIM.findByIdAndUpdate(id, { nomor_plat, updatedAt }, { new: true });
    res.status(200).json({ message: `Successfully update SIM ${id} data`, updatedSIM });
  } catch (err) {
    res.status(500).json({ message: `Error updating SIM ${id} data`, err });
  }
};

// Delete SIM
exports.deleteSIM = async (req, res) => {
  try {
    const { id } = req.params;
    await SIM.findByIdAndDelete(id);
    res.status(200).json({ message: `SIM ${id} deleted successfully` });
  } catch (err) {
    res.status(500).json({ message: `Error deleting SIM ${id} data`, err });
  }
};
