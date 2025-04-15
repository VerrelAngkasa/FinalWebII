const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const validateToken = async (req, res, next) => {
    // Bearer token authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauhorized'}); // Unauthorized

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await Admin.findById(decoded.id).select('-password').exec();
        if (!req.user) return res.status(401).json({ message: 'Unauhorized'}); // Unauthorized
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Unauhorized'}); // Unauthorized
    }
}

module.exports = validateToken;