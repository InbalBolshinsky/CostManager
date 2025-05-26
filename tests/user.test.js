const request = require('supertest'); // Import Supertest for API testing
const app = require('../index'); // Import the main application file

describe('User API Endpoints', () => {

    // Test: Fetching user details by ID
    it('should return user details by id', async () => {
        const response = await request(app)
            .get('/api/users/1'); // Checking an existing user (ID 1)

        // Validate response
        expect(response.status).toBe(200); // Ensure status is 200 (OK)
        expect(response.body).toHaveProperty('first_name'); // Ensure 'first_name' exists in the response
        expect(response.body.first_name).toBe('John'); // Ensure 'first_name' matches expected value
        expect(response.body).toHaveProperty('total'); // Ensure 'total' field exists in the response
    });

    // Test: Returning an error if the user is not found
    it('should return 404 if user not found', async () => {
        const response = await request(app)
            .get('/api/users/99999'); // Checking a non-existent user (ID 99999)

        // Validate response
        expect(response.status).toBe(404); // Ensure status is 404 (Not Found)
        expect(response.body.error).toBe('User not found'); // Ensure appropriate error message is returned
    });

});
