/*const fs = require("fs");
const path = require("path");
const Grossiste = require('../modules/selectGrossiste'); 
  // Import the model

const SelectGrossisteController = {
  getAllGrossistes: (req, res) => {
    SelectGrossiste.getAllGrossistes((err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database query failed" });
      }

      const grossistesWithImages = results.map((grossiste) => {
        // Check if image exists
        if (grossiste.image) {
          // If image exists in database, convert it to base64 string
          const base64Image = Buffer.from(grossiste.image).toString('base64');
          return {
            ...grossiste,
            image: `data:image/jpeg;base64,${base64Image}`, // Include image as Base64
          };
        } else {
          // If no image, return the default anonymous.png image as Base64
          const imagePath = path.join(__dirname, "public", "images", "anonymous.png");
          const imageBuffer = fs.readFileSync(imagePath);
          const base64Image = Buffer.from(imageBuffer).toString('base64');
          return {
            ...grossiste,
            image: `data:image/png;base64,${base64Image}`, // Send Base64-encoded default image
          };
        }
      });

      res.status(200).json(grossistesWithImages); // Send the list of grossistes with image in Base64
    });
  },
};

module.exports = SelectGrossisteController;
*/
const fs = require("fs");
const path = require("path");
const SelectGrossiste= require('../modules/selectGrossiste');  
  // Import the model

const SelectGrossisteController = {
  getAllGrossistes: (_req, res) => {
    SelectGrossiste.getAllGrossistes((err, results) => {
      if (err) {
        // Print the error in the console for debugging
        console.error("Database query error:", err);

        return res.status(500).json({ error: "Database query failed" });
      }

      const grossistesWithImages = results.map((grossiste) => {
        // Check if image exists
        if (grossiste.image) {
          // If image exists in database, convert it to base64 string
          const base64Image = Buffer.from(grossiste.image).toString('base64');
          return {
            ...grossiste,
            image: `data:image/jpeg;base64,${base64Image}`, // Include image as Base64
          };
        } else {
          // If no image, return the default anonymous.png image as Base64
          const imagePath = path.join(__dirname, "..", "public", "images", "anonymous.png");
//             Go up one folder (controllers -> project root) ────^
          const imageBuffer = fs.readFileSync(imagePath);
          const base64Image = Buffer.from(imageBuffer).toString('base64');
          return {
            ...grossiste,
            image: `data:image/png;base64,${base64Image}`, // Send Base64-encoded default image
          };
        }
      });

      res.status(200).json(grossistesWithImages); // Send the list of grossistes with image in Base64
    });
  },
};

module.exports = SelectGrossisteController;

