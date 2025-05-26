const express = require('express'); // Import the Express framework
const router = express.Router(); // Create an Express router instance
const Cost = require('../models/cost'); // Import the Cost model
//const User = require('../models/user'); // Uncomment if you need to use the User model

// Route: Add a new cost
router.post('/add', async (req, res) => {
    try {
        const { userid, sum, category, description } = req.body;

        // Validate that 'userid' is provided
        if (!userid) {
            return res.status(400).json({
                error: 'Bad Request',
                message: "Missing 'userid' field."
            });
        }

        // Validate that required fields are provided
        if (!sum || !category || !description) {
            return res.status(400).json({
                error: 'Bad Request',
                message: "Missing required fields: 'sum', 'category', or 'description'."
            });
        }

        // Create and save the new cost entry
        const cost = new Cost({ userid, sum, category, description });
        const savedCost = await cost.save();

        // Return a success response with the saved data
        return res.status(200).json(savedCost);

    } catch (err) {
        console.error('Error saving cost:', err);
        res.status(500).json({
            error: 'Internal Server Error',
            message: `An error occurred while saving the cost: ${err.message}`
        });
    }
});

// Route: Get a monthly cost report
router.get('/report', async (req, res) => {
    try {
        const { id, year, month } = req.query;

        // Validate query parameters
        if (!id) {
            return res.status(400).json({
                error: 'Bad Request',
                message: "Missing 'id' query parameter."
            });
        }

        if (!year) {
            return res.status(400).json({
                error: 'Bad Request',
                message: "Missing 'year' query parameter."
            });
        }

        if (!month) {
            return res.status(400).json({
                error: 'Bad Request',
                message: "Missing 'month' query parameter."
            });
        }

        console.log('Query Parameters:', { id, year, month });

        // Define the date range for the given month
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0, 23, 59, 59, 999);

        // Aggregate cost data for the given user and month
        const costs = await Cost.aggregate([
            {
                $match: {
                    userid: id,
                    date: {
                        $gte: startDate,
                        $lt: endDate,
                    },
                },
            },
            {
                $group: {
                    _id: { category: '$category' },
                    items: { $push: { sum: '$sum', description: '$description', day: { $dayOfMonth: '$date' } } }
                },
            },
            {
                $sort: { '_id.category': 1 },
            }
        ]);

        console.log('Aggregation Results:', costs);

        // ✅ List of supported cost categories
        const categories = ["food", "health", "housing", "sport", "education"];

        // Initialize a report structure with all categories
        let report = categories.map(category => ({
            [category]: []
        }));

        // Populate the report with data from the database
        costs.forEach(cost => {
            const category = report.find(r => Object.keys(r)[0] === cost._id.category);
            if (category) {
                category[cost._id.category] = cost.items.map(item => ({
                    sum: item.sum,
                    description: item.description,
                    day: item.day
                }));
            }
        });

        // ✅ Sort the report so that empty categories appear last
        report.sort((a, b) => {
            const aValues = Object.values(a)[0].length;
            const bValues = Object.values(b)[0].length;
            return aValues === 0 ? 1 : bValues === 0 ? -1 : 0;
        });

        // Send the final response with the formatted report
        res.status(200).json({
            userid: parseInt(id),
            year: parseInt(year),
            month: parseInt(month),
            costs: report
        });

    } catch (error) {
        console.error('Error fetching report:', error);
        res.status(500).json({
            error: 'Internal Server Error',
            message: `An error occurred while fetching the report: ${error.message}`
        });
    }
});

// Export the router to make it available for use in other parts of the application
module.exports = router;
