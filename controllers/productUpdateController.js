/*const UpdateProduct = require('../modules/updateProduct');

class ProductUpdateController {
  updateProduct(req, res) {
    const { id } = req.params;
    
    // Process data similar to create controller
    const productData = {
      ...req.body,
      image: req.file ? req.file.buffer : req.body.image, // Handle both file upload and existing image
      category_id: parseInt(req.body.category_id),
      subcategory_id: parseInt(req.body.subcategory_id),
      price: parseFloat(req.body.price),
      stock_quantity: req.body.stock_quantity ? parseInt(req.body.stock_quantity) : null,
      discount_price: req.body.discount_price ? parseFloat(req.body.discount_price) : null,
      expiration_date: req.body.expiration_date || null,
      supplier_id: req.body.supplier_id ? parseInt(req.body.supplier_id) : null,
      rating: req.body.rating ? parseFloat(req.body.rating) : 0.00
    };

    // Optional: Add validation similar to create
    if (!productData.name || !productData.price || 
        !productData.category_id || !productData.subcategory_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    UpdateProduct.update(id, productData, (err, updatedProduct) => {
      if (err) {
        console.error('Error in updateProduct controller:', err);

        if (err.message === 'Product not found') {
          return res.status(404).json({ 
            success: false, 
            message: 'Product not found'
          });
        }

        return res.status(500).json({ 
          success: false, 
          message: 'Failed to update product',
          details: err.message
        });
      }

      // Convert image to base64 for response if it exists
      const responseProduct = updatedProduct.image 
        ? { ...updatedProduct, image: updatedProduct.image.toString('base64') }
        : updatedProduct;

      res.status(200).json({ 
        success: true,
        message: 'Product updated successfully',
        product: responseProduct
      });
    });
  }
}

module.exports = new ProductUpdateController();*/
const UpdateProduct = require('../modules/updateProduct');
//const { uploadToCloudinary } = require('../services/cloudinaryService'); // Optional for cloud storage
class ProductUpdateController {
    async updateProduct(req, res) {
  try {
    const { id } = req.params;
    let productData = req.body;
    
    // Handle file upload if present
    if (req.file) {
       //option1
        // If storing buffer in DB instead of path, use:
         productData.image = req.file.buffer;
      
      // Option 2: Upload to aCloudinary/S3
     // const uploadResult = await uploadToCloudinary(req.file.buffer);
     // productData.image = uploadResult.secure_url;
    } else if (!productData.image) {
      // If no new image and no image in body, keep existing image
      const existingProduct = await UpdateProduct.findById(id, true); // Now returns Buffer
      productData.image = existingProduct.image;
    }


    // Convert string values to proper types
    productData = {
      ...productData,
      category_id: parseInt(req.body.category_id),
      subcategory_id: parseInt(req.body.subcategory_id),
      price: parseFloat(req.body.price),
      stock_quantity: req.body.stock_quantity ? parseInt(req.body.stock_quantity) : null,
      discount_price: req.body.discount_price ? parseFloat(req.body.discount_price) : null,
      expiration_date: req.body.expiration_date || null,
      supplier_id: req.body.supplier_id ? parseInt(req.body.supplier_id) : null,
      rating: req.body.rating ? parseFloat(req.body.rating) : 0.00
    };

    const updatedProduct = await UpdateProduct.update(id, productData);
    res.status(200).json({
      success: true,
      product: updatedProduct
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}
}

module.exports = new ProductUpdateController();