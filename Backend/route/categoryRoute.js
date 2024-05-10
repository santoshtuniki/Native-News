const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');

const {
    addCategory,
    getAllCategories,
    deleteCategory,
    updateCategory
}  = require('../controller/categoryController');

router.route('/addCategory').post(protect, addCategory);
router.route('/getAllCategory').get(protect, getAllCategories);
router.route('/deleteCategory/:catId').delete(protect, deleteCategory);
router.route('/editCategory/:catId').put(protect, updateCategory);

module.exports = router;