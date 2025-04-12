const Admin = require('../models/Admin');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup/Register New Admin
exports.signupAdmin = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }
    // Check if admin already exists
    const isUserNew = await Admin.findOne({ email });
    if (isUserNew) {
        return res.status(400).json({ message: 'Admin already exists' });
    }

    try {
        const newAdmin = new Admin({ name, email, password });
        const salt = await bcryptjs.genSalt(10);
        newAdmin.password = await bcryptjs.hash(password, salt);
        await newAdmin.save();
        res.status(201).json({ message: 'Successfully created new Admin', user: newAdmin.name });
    } catch (err) {
        res.json(400).json({ message: 'Error creating admin', error: err.message });
    }
};

//Login Admin
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: 'Please fill in all fields' });
        return;
    }

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin credentials not found' });
        }
        const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Sucessfully logged in', user: admin.name, token });
        const isPasswordValid = await bcryptjs.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid admin credentials' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
};

// Logout Admin
exports.logoutAdmin = async (req, res) => {
    try {
        res.clearCookie('token'); // Clear the token from cookies if you're using cookies for authentication
        res.status(200).json({ message: 'Successfully logged out' });
    } catch (err) {
        res.status(500).json({ message: 'Error logging out', error: err.message });
    }
};