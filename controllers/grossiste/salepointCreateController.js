const fs = require("fs");
const path = require("path");
const SalePoint = require("../../modules/grossiste/salePointCreate"); // Import the model

const salepointController = {
    createSalePoint: (req, res) => {
        const userData = req.body; // Get user data from request body
        let image = req.file ? req.file.buffer : null; // Get image as binary (buffer)

        // If you want to use a default image when none is provided:
        /* if (!image) {
            const imagePath = path.join(__dirname, "..", "public", "images", "anonymous.png");
            image = fs.readFileSync(imagePath); // Read default image as binary
        }*/

        SalePoint.createSalePoint(userData, image, (err, result) => {
            if (err) {
                console.error("Error creating sale point:", err);
                return res.status(500).json({ error: err.message || "Failed to create sale point" });
            }
            res.status(201).json({ message: "Sale point created successfully", data: result });
        });
    }
};

module.exports = salepointController;