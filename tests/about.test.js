const request = require('supertest');
const app = require('../index'); // Import the Express app

describe('About API Endpoint', () => {
    it('should return a list of team members', async () => {
        const response = await request(app).get('/api/about');

        expect(response.status).toBe(200); // Should respond with HTTP 200
        expect(Array.isArray(response.body)).toBe(true); // Should return an array
        expect(response.body.length).toBeGreaterThan(0); // Should contain at least one member

        // Check structure of the first team member
        const member = response.body[0];
        expect(member).toHaveProperty('firstname');
        expect(member).toHaveProperty('lastname');
    });
});
