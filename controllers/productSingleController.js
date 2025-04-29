const { getProductById } = require("../modules/selectSingleProduct");

const ProductSingleController = {
  getProductById: (req, res) => {
    const productId = req.params.id;
    
    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required"
      });
    }
    
    getProductById(productId, (err, product) => {
      if (err) {
        console.error("Error fetching product:", err);
        return res.status(err.message === "Product not found" ? 404 : 500).json({
          message: err.message || "Database error",
          error: err.message
        });
      }
      
      res.status(200).json({
        message: "Product retrieved successfully",
        product: product
      });
    });
  }
};

module.exports = ProductSingleController;