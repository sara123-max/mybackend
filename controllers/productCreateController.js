const { createProduct } = require('../modules/createProduct');

const ProductController = {
  createProduct: (req, res) => {
    const productData = {
      ...req.body,
      image: req.file ? req.file.buffer : null, // Keep as Buffer for DB
      category_id: parseInt(req.body.category_id),
      subcategory_id: parseInt(req.body.subcategory_id),
      price: parseFloat(req.body.price),
      stock_quantity: req.body.stock_quantity ? parseInt(req.body.stock_quantity) : null,
      discount_price: req.body.discount_price ? parseFloat(req.body.discount_price) : null,
      expiration_date: req.body.expiration_date || null,
      supplier_id: req.body.supplier_id ? parseInt(req.body.supplier_id) : null,
      rating: req.body.rating ? parseFloat(req.body.rating) : 0.00
    };

    // Validation remains unchanged
    if (!productData.name || !productData.price || 
        !productData.category_id || !productData.subcategory_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    createProduct(productData, (err, result) => {
      if (err) {
        console.error('Product creation error:', err);
        return res.status(500).json({ 
          error: 'Database error',
          details: err.message
        });
      }
      
      // Convert Buffer to Base64 only for the response
      const responseProduct = {
        ...result,
        image: result.image ? result.image.toString('base64') : null
      };
      
      res.status(201).json({
        message: 'Product created successfully',
        product: responseProduct
      });
    });
  }
};

module.exports = ProductController;