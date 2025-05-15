/*const PointVenteUpdate = require('../../modules/grossiste/PointVenteUpdate');

class PointVenteUpdateController {
  updatePointVente(req, res) {
    const { id } = req.params;
    const pointVenteData = req.body;

    // Basic validation
    if (!pointVenteData.name || !pointVenteData.username || !pointVenteData.store_hours) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, username and store hours are required' 
      });
    }

    PointVenteUpdate.update(id, pointVenteData, (err, updatedPointVente) => {
      if (err) {
        console.error('Error in updatePointVente controller:', err);

        if (err.message === 'Point de vente not found') {
          return res.status(404).json({ 
            success: false, 
            message: 'Point de vente not found'
          });
        }

        return res.status(500).json({ 
          success: false, 
          message: `Failed to update point de vente: ${err.message}`
        });
      }

      res.status(200).json({ 
        success: true, 
        data: updatedPointVente 
      });
    });
  }
}

module.exports = new PointVenteUpdateController();*/
const PointVenteUpdate = require('../../modules/grossiste/PointVenteUpdate');

class PointVenteUpdateController {
  updatePointVente(req, res) {
    const { id } = req.params;
    const pointVenteData = req.body;
    
    // Handle image upload if file was provided
    if (req.file) {
      // Store binary buffer directly
      pointVenteData.image = req.file.buffer;
    }

    // Basic validation
    if (!pointVenteData.name || !pointVenteData.username || !pointVenteData.store_hours) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, username and store hours are required' 
      });
    }

    PointVenteUpdate.update(id, pointVenteData, (err, updatedPointVente) => {
      if (err) {
        console.error('Error in updatePointVente controller:', err);

        if (err.message === 'Point de vente not found') {
          return res.status(404).json({ 
            success: false, 
            message: 'Point de vente not found'
          });
        }

        return res.status(500).json({ 
          success: false, 
          message: `Failed to update point de vente: ${err.message}`
        });
      }

      res.status(200).json({ 
        success: true, 
        data: updatedPointVente 
      });
    });
  }
}

module.exports = new PointVenteUpdateController();