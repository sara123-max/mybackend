// modules/createCatalogue.js
const db = require('../db');

class CreateCatalogue {
  static createCatalogueWithProducts(name, productIds, grossisteIds, callback) {
    db.beginTransaction((err) => {
      if (err) return callback(err);

      // 1. Insert the catalogue
      db.query(
        'INSERT INTO catalogue (name) VALUES (?)',
        [name],
        (err, catalogueResult) => {
          if (err) return db.rollback(() => callback(err));

          const catalogueId = catalogueResult.insertId;

          // 2. Insert catalogue-grossiste relationships (if grossisteIds exist)
          if (grossisteIds?.length > 0) {
            const grossisteValues = grossisteIds.map(grossisteId => [catalogueId, grossisteId]);

            db.query(
              'INSERT INTO catalogue_grossiste (catalogue_id, grossiste_user_id) VALUES ?',
              [grossisteValues],
              (err) => {
                if (err) return db.rollback(() => callback(err));

                // 3. Insert catalogue-product relationships (if productIds exist)
                if (productIds?.length > 0) {
                  const productValues = productIds.map(productId => [catalogueId, productId]);

                  db.query(
                    'INSERT INTO catalogue_product (catalogue_id, product_id) VALUES ?',
                    [productValues],
                    (err) => {
                      if (err) return db.rollback(() => callback(err));
                      db.commit((err) => callback(err, catalogueId));
                    }
                  );
                } else {
                  db.commit((err) => callback(err, catalogueId));
                }
              }
            );
          } else {
            // No grossistes assigned? Just commit.
            db.commit((err) => callback(err, catalogueId));
          }
        }
      );
    });
  }
}

module.exports = CreateCatalogue;