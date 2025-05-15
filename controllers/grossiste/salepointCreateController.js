/*const fs = require("fs");
const path = require("path");
const SalePoint = require("../../modules/grossiste/salePointCreate"); // Import the model

const salepointController = {
    createSalePoint: (req, res) => {
        const userData = req.body; // Get user data from request body
        let image = req.file ? req.file.buffer : null; // Get image as binary (buffer)

 

        SalePoint.createSalePoint(userData, image, (err, result) => {
            if (err) {
                console.error("Error creating sale point:", err);
                return res.status(500).json({ error: err.message || "Failed to create sale point" });
            }
            res.status(201).json({ message: "Sale point created successfully", data: result });
        });
    }
};

module.exports = salepointController;*/
// controllers/grossiste/salepointCreateController.js
const fs = require("fs");
const path = require("path");
const SalePoint = require("../../modules/grossiste/salePointCreate");

const salepointController = {
    createSalePoint: (req, res) => {
        const userData = req.body;
        let image = req.file ? req.file.buffer : null;
        
        // Get grossiste_id from the authenticated user
        const grossiste_id =req.user.userId; 

        console.log(req.user); // Add this in your controller to verify
        SalePoint.createSalePoint(userData, image, grossiste_id, (err, result) => {
            if (err) {
                console.error("Error creating sale point:", err);
                return res.status(500).json({ error: err.message || "Failed to create sale point" });
            }
            res.status(201).json({ message: "Sale point created successfully", data: result });
        });
    }
};

module.exports = salepointController;