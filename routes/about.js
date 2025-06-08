/**
 * @fileoverview Defines route for retrieving team member information.
 * @module routes/about
 */

const express = require('express'); // Import the Express framework
const router = express.Router(); // Create an Express router instance

/**
 * @description Retrieves information about team members who developed the project
 * @route GET /api/about
 * @returns {Object[]} Array of team member objects
 * @returns {number} returns[].id - Team member's ID
 * @returns {string} returns[].firstname - Team member's first name
 * @returns {string} returns[].lastname - Team member's last name
 * @returns {string} returns[].birthday - Team member's birthday in DD-MM-YYYY format
 * @returns {string} returns[].marital_status - Team member's marital status
 */
router.get('/about', (req, res) => {
    res.json([
        {
            id: 322522673,
            firstname: 'Inbal',
            lastname: 'Bolshinsky',
            birthday: '06-12-2000',
            marital_status: 'single',
        },
        {
            id: 3,
            firstname: 'Yahel',
            lastname: 'Nahari',
            birthday: '25-10-1999',
            marital_status: 'single',
        },
    ]);
});

// Export the router to make it available for use in other parts of the application
module.exports = router;
