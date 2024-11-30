// Import necessary modules
import express from "express"; // Import express to create routes and handle HTTP requests
import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controller/product.controller.js"; // Import controller functions for handling product-related actions

// Create a new express Router instance to define routes for product actions
const router = express.Router();

// Define GET route to fetch all products
// When a client sends a GET request to '/', the getAllProducts function from the controller will handle it
router.get("/", getAllProducts);

// Define GET route to fetch a product by its ID
// When a client sends a GET request to '/:id', where 'id' is a placeholder for the product ID, the getProductById function from the controller will handle it
router.get("/:id", getProductById);

// Define POST route to create a new product
// When a client sends a POST request to '/product', the createProduct function from the controller will handle it
router.post("/product", createProduct);

// Define PUT route to update a product by its ID
// When a client sends a PUT request to '/:id', the updateProduct function from the controller will handle it
// The ':id' is a placeholder for the product ID that needs to be updated
router.put("/:id", updateProduct);

// Define DELETE route to delete a product by its ID
// When a client sends a DELETE request to '/:id', the deleteProduct function from the controller will handle it
// The ':id' is a placeholder for the product ID that needs to be deleted
router.delete("/:id", deleteProduct);

// Export the router so it can be used in other parts of the application
export default router;
