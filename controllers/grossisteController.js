/*// Import your Grossiste model if necessary
const Grossiste = require('../modules/grossiste');  // Correct the path if needed

// Define the controller functions
const grossisteController = {
    createGrossiste: (req, res) => {
        const userData = req.body; // Get user data from request body

        Grossiste.createGrossiste(userData, (err, result) => {
            if (err) {
                console.error("Error creating grossiste:", err);
                return res.status(500).json({ error: "Failed to create grossiste" });
            }
            res.status(201).json({ message: "Grossiste created successfully", data: result });
        });
    }
};

// Export the controller properly
module.exports = grossisteController;
*/
/*const Grossiste = require('../modules/grossiste'); // Import the model

const grossisteController = {
    createGrossiste: (req, res) => {
        const userData = req.body; // Get user data from request body
        const image = req.file ? req.file.buffer : null; // Get image as binary (buffer)

        Grossiste.createGrossiste(userData, image, (err, result) => {
            if (err) {
                console.error("Error creating grossiste:", err);
                return res.status(500).json({ error: "Failed to create grossiste" });
            }
            res.status(201).json({ message: "Grossiste created successfully", data: result });
        });
    }
};

module.exports = grossisteController;*/
const fs = require("fs");
const path = require("path");
const Grossiste = require("../modules/grossiste"); // Import the model

const grossisteController = {
    createGrossiste: (req, res) => {
        const userData = req.body; // Get user data from request body
        let image = req.file ? req.file.buffer : null; // Get image as binary (buffer)

        // If no image is uploaded, use the default anonymous.png image
        if (!image) {
            const imagePath = path.join(__dirname, "..", "public", "images", "anonymous.png");
            image = fs.readFileSync(imagePath); // Read default image as binary
        }

        Grossiste.createGrossiste(userData, image, (err, result) => {
            if (err) {
                console.error("Error creating grossiste:", err);
                return res.status(500).json({ error: "Failed to create grossiste" });
            }
            res.status(201).json({ message: "Grossiste created successfully", data: result });
        });
    }
};

module.exports = grossisteController;


/*When a grossiste is successfully created, your backend returns a response with:

Status code 201 (Created)
A JSON object containing:

A message field with "Grossiste created successfully"
A data field containing the result returned from Grossiste.createGrossiste()
*/