const Category = require('../model/CategoryModel');

const addCategory = async (req, res, next) => {
    try {
        const { category_name } = req.body;
        const category = await Category.findOne({ category_name });

        if (category) {
            res.status(401).json({
                success: false,
                msg: 'Category already exists'
            })
        }

        const newCategory = await Category.create({ category_name })
        res.status(201).json({
            success: true,
            msg: 'Category created',
            data: newCategory
        })
    } catch (error) {
        console.log('Error creating category:', error.message);
        next(error);
    }
};

const getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find({});
        res.status(200).json({
            success: true,
            data: categories
        })
    } catch (error) {
        console.log('Error getting categories:', error.message);
        next(error);
    }
};

const deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.catId);
        if (!category) {
            res.status(401).json({
                success: false,
                msg: 'Category not found'
            })
        }

        res.status(200).json({
            success: true,
            msg: 'Successfully deleted category',
            data: category
        })
    } catch (error) {
        console.log(`Error deleting category with id ${req.params.catId}:`, error.message);
        next(error);
    }
};

const updateCategory = async (req, res, next) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.catId, req.body, {
            new: true,
            runValidators: true
        });

        if (!category) {
            res.status(401).json({
                success: false,
                msg: 'Category not found'
            })
        }

        res.status(200).json({
            success: true,
            msg: 'Successfully updated category',
            data: category
        })
    } catch (error) {
        console.log(`Error updating category with id ${req.params.catId}:`, error.message);
        next(error);
    }
};

module.exports = {
    addCategory,
    getAllCategories,
    deleteCategory,
    updateCategory
};