const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { addSkill, getSkills, deleteSkill } = require('../controllers/skillController');

router.post('/add', protect, addSkill);
router.get('/', protect, getSkills);
router.delete('/:id',protect,deleteSkill)
module.exports = router;