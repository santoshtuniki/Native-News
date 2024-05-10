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
        console.log('Error creating category:', error)
        next(err)
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
        console.log('Error getting categories:', error)
        next(err)
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
            msg: 'Successfully deleted',
            data: category
        })
    } catch (error) {
        console.log('Error deleting category:', error)
        next(err)
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
            msg: 'Successfully updated',
            data: category
        })
    } catch (error) {
        console.log('Error updating category:', error)
        next(err)
    }
};

module.exports = {
    addCategory,
    getAllCategories,
    deleteCategory,
    updateCategory
};