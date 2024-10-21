const express = require('express');
const { addUser, getUserProfile ,updateUserProfile} = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/addUser', protect, addUser);
router.get('/getUserProfile', protect, getUserProfile);
router.put('/updateProfile',protect,updateUserProfile)
module.exports = router;