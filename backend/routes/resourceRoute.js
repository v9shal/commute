const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { addResource, getResource, deleteResource } = require('../controllers/resourceController');

// Route to add a resource, protected by middleware
router.post('/addResource', protect, addResource);

// Route to get resources, protected by middleware
router.get('/', protect, getResource);

router.delete('/:id',deleteResource)
module.exports = router;
