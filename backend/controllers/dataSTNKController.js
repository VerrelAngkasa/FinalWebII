const STNK = require("../models/STNK");

// Create New Data STNK
exports.createSTNK = async (req, res) => {
  const { layanan, nomor_plat, nama, alamat, merk, tipe, tahun, harga } = req.body;
  try {
    // Check if the required fields are provided
    if (!layanan || !nomor_plat || !nama || !alamat || !merk || !tipe || !tahun || !harga) {
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

    const newSTNK = new STNK({ layanan, nomor_plat, nama, alamat, merk, tipe, tahun, harga });
    const savedSTNK = await newSTNK.save();
    res.status(201).json({ message: `Successfully created new ${layanan} data`, savedSTNK });
  } catch (err) {
    res.status(500).json({ message: `Error creating new ${layanan} data`, err });
  }
};

// Get All STNK
exports.getAllSTNK = async (req, res) => {
  try {
    const stnk = await STNK.find().sort({ createdAt: -1 });
    const stnkDetails = stnk.map((stnk) => {
      return {
        id: stnk._id,
        nomor_plat: stnk.nomor_plat,
        nama: stnk.nama,
        tahun: stnk.tahun,
        harga: stnk.harga,
        updatedAt: stnk.updatedAt,
      };
    })
    res.status(200).json(stnkDetails);
  } catch (err) {
    res.status(500).json({ message: `Error fetching STNK data`, err });
  }
};

exports.getSTNKById = async (req, res) => {
  const id = req.query.id;
  try {
    const stnk = await STNK.findById(id);
    if (!stnk) {
      return res.status(404).json({ message: `STNK data with ID ${id} not found` });
    }
    res.status(200).json(stnk);
  } catch (err) {
    res.status(500).json({ message: `Error fetching STNK data with ID ${id}`, err }); 
  }
};

// Update STNK
exports.updateSTNKById = async (req, res) => {
  const id = req.query.id;
  const { nomor_plat } = req.body;
  try {
    if(!nomor_plat) {
      res.status(400).json({ message: 'Please fill in the required field'})
    }

    const updatedAt = new Date().toISOString();
    const updatedSTNK = await STNK.findByIdAndUpdate(id, { nomor_plat, updatedAt }, { new: true });
    res.status(200).json({ message: `Successfully update STNK ${id} data`, updatedSTNK });
  } catch (err) {
    res.status(500).json({ message: `Error updating STNK ${id} data`, err });
  }
};

// Delete STNK
exports.deleteSTNKById = async (req, res) => {
  const id = req.query.id;
  try {
    await STNK.findByIdAndDelete(id);
    res.status(200).json({ message: `STNK ${id} deleted successfully` });
  } catch (err) {
    res.status(500).json({ message: `Error deleting STNK ${id} data`, err });
  }
};
