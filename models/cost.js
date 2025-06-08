/**
 * @fileoverview Mongoose schema and model for cost data.
 * @module models/cost
 */

const mongoose = require('mongoose'); // Import Mongoose library for MongoDB interaction

/**
 * @typedef {Object} Cost
 * @property {string} description - Description of the cost item
 * @property {string} category - Category of the cost (food, health, housing, sport, education, fruit)
 * @property {number} userid - ID of the user who owns this cost
 * @property {number} sum - Amount of the cost
 * @property {Date} date - Date when the cost was created
 */

/**
 * @description Mongoose schema for cost data
 * @type {mongoose.Schema}
 */
const costSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true // The description of the cost is mandatory
    },
    category: {
        type: String,
        required: true, // The category is required
        enum: ['food', 'health', 'housing', 'sport', 'education', 'fruit'],
        // The category must be one of the predefined values
    },
    userid: {
        type: Number,
        required: true // The user ID associated with the cost is required
    },
    sum: {
        type: Number,
        required: true // The cost amount is mandatory
    },
    date: {
        type: Date,
        default: Date.now // If no date is provided, the current date is used by default
    },
});

/**
 * @description Mongoose model for cost data
 * @type {mongoose.Model<Cost>}
 */
module.exports = mongoose.model('Cost', costSchema);
