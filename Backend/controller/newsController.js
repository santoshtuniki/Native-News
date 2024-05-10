const ImageToBase64 = require('image-to-base64');
const News = require('../model/NewsModel');

const addNews = async (req, res, next) => {
    try {
        const { title, content, author, category, addToSlider = false } = req.body;
        const base64Data = await ImageToBase64(req.files.newsImage.path);
        const news = await News.create({
            content,
            author,
            category,
            newsImage: `data:${req.files.newsImage.type};base64,${base64Data}`,
            addedAt: Date.now(),
            addToSlider
        })

        if (news) {
            res.status(201).json({
                success: true,
                Msg: 'Successfully added News',
                data: news
            })
        } else {
            res.status(400).json({
                success: false,
                Msg: 'Invalid News data',
            })
        }
    } catch (error) {
        console.log('Error adding news:', error.message);
        next(error);
    }
};

const getAllNews = async (req, res, next) => {
    try {
        const pageNo = Number(req.params.pageNo);
        const pageSize = Number(req.params.pageSize || 10);
        if (pageNo < 0 || pageNo === 0) {
            res.status(401).json({
                success: false,
                Msg: 'Invalid page number. Should be greater than 0',
            })
        }

        const query = {};
        query.skip = pageSize * (pageNo - 1);
        query.limit = pageSize;

        const newsCount = await News.find({});

        const news = await News.find({})
            .sort('-addedAt')
            .populate({
                path: 'category',
                select: ['_id', 'category_name']
            })
            .skip(query.skip)
            .limit(query.limit);

        res.status(200).json({
            success: true,
            count: newsCount.length,
            data: news
        })
    } catch (error) {
        console.log('Error getting news:', error.message);
        next(error);
    }
};

const getNewsById = async (req, res, next) => {
    try {
        const news = await News.findById(req.params.newsId)
            .populate({
                path: 'category',
                select: ['_id', 'category_name']
            });

        res.status(200).json({
            success: true,
            data: news
        })
    } catch (error) {
        console.log(`Error getting news with id ${req.params.newsId}:`, error.message);
        next(error);
    }
};

const getSliderNews = async (req, res, next) => {
    try {
        const news = await News.find({ addToSlider: true })
            .populate({
                path: 'category',
                select: ['_id', 'category_name']
            });

        res.status(200).json({
            success: true,
            count: news.length,
            data: news
        })
    } catch (error) {
        console.log(`Error getting slider news:`, error.message);
        next(error);
    }
};

const getNewsByCategory = async (req, res, next) => {
    try {
        const news = await News.find({ category: req.params.catId })
            .populate({
                path: 'category',
                select: ['_id', 'category_name']
            });

        res.status(200).json({
            success: true,
            count: news.length,
            data: news
        })
    } catch (error) {
        console.log(`Error getting category news:`, error.message);
        next(error);
    }
};

const deleteNews = async (req, res, next) => {
    try {
        const news = await News.findByIdAndDelete(req.params.newsId);
        if (!news) {
            res.status(401).json({
                success: false,
                msg: 'News not found'
            })
        }

        res.status(200).json({
            success: true,
            msg: 'Successfully deleted news',
            data: category
        })
    } catch (error) {
        console.log(`Error deleting news with id ${req.params.newsId}:`, error.message);
        next(error);
    }
};

const updateNews = async (req, res, next) => {
    try {
        const news = await News.findByIdAndUpdate(req.params.newsId, req.body, {
            new: true,
            runValidators: true
        });

        if (!news) {
            res.status(401).json({
                success: false,
                msg: 'Mews not found'
            })
        }

        res.status(200).json({
            success: true,
            msg: 'Successfully updated news',
            data: category
        })
    } catch (error) {
        console.log(`Error updating news with id ${req.params.newsId}:`, error.message);
        next(error);
    }
};

module.exports = {
    addNews,
    getAllNews,
    getNewsById,
    getSliderNews,
    getNewsByCategory,
    deleteNews,
    updateNews
};