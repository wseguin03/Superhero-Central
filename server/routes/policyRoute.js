const express = require('express');
const router = express.Router();
const { getPolicy, createPolicy, updatePolicy, getPolicies } = require('../controllers/policyController');

const {protect} = require('../middleware/authMiddleware');
// router.route('/')
    
router.route('/more').get(getPolicies);
router.route('/:name').get(getPolicy).put(protect, updatePolicy)
router.route('/').post(protect, createPolicy);
  
module.exports = router;