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
    const validLayanan = ["Pembaharuan STNK"];
    if (!validLayanan.includes(layanan)) {
      return res.status(400).json({ message: "Invalid layanan type" });
    }

    // Check if the nomor_plat already exists
    const existingSTNK = await STNK.findOne({ nomor_plat });
    if (existingSTNK) {
      return res.status(400).json({ message: "Nomor plat already exists" });
    }

    const newSTNK = new STNK({ 
      layanan, 
      nomor_plat, 
      nama, 
      alamat, 
      merk, 
      tipe, 
      tahun, 
      harga,
      status: 'Pending'
    });
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
        _id: stnk._id,
        nama: stnk.nama,
        alamat: stnk.alamat,
        merk: stnk.merk,
        nomor_plat: stnk.nomor_plat,
        harga: stnk.harga,
        status: stnk.status
      };
    });
    res.status(200).json(stnkDetails);
  } catch (err) {
    res.status(500).json({ message: `Error fetching STNK data`, err });
  }
};

// Get STNK by ID
exports.getSTNKById = async (req, res) => {
  const id = req.params.id;
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
  const id = req.params.id;
  const { nomor_plat, status } = req.body;
  try {
    // Validate inputs
    if (!nomor_plat && !status) {
      return res.status(400).json({ message: 'Please provide nomor_plat or status to update' });
    }

    // Validate status if provided
    if (status && !['Pending', 'In Progress', 'Done'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    // Check if nomor_plat already exists (if updating nomor_plat)
    if (nomor_plat) {
      const existingSTNK = await STNK.findOne({ nomor_plat, _id: { $ne: id } });
      if (existingSTNK) {
        return res.status(400).json({ message: "Nomor plat already exists" });
      }
    }

    const updateData = {
      ...(nomor_plat && { nomor_plat }),
      ...(status && { status }),
      updatedAt: new Date()
    };

    const updatedSTNK = await STNK.findByIdAndUpdate(
      id, 
      updateData,
      { new: true }
    );

    if (!updatedSTNK) {
      return res.status(404).json({ message: `STNK with ID ${id} not found` });
    }

    res.status(200).json({ 
      message: `Successfully updated STNK ${id} data`, 
      updatedSTNK 
    });
  } catch (err) {
    res.status(500).json({ message: `Error updating STNK ${id} data`, err });
  }
};

// Delete STNK
exports.deleteSTNKById = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedSTNK = await STNK.findByIdAndDelete(id);
    
    if (!deletedSTNK) {
      return res.status(404).json({ message: `STNK with ID ${id} not found` });
    }

    res.status(200).json({ 
      message: `STNK ${id} deleted successfully`,
      deletedSTNK 
    });
  } catch (err) {
    res.status(500).json({ message: `Error deleting STNK ${id} data`, err });
  }
};