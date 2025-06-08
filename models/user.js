/**
 * @fileoverview Mongoose schema and model for user data.
 * @module models/user
 */

const mongoose = require('mongoose'); // Import Mongoose library for MongoDB interaction

/**
 * @typedef {Object} User
 * @property {number} id - Unique identifier for the user
 * @property {string} first_name - User's first name
 * @property {string} last_name - User's last name
 * @property {Date} birthday - User's date of birth
 * @property {string} marital_status - User's marital status
 */

/**
 * @description Mongoose schema for user data
 * @type {mongoose.Schema}
 */
const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true, // The user ID is mandatory
        unique: true // Ensures that each user has a unique ID
    },
    first_name: {
        type: String,
        required: true // The user's first name is mandatory
    },
    last_name: {
        type: String,
        required: true // The user's last name is mandatory
    },
    birthday: {
        type: Date,
        required: true // The user's birth date is mandatory
    },
    marital_status: {
        type: String,
        required: true // The user's marital status is mandatory
    },
});

/**
 * @description Mongoose model for user data
 * @type {mongoose.Model<User>}
 */
module.exports = mongoose.model('User', userSchema);
