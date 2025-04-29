const { getProducts } = require("../modules/selectProduct");

const ProductSelectController = {
    getAllProducts: (req, res) => {
        getProducts((err, products) => {
            if (err) {
                console.error("Error fetching products:", err);
                return res.status(500).json({
                    message: "Database error",
                    error: err.message
                });
            }
            
            res.status(200).json({
                message: "Products retrieved successfully",
                products: products
            });
        });
    }
};

module.exports = ProductSelectController;