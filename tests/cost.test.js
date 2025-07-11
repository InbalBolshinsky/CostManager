/**
 * @fileoverview Test suite for cost-related API endpoints
 * @module tests/cost
 */

const request = require('supertest'); // Import Supertest for API testing
const app = require('../index'); // Import the main application file

/**
 * @description Test suite for cost-related API endpoints
 */
describe('Cost API Endpoints', () => {

    /**
     * @description Test case for creating a new cost entry
     * @test {POST} /api/add
     */
    it('should create a new cost entry', async () => {
        const newCost = {
            description: 'clean', // Cost description
            category: 'housing', // Cost category
            userid: 1, // User ID
            sum: 200 // Cost amount
        };

        // Send a POST request to create a new cost entry
        const response = await request(app)
            .post('/api/add')
            .send(newCost)
            .set('Content-Type', 'application/json');

        // Validate response
        expect(response.status).toBe(200); // Ensure status is 200 (OK)
        expect(response.body).toHaveProperty('_id'); // Response should contain an '_id' field
        expect(response.body.description).toBe(newCost.description); // Ensure description matches
        expect(response.body.category).toBe(newCost.category); // Ensure category matches
    });

    /**
     * @description Test case for validation of required fields
     * @test {POST} /api/add
     */
    it('should return 400 if a required field is missing', async () => {
        const incompleteCost = {
            description: 'Dinner', // Cost description
            category: 'food', // Cost category
            // Missing 'userid' field
            sum: 100 // Cost amount
        };

        // Send a POST request with incomplete data
        const response = await request(app)
            .post('/api/add')
            .send(incompleteCost)
            .set('Content-Type', 'application/json');

        // Validate response
        expect(response.status).toBe(400); // Ensure status is 400 (Bad Request)
        expect(response.body.error).toBe('Bad Request'); // Ensure error message is returned
    });
});
