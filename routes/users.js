const express = require('express'); // Import the Express framework
const router = express.Router(); // Create an Express router instance
const User = require('../models/user'); // Import the User model
const Cost = require('../models/cost'); // Import the Cost model

// Route: Get user details by ID
router.get('/:id', async (req, res) => {
    try {
        const userId = req.params.id.trim(); // Remove leading and trailing spaces from the ID

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
