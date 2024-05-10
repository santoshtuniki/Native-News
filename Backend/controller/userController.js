const User = require('../model/UserModel');
const mailer = require('../utils/mailer');
const generateToken = require('../utils/generateToken');
const crypto = require('crypto');

const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists && userExists.active) {
            return res.status(400).json({
                success: false,
                msg: 'Email already registered. Login to continue'
            })
        }

        if (userExists && !userExists.active) {
            return res.status(400).json({
                success: false,
                msg: 'Account created but need to activate it. A link sent to your registered mobile no'
            })
        }

        const user = new User({ name, email, password });

        // Crypto is an inbuilt package in nodeJS. Generate a 20 bit activation code.
        crypto.randomBytes(20, async (err, buf) => {
            if (err) {
                console.log('Error using crypto:', err);
                return;
            }

            // Ensure activation link is unique
            user.activeToken = user._id + buf.toString('hex');

            // Set expiration time 24 hrs
            user.activeExpires = Date.now() + 24 * 3600 * 1000;

            const link = process.env.NODE_ENV === 'development' ? `http://localhost:${process.env.PORT}/api/users/active/${user.activeToken}` :
                `${process.env.API_HOST}/api/users/active/${user.activeToken}`;

            // Sending activation mail
            mailer.send({
                to: req.body.email,
                subject: 'Welcome',
                html: `Please click <a href=${link}>here</a> to activate your account`
            })

            // Save user object
            await user.save();

            res.status(200).json({
                success: true,
                msg: `The activation mail has been sent to ${user.email}. Please click the activation link within 24 hours.`
            })

        })
    } catch (error) {
        console.log('Error registering user:', error);
        res.status(500).json({
            success: false,
            msg: 'Server is facing some issues.'
        })
    }
};

const activeToken = async (req, res, next) => {
    try {
        const user = await User.findOne({
            activeToken: req.params.activeToken,
            // activeExpires: { $gt: Date.now() }
        });

        // if invalid activation code
        if (!user) {
            res.status(400).json({
                success: false,
                msg: 'Your activation link is invalid'
            })
        }

        // if user is activated
        if (user.active === true) {
            res.status(200).json({
                success: true,
                msg: 'Your account is already activated. Login to use this app.'
            })
        }

        // if user is not activated
        user.active = true;
        await user.save();

        res.status(200).json({
            success: true,
            msg: 'Activation success'
        })
    } catch (error) {
        console.log('Error finding user:', error);
        next(error)
    }
};



module.exports = {
    registerUser,
    activeToken
};
