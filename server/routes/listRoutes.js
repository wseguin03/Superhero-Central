const express = require('express');
const {getList, createList, getListById, updateList, deleteList} = require('../controllers/listControllers');
const {protect} = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(protect, getList);


router.route('/create').post(protect, createList)

router.route('/:id').get(getListById).put(protect, updateList).delete(protect, deleteList)

// .delete()



module.exports = router;