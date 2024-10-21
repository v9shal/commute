const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,  // Minimum length validation
    },
    bio: {
        type: String,
        required: true,
        maxlength: 500,  // Maximum length for bio
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);  // Email format validation
            },
            message: props => `${props.value} is not a valid email!`
        },
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model
        required: true,
    },
    phone_number: {
        type: String,  // Phone number should be stored as a string
        validate: {
            validator: function (v) {
                return /^\d{10,15}$/.test(v);  // 10-15 digit number validation
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: false,  // Phone number is optional
    }
}, {
    timestamps: true  // Automatically add createdAt and updatedAt fields
});

// Middleware to trim bio and email fields before saving
profileSchema.pre('save', async function (next) {
    this.bio = this.bio.trim();
    this.email = this.email.trim();
    next();
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
