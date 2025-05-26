const request = require('supertest'); // Import Supertest for API testing
const app = require('../index'); // Import the main application file

describe('Report API Endpoints', () => {

    // Test: Fetching a monthly report for a user
    it('should return a monthly report for a user', async () => {
        const response = await request(app)
            .get('/api/report')
            .query({ id: '1', year: '2025', month: '2' }); // Requesting a report for February 2025

        // Validate response
        expect(response.status).toBe(200); // Ensure status is 200 (OK)
        expect(response.body).toHaveProperty('costs'); // Response should contain a 'costs' field
        expect(response.body.costs).toBeInstanceOf(Array); // 'costs' should be an array
    });

    // Test: Monthly report when no data is found
    it('should return an empty costs array if no data is found', async () => {
        const response = await request(app)
            .get('/api/report')
            .query({ id: '1', year: '2024', month: '12' }); // Requesting a report for a user with no data

        // Validate response
        expect(response.status).toBe(200); // Ensure status is 200 (OK)
        expect(response.body).toHaveProperty('costs'); // Response should contain a 'costs' field
        expect(response.body.costs.length).toBe(5); // 'costs' should be an array of 5 empty arrays.

    });

    // Test: Requesting a report without required parameters
    it('should return 400 if parameters are missing', async () => {
        const response = await request(app)
            .get('/api/report'); // No query parameters provided

        // Validate response
        expect(response.status).toBe(400); // Ensure status is 400 (Bad Request)
        expect(response.body.error).toBe('Bad Request'); // Ensure error message is returned
    });

});
