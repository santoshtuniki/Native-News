const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');

const {
    addNews,
    getAllNews,
    getNewsById,
    getSliderNews,
    getNewsByCategory,
    deleteNews,
    updateNews
} = require('../controller/newsController');

router.route('/addNews').post(protect, addNews);
router.route('/getAllNews/:pageNo/:pageSize').get(protect, getAllNews);
router.route('/getById/:newsId').get(protect, getNewsById);
router.route('/getAllNews/slider').get(protect, getSliderNews);
router.route('/getByCategory/:catId').get(protect, getNewsByCategory);
router.route('/deleteNews/:newsId').delete(protect, deleteNews);
router.route('/editNews/:newsId').put(protect, updateNews);

module.exports = router;
