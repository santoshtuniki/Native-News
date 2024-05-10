const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');

const {
    addNews,
    getAllNews,
    getNewsById,
} = require('../controller/newsController');

router.route('/addNews').post(protect, addNews);
router.route('/getAllNews/:pageNo/:pageSize').get(protect, getAllNews);
router.route('/getById/:newsId').get(protect, getNewsById);

module.exports = router;
