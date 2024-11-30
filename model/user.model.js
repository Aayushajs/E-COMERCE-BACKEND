import mongoose from "mongoose";

// Define a schema for the User model
const userSchema = mongoose.Schema({
    // Define the 'fullname' field which is a required string
    fullname: {
        type: String,
        required: true,  // The 'fullname' field is mandatory
    },
    
    // Define the 'email' field which is a required string and must be unique
    email: {
        type: String,
        required: true,  // The 'email' field is mandatory
        unique: true,    // Ensure that the email address is unique across all users
    },
    
    // Define the 'password' field which is a required string
    password: {
        type: String,
        required: true,  // The 'password' field is mandatory
    },
    
    // Define the 'rool' field (intended to be 'role') which specifies the user's role
    // Default value is set to 'user', indicating a regular user if not provided
    rool: {
        type: String,
        default: "user",  // Default value for new users is 'user' role
    },
});

// Create a model from the userSchema and name it 'User'
const User = mongoose.model("User", userSchema);

// Export the User model to be used in other parts of the application
export default User;
