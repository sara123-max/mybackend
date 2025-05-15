/*const SelectSalePoint = require('../../modules/grossiste/salePointSelect');

const SelectSalePointController = {
  getAllSalePoints: (_req, res) => {
    SelectSalePoint.getAllSalePoints((err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json({ error: "Database query failed" });
      }

      const salePointsWithImages = results.map((salePoint) => {
        // Handle image field separately (keep as null if null)
        const image = salePoint.image 
          ? `data:image/jpeg;base64,${Buffer.from(salePoint.image).toString('base64')}`
          : null;

        // Return new object with empty strings for null values (except image)
        return {
          id: salePoint.id,
          image: image, // keep as null if null
          username: salePoint.username || '',
          password: salePoint.password || '',
          name: salePoint.name || '',
          email: salePoint.email || '',
          telephone_number: salePoint.telephone_number || '',
          role: salePoint.role || '',
          region: salePoint.region || '',
          address: salePoint.address || '',
          store_hours: salePoint.store_hours || '' // empty string instead of null
        };
      });

      res.status(200).json(salePointsWithImages);
    });
  },
};

module.exports = SelectSalePointController;*/
const SelectSalePoint = require('../../modules/grossiste/salePointSelect');

const SelectSalePointController = {
  getAllSalePoints: (req, res) => {
    const grossisteId = req.user.userId; 
    console.log('grossisteId (from controller):', grossisteId);

    SelectSalePoint.getAllSalePoints(grossisteId, (err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json({ error: "Database query failed" });
      }

      const salePointsWithImages = results.map((salePoint) => {
        const image = salePoint.image 
          ? `data:image/jpeg;base64,${Buffer.from(salePoint.image).toString('base64')}`
          : null;

        return {
          id: salePoint.id,
          image: image,
          username: salePoint.username || '',
          password: salePoint.password || '', // Note: Consider removing password from response
          name: salePoint.name || '',
          email: salePoint.email || '',
          telephone_number: salePoint.telephone_number || '',
          role: salePoint.role || '',
          region: salePoint.region || '',
          address: salePoint.address || '',
          store_hours: salePoint.store_hours || '',
          grossiste_id: salePoint.grossiste_id || null
        };
      });

      res.status(200).json(salePointsWithImages);
    });
  },
};

module.exports = SelectSalePointController;