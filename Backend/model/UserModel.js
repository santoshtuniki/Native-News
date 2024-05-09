const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        avatar: {
            type: String,
            default: 'https://ibb.co/5YPr38P',
        },
        active: {
            type: Boolean,
            default: false,
        },
        activeToken: String,
        activeExpires: Date,
    },
    {
        timestamps: true
    }
)

UserSchema.pre('save', async function (next) {
    // only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
        return next();
    }

    // generate a salt
    const salt = await bcrypt.genSalt(10);

    // hash the password using our new salt
    this.password = await bcrypt.hash(this.password, salt);
    next();

})

UserSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', UserSchema);
