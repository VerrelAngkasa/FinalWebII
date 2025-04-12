const express = require('express');
const { signupAdmin, loginAdmin, logoutAdmin } = require('../controllers/adminController');

const router = express.Router();

router.post('/signup', signupAdmin);
router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin);

module.exports = router;