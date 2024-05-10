const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema(
    {
        author: String,
        title: String,
        content: String,
        url: String,
        newsImage: String,
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        },
        views: {
            type: Number,
            default: 0
        },
        addToSlider: {
            type: Boolean,
            default: false
        },
        comments: [{
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            comment: String
        }],
        addedAt: Date
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('News', NewsSchema);
