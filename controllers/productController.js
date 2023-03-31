const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

// Create Prouct
const createProduct = asyncHandler(async (req, res) => {
    const { name, sku, category, quantity, price, description } = req.body;
  
    //   Validation
    if (!name || !category || !quantity || !price || !description) {
      res.status(400);
      throw new Error("Please fill in all fields");
    }
  
    // Handle Image upload
    let fileData = {};
    if (req.file) {
      // Save image to cloudinary
      let uploadedFile;
      try {
        uploadedFile = await cloudinary.uploader.upload(req.file.path, {
          folder: "Pinvent App",
          resource_type: "image",
        });
      } catch (error) {
        res.status(500);
        throw new Error("Image could not be uploaded");
      }
  
      fileData = {
        fileName: req.file.originalname,
        filePath: uploadedFile.secure_url,
        fileType: req.file.mimetype,
        fileSize: fileSizeFormatter(req.file.size, 2),
      };
    }
  
    // Create Product
    const product = await Product.create({
      user: req.user.id,
      name,
      sku,
      category,
      quantity,
      price,
      description,
      image: fileData,
    });
  
    res.status(201).json(product);
  });

  module.exports = {
    createProduct,
  };