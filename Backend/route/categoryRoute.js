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
router.route('/getAllCategory').delete(protect, getAllCategories);
router.route('/deleteCategory/:catId').delete(protect, deleteCategory);
router.route('/editCategory/:catId').delete(protect, updateCategory);

module.exports = router;