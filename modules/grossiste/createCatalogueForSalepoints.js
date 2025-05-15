const db = require('../../db');

class CreateCatalogueForSalepoints {
  static createCatalogue(name, productIds, salepointIds, grossisteId, callback) {
    db.beginTransaction((err) => {
      if (err) return callback(err);

      // 1. Verify all salepoints belong to this grossiste
      const placeholders = salepointIds.map(() => '?').join(',');
      db.query(
        `SELECT user_id FROM sale_point 
         WHERE user_id IN (${placeholders}) AND grossiste_id = ?`,
        [...salepointIds, grossisteId],
        (err, results) => {
          if (err) return db.rollback(() => callback(err));
          
          if (results.length !== salepointIds.length) {
            return db.rollback(() => callback(new Error('Some salepoints do not belong to you or do not exist')));
          }

          // 2. Insert the catalogue
          db.query(
            'INSERT INTO catalogue (name) VALUES (?)',
            [name],
            (err, catalogueResult) => {
              if (err) return db.rollback(() => callback(err));

              const catalogueId = catalogueResult.insertId;

              // 3. Link catalogue to salepoints
              const salepointValues = salepointIds.map(spId => [catalogueId, spId]);
              db.query(
                'INSERT INTO catalogue_salepoint (catalogue_id, salepoint_id) VALUES ?',
                [salepointValues],
                (err) => {
                  if (err) return db.rollback(() => callback(err));

                  // 4. Link products if provided
                  if (productIds?.length > 0) {
                    const productValues = productIds.map(pId => [catalogueId, pId]);
                    db.query(
                      'INSERT INTO catalogue_product (catalogue_id, product_id) VALUES ?',
                      [productValues],
                      (err) => {
                        if (err) return db.rollback(() => callback(err));
                        db.commit(() => callback(null, catalogueId));
                      }
                    );
                  } else {
                    db.commit(() => callback(null, catalogueId));
                  }
                }
              );
            }
          );
        }
      );
    });
  }
}

module.exports = CreateCatalogueForSalepoints;