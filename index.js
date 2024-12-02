// Import necessary modules
import express from "express"; // Express framework to create server and handle routes
import mongoose from "mongoose"; // Mongoose to interact with MongoDB
import dotenv from "dotenv"; // dotenv for loading environment variables
import userRoute from "./routes/user.route.js"; // User-related routes
import productRoute from "./routes/product.route.js"; // Product-related routes
import cors from "cors"; // CORS middleware for handling cross-origin requests

// Create an instance of the express app
const app = express();

// Enable CORS (Cross-Origin Resource Sharing) to allow the frontend at http://localhost:3000 to make requests to this server
app.use(cors(
    { origin:  origin: [process.env.FRONTEND_URL_ONE, process.env.FRONTEND_URL_TWO] } // This allows requests only from this URL
));

// Middleware to parse incoming JSON data in request body
app.use(express.json());

// Load environment variables from .env file
dotenv.config();

// Set the port for the server. Default is 4000, or can be set through the environment
const PORT = process.env.PORT || 4000;

// Get the MongoDB URI from environment variables (to connect to MongoDB)
const URI = process.env.MongoDBURI;

// Establish a connection to MongoDB
try {
    // Connect to MongoDB using Mongoose
    mongoose.connect(URI, {
        // Configuration options can be added here if needed (e.g., useNewUrlParser, useUnifiedTopology, etc.)
    });
    console.log("Connected to mongoDB"); // Success message when connection is successful
} catch (error) {
    // If there is an error while connecting to MongoDB, log the error
    console.log("Error: ", error);
}

// Define the routes for the API

// Route for user-related actions (e.g., login, registration)
app.use("/api/v1/user", userRoute);

// Route for product-related actions (e.g., creating, updating, deleting products)
app.use("/api/v1/product", productRoute);

// Start the server on the specified port
app.listen(PORT, () => {
    // Log a message once the server is successfully running
    console.log(`Server is listening on http://localhost:${PORT}`);
});
