import Product from '../model/product.model.js';

// Get all products
export const getAllProducts = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();

    // Send the list of products with a 200 status code
    res.status(200).json(products);
  } catch (error) {
    // If there's an error, send a 500 status code with an error message
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

// Get a product by ID
export const getProductById = async (req, res) => {
  try {
    // Extract the product ID from the request parameters
    const { id } = req.params;

    // Find the product in the database by its ID
    const product = await Product.findById(id);

    // If no product is found, return a 404 status code with a not found message
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // If the product is found, return it with a 200 status code
    res.status(200).json(product);
  } catch (error) {
    // If there's an error, send a 500 status code with an error message
    res.status(500).json({ message: 'Error fetching product', error });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  try {
    // Extract product details from the request body
    const { title, price, description, category, image, sold, isSale } = req.body;

    // Create a new product instance with the extracted data
    const newProduct = new Product({
      title,
      price,
      description,
      category,
      image,
      sold,
      isSale,
    });

    // Save the new product to the database
    const savedProduct = await newProduct.save();

    // Respond with the saved product and a 201 status code (created)
    res.status(201).json(savedProduct);
  } catch (error) {
    // If there's an error, send a 400 status code with an error message
    res.status(400).json({ message: 'Error creating product', error });
  }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
  try {
    // Extract product ID from the request parameters and update data from the request body
    const { id } = req.params;
    const updates = req.body;

    // If the product is marked as sold and no sale date is provided, set the sale date to the current date
    if (updates.sold === true && !updates.dateOfSale) {
      updates.dateOfSale = new Date();
    }

    // Update the product in the database using the provided ID and updates
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });

    // If the product is not found, return a 404 status code with a not found message
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // If the product is updated, return the updated product with a 200 status code
    res.status(200).json(updatedProduct);
  } catch (error) {
    // If there's an error, send a 400 status code with an error message
    res.status(400).json({ message: 'Error updating product', error });
  }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
  try {
    // Extract the product ID from the request parameters
    const { id } = req.params;

    // Find and delete the product from the database by its ID
    const deletedProduct = await Product.findByIdAndDelete(id);

    // If the product is not found, return a 404 status code with a not found message
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // If the product is deleted, return a success message with a 200 status code
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    // If there's an error, send a 500 status code with an error message
    res.status(500).json({ message: 'Error deleting product', error });
  }
};
