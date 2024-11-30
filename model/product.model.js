import mongoose from 'mongoose';

// Destructure Schema and model from mongoose for easier usage
const { Schema, model } = mongoose;

// Define the product schema
const productSchema = new Schema(
  {
    // 'title' field to store the product's name, it is required and will trim any spaces around it
    title: {
      type: String,
      required: true,  // 'title' must be provided
      trim: true,      // Removes leading and trailing spaces from the title
    },

    // 'price' field to store the product's price, it is required and should be a positive number
    price: {
      type: Number,
      required: true,  // 'price' must be provided
      min: 0,          // Price cannot be negative
    },

    // 'description' field to store details about the product, it is required and will trim spaces
    description: {
      type: String,
      required: true,  // 'description' must be provided
      trim: true,      // Removes leading and trailing spaces from the description
    },

    // 'category' field to store the product category, it is required
    category: {
      type: String,
      required: true,  // 'category' must be provided
    },

    // 'image' field to store the URL of the product image, it is required
    // The URL must be a valid image URL (either .png, .jpg, .jpeg, .gif, or .webp)
    image: {
      type: String,
      required: true,  // 'image' must be provided
      validate: {  // Custom validation for the image URL format
        validator: function (value) {
          // Regular expression to check if the image URL ends with a valid image format
          return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i.test(value);
        },
        message: 'Invalid image URL',  // Error message if validation fails
      },
    },

    // 'sold' field to indicate if the product has been sold, default is false
    sold: {
      type: Boolean,
      default: false,  // Initially, the product is not sold
    },

    // 'isSale' field to indicate if the product is on sale, default is false
    isSale: {
      type: Boolean,
      default: false,  // Initially, the product is not on sale
    },

    // 'dateOfSale' field to store the date when the product was sold, default is null
    // This will only be set when the product is sold
    dateOfSale: {
      type: Date,
      default: null,  // Initially set to null, to be updated when the product is sold
    },
  },
  {
    timestamps: true, // Automatically adds 'createdAt' and 'updatedAt' fields to track document creation and updates
  }
);

// Create a Mongoose model for the 'Product' schema and export it
export default model('Product', productSchema);
