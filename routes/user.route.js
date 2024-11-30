// Import necessary modules
import express from "express"; // Import express for creating routes and handling HTTP requests
import { signup, login, adminLogin, adminSignup } from "../controller/user.controller.js"; // Import controller functions for handling user-related actions

// Create a new express Router instance to define routes for user actions
const router = express.Router();

// Define POST route for user signup
// When a user sends a POST request to '/signup', the signup function from the controller will handle it
router.post("/signup", signup);

// Define POST route for user login
// When a user sends a POST request to '/login', the login function from the controller will handle it
router.post("/login", login);

// Define POST route for admin signup
// When an admin sends a POST request to '/admin/signup', the adminSignup function from the controller will handle it
router.post("/admin/signup", adminSignup);

// Define POST route for admin login
// When an admin sends a POST request to '/admin/login', the adminLogin function from the controller will handle it
router.post("/admin/login", adminLogin);

// Export the router so it can be used in other parts of the application
export default router;
