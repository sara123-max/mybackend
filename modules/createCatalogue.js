// modules/createCatalogue.js
/*const db = require('../db');

class CreateCatalogue {
  static createCatalogueWithProducts(name, productIds, callback) {
    // Start transaction
    db.beginTransaction((err) => {
      if (err) return callback(err);

      // 1. Insert the catalogue
      db.query(
        'INSERT INTO catalogue (name) VALUES (?)',
        [name],
        (err, catalogueResult) => {
          if (err) {
            return db.rollback(() => callback(err));
          }

          const catalogueId = catalogueResult.insertId;

          // 2. Insert catalogue-product relationships if productIds exist
          if (productIds && productIds.length > 0) {
            const values = productIds.map(productId => [catalogueId, productId]);
            
            db.query(
              'INSERT INTO catalogue_product (catalogue_id, product_id) VALUES ?',
              [values],
              (err) => {
                if (err) {
                  return db.rollback(() => callback(err));
                }

                // Commit transaction if everything succeeded
                db.commit((err) => {
                  if (err) {
                    return db.rollback(() => callback(err));
                  }
                  callback(null, { id: catalogueId, name, productIds });
                });
              }
            );
          } else {
            // Commit transaction if no products to insert
            db.commit((err) => {
              if (err) {
                return db.rollback(() => callback(err));
              }
              callback(null, { id: catalogueId, name, productIds: [] });
            });
          }
        }
      );
    });
  }
}

module.exports = CreateCatalogue;*/

// modules/createCatalogue.js
const db = require('../db');

class CreateCatalogue {
  static createCatalogueWithProducts(name, productIds, callback) {
    db.beginTransaction((err) => {
      if (err) return callback(err);

      // 1. Insert the catalogue
      db.query(
        'INSERT INTO catalogue (name) VALUES (?)',
        [name],
        (err, catalogueResult) => {
          if (err) {
            return db.rollback(() => callback(err));
          }

          const catalogueId = catalogueResult.insertId;

          // 2. Insert catalogue-product relationships if productIds exist
          if (productIds?.length > 0) {
            const values = productIds.map(productId => [catalogueId, productId]);
            
            db.query(
              'INSERT INTO catalogue_product (catalogue_id, product_id) VALUES ?',
              [values],
              (err) => {
                if (err) {
                  return db.rollback(() => callback(err));
                }

                // Commit transaction if everything succeeded
                db.commit((err) => {
                  if (err) {
                    return db.rollback(() => callback(err));
                  }
                  callback(null, catalogueId); // Just return the ID
                });
              }
            );
          } else {
            // Commit transaction if no products to insert
            db.commit((err) => {
              if (err) {
                return db.rollback(() => callback(err));
              }
              callback(null, catalogueId); // Just return the ID
            });
          }
        }
      );
    });
  }
}

module.exports = CreateCatalogue;