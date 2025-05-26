const express = require("express"); // Import the Express framework
const mongoose = require("mongoose"); // Import Mongoose for MongoDB interactions
const bodyParser = require("body-parser"); // Import Body-Parser to handle JSON requests
require("dotenv").config(); // Load environment variables from a .env file

const app = express(); // Create an Express application

app.use(bodyParser.json()); // Enable JSON request body parsing

// Connect to MongoDB using the connection string from environment variables
mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000, // Timeout for server selection set to 5 seconds
})
    .then(() => console.log("Connected to MongoDB")) // Log success message if connected
    .catch((err) => console.error("Failed to connect to MongoDB", err)); // Log error if connection fails

// Import route handlers
const usersRoutes = require("./routes/users");
const costsRoutes = require("./routes/costs");
const aboutRoutes = require("./routes/about");

// Define API routes
app.use("/api/users", usersRoutes); // Routes for user-related operations
app.use("/api", costsRoutes); // Routes for cost-related operations
app.use("/api", aboutRoutes); // Route for team/about information

// Define the port, using the environment variable if available, otherwise default to 3000
const PORT = process.env.PORT || 3000;

// Start the server and listen for incoming requests
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export the app instance for use in testing or external modules
module.exports = app;
