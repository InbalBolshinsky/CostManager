/**
 * @fileoverview Defines route for retrieving user details and total costs.
 * @module routes/users
 */

const express = require('express'); // Import the Express framework
const router = express.Router(); // Create an Express router instance
const User = require('../models/user'); // Import the User model
const Cost = require('../models/cost'); // Import the Cost model

/**
 * @description Retrieves user details and their total costs
 * @route GET /api/users/:id
 * @param {Object} req.params - Route parameters
 * @param {string} req.params.id - User ID to retrieve details for
 * @returns {Object} 200 - User details with total costs
 * @returns {Object} 404 - User not found
 * @returns {Object} 500 - Internal Server Error
 * @returns {string} returns.first_name - User's first name
 * @returns {string} returns.last_name - User's last name
 * @returns {number} returns.id - User's ID
 * @returns {number} returns.total - Total costs for the user
 */
router.get('/:id', async (req, res) => {
    try {
        const userId = req.params.id;

        // Find the user by ID
        const user = await User.findOne({ id: userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Calculate the total cost for the user
        const totalCosts = await Cost.aggregate([
            {
                $match: { userid: userId } // Filter costs by user ID
            },
            {
                $group: {
                    _id: null, // Group all results together
                    total: { $sum: '$sum' } // Sum the 'sum' field across all matched documents
                }
            }
        ]);

        // Extract total cost from aggregation result (default to 0 if no costs exist)
        const total = totalCosts.length > 0 ? totalCosts[0].total : 0;

        // Return the user details along with total cost
        res.json({
            first_name: user.first_name,
            last_name: user.last_name,
            id: user.id,
            total: total
        });

    } catch (err) {
        console.error('Error fetching user details:', err);
        res.status(500).json({ error: 'An error occurred while fetching the user details' });
    }
});

// Export the router to make it available for use in other parts of the application
module.exports = router;
