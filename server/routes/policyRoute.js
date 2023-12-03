const express = require('express');
const router = express.Router();
const { getPolicy, createPolicy, updatePolicy } = require('../controllers/policyController');

const {protect} = require('../middleware/authMiddleware');
// router.route('/')
    

router.route('/:name').get(getPolicy).put(protect, updatePolicy).post(protect, createPolicy)
  
module.exports = router;