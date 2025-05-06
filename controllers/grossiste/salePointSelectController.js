const SelectSalePoint = require('../../modules/grossiste/salePointSelect');

const SelectSalePointController = {
  getAllSalePoints: (_req, res) => {
    SelectSalePoint.getAllSalePoints((err, results) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).json({ error: "Database query failed" });
      }

      const salePointsWithImages = results.map((salePoint) => {
        if (salePoint.image) {
          const base64Image = Buffer.from(salePoint.image).toString('base64');
          return {
            ...salePoint,
            image: `data:image/jpeg;base64,${base64Image}`,
          };
        } else {
          return {
            ...salePoint,
            image: null,
          };
        }
      });

      res.status(200).json(salePointsWithImages);
    });
  },
};

module.exports = SelectSalePointController;