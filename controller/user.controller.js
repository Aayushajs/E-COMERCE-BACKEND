import User from "../model/user.model.js"; // Importing the User model from the model directory
import bcryptjs from "bcryptjs"; // Importing bcryptjs library for password hashing and comparison

// Function to handle user signup
export const signup = async (req, res) => {
    try {
        // Extracting user details from the request body
        const { fullname, email, password } = req.body;

        // Checking if a user with the provided email already exists in the database
        const user = await User.findOne({ email });
        if (user) {
            // If user already exists, send a 400 status response with an appropriate message
            return res.status(400).json({ message: "User already exists" });
        }

        // Hashing the user's password for secure storage in the database
        const hashPassword = await bcryptjs.hash(password, 10);

        // Creating a new user document with the hashed password and role set to "user"
        const createdUser = new User({
            fullname: fullname,
            email: email,
            password: hashPassword,
            rool: "user",
        });

        // Saving the new user document in the database
        await createdUser.save();

        // Sending a successful response with user details (excluding password)
        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: createdUser._id,
                fullname: createdUser.fullname,
                email: createdUser.email,
                rool: createdUser.rool,
            },
        });
    } catch (error) {
        // Logging the error and sending a 500 status response for internal server errors
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Function to handle user login
export const login = async (req, res) => {
    try {
        // Extracting login details from the request body
        const { email, password } = req.body;

        // Checking if a user with the provided email exists in the database
        const user = await User.findOne({ email });

        // Verifying the provided password against the stored hashed password
        const isMatch = user && (await bcryptjs.compare(password, user.password));

        if (!user || !isMatch) {
            // If user does not exist or password does not match, send a 400 status response
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Sending a successful response with user details (excluding password)
        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
            },
        });
    } catch (error) {
        // Logging the error and sending a 500 status response for internal server errors
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Function to handle admin signup
export const adminSignup = async (req, res) => {
    try {
        // Extracting admin details from the request body
        const { fullname, email, password } = req.body;

        // Checking if an admin with the provided email already exists in the database
        const user = await User.findOne({ email });
        if (user) {
            // If admin already exists, send a 400 status response with an appropriate message
            return res.status(400).json({ message: "User already exists" });
        }

        // Hashing the admin's password for secure storage in the database
        const hashPassword = await bcryptjs.hash(password, 10);

        // Creating a new admin document with the hashed password and role set to "admin"
        const createdUser = new User({
            fullname: fullname,
            email: email,
            rool: "admin",
            password: hashPassword,
        });

        // Saving the new admin document in the database
        await createdUser.save();

        // Sending a successful response with admin details (excluding password)
        res.status(201).json({
            message: "Admin created",
            successfully: true,
            user: {
                _id: createdUser._id,
                fullname: createdUser.fullname,
                email: createdUser.email,
                rool: createdUser.rool,
            },
        });
    } catch (error) {
        // Logging the error and sending a 500 status response for internal server errors
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Function to handle admin login
export const adminLogin = async (req, res) => {
    try {
        // Extracting admin login details from the request body
        const { email, password } = req.body;

        // Setting the role for admin login verification
        const rool = "admin";

        // Checking if an admin with the provided email exists in the database
        const user = await User.findOne({ email });

        // Verifying the provided password against the stored hashed password
        const isMatch = user && (await bcryptjs.compare(password, user.password));

        if (!user || !isMatch) {
            // If admin does not exist or password does not match, send a 400 status response
            return res.status(400).json({ message: "Invalid username or password" });
        }

        if (user.rool !== rool) {
            // If the role is not "admin", send a 400 status response
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Sending a successful response with admin details (excluding password)
        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                rool: user.rool,
            },
        });
    } catch (error) {
        // Logging the error and sending a 500 status response for internal server errors
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
