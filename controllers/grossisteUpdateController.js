// controllers/grossisteController.js
/*const grossisteUpdate = require('../modules/updateGrossiste');

class GrossisteController {
  // Other controller methods would be here...
  
  async updateGrossiste(req, res) {
    try {
      const { id } = req.params;
      const grossisteData = req.body;
      
      // Basic validation
      if (!grossisteData.name || !grossisteData.username) {
        return res.status(400).json({ 
          success: false, 
          message: 'Name and username are required' 
        });
      }
      
      // Update the grossiste
      const updatedGrossiste = await grossisteUpdate.update(id, grossisteData);
      
      res.status(200).json(updatedGrossiste);
    } catch (error) {
      console.error('Error in updateGrossiste controller:', error);
      
      if (error.message === 'Grossiste not found') {
        return res.status(404).json({ 
          success: false, 
          message: 'Grossiste not found'
        });
      }
      
      res.status(500).json({ 
        success: false, 
        message: `Failed to update grossiste: ${error.message}`
      });
    }
  }
}

module.exports = new GrossisteController();
*/
const GrossisteUpdate = require('../modules/updateGrossiste');

class GrossisteController {
  updateGrossiste(req, res) {
    const { id } = req.params;
    const grossisteData = req.body;

    // Basic validation
    if (!grossisteData.name || !grossisteData.username) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name and username are required' 
      });
    }

    // Update the grossiste using callbacks
    GrossisteUpdate.update(id, grossisteData, (err, updatedGrossiste) => {
      if (err) {
        console.error('Error in updateGrossiste controller:', err);

        if (err.message === 'Grossiste not found') {
          return res.status(404).json({ 
            success: false, 
            message: 'Grossiste not found'
          });
        }

        return res.status(500).json({ 
          success: false, 
          message: `Failed to update grossiste: ${err.message}`
        });
      }

      res.status(200).json({ success: true, data: updatedGrossiste });
    });
  }
}

module.exports = new GrossisteController();
