const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    role: {
        type: String,
        default: "patient",
        enum: ["patient", "derm"]
    },
    phone: {
        type: String,
    },

    firstName: {
        type: String,
    },

    lastName: {
        type: String,
    },

    gender: {
        type: String,
        enum: ['male', 'female']
    },

    dob: {
        type: Date,
    },

    image: {
        type: String,
        default: "no dp",
    },

    salt: {
        type: String
    },

    resetToken: {
        type: String
    },

    resetTokenExpiry: {
        type: Date
    },

    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    }
}, { timestamps: true });

module.exports = model('users', UserSchema);