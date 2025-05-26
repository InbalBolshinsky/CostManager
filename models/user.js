const mongoose = require('mongoose'); // Import Mongoose library for MongoDB interaction

// Define the schema for the "User" collection
const userSchema = new mongoose.Schema({
    id: {
        type: String,
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

// Export the "User" model, allowing it to be used in other parts of the application
module.exports = mongoose.model('User', userSchema);
