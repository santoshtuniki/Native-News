const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema(
    {
        name: {
            type: 'string',
            required: true,
            trim: true,
        },
        email: {
            type: 'string',
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: 'string',
            required: true,
            trim: true,
        },
        avatar: {
            type: 'string',
            default: 'https://ibb.co/5YPr38P',
        },
    },
    {
        timestamps: true
    }
)

UserSchema.pre('save', async (next) => {
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

UserSchema.methods.comparePassword = async (enteredPassword) => {
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('User', UserSchema);
