const jwt = require('jsonwebtoken');

const User = require('../model/UserModel');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.header = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.log('Error verifying token:', error);
            res.status(401).json({
                success: false,
                msg: 'Session Expired'
            })
        }
    }

    if (!token) {
        res.status(401).json({
            success: false,
            msg: 'UnAuthorized. No Token'
        })
    }
};

module.exports = protect;