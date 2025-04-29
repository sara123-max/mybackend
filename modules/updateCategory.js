const pool = require('../db');

class UpdateCategory {
  static findById(id, returnBuffer = false) {
    return new Promise((resolve, reject) => {
      pool.query('SELECT * FROM categories WHERE id = ?', [id], (err, results) => {
        if (err) return reject(err);
        if (results.length === 0) return resolve(null);
        
        const category = results[0];
        
        // Only convert to base64 if explicitly requested (for final response)
        if (category.image && Buffer.isBuffer(category.image) && !returnBuffer) {
          category.image = category.image.toString('base64');
        }
        
        resolve(category);
      });
    });
  }

  static async update(id, categoryData) {
    return new Promise((resolve, reject) => {
      this.findById(id, true)
        .then(existingCategory => {
          if (!existingCategory) throw new Error('Category not found');

          // Handle image - keep existing if not updating
          const imageToUse = categoryData.image !== undefined 
            ? categoryData.image // New image buffer
            : existingCategory.image; // Existing image

          // Prepare query
          const setClauses = [
            'name = ?',
            categoryData.image !== undefined ? 'image = ?' : null,
            'updated_at = NOW()'
          ].filter(Boolean);

          const query = `
            UPDATE categories 
            SET ${setClauses.join(', ')}
            WHERE id = ?
          `;

          const values = [
            categoryData.name,
            ...(categoryData.image !== undefined ? [imageToUse] : []),
            id
          ];

          pool.query(query, values, async (err, result) => {
            if (err) return reject(err);
            if (result.affectedRows === 0) {
              return reject(new Error('Failed to update category'));
            }
            
            // Update subcategories if provided
            if (categoryData.subcategories && categoryData.subcategories.length > 0) {
              try {
                await this.updateSubcategories(id, categoryData.subcategories);
              } catch (subcatError) {
                return reject(subcatError);
              }
            }

            // Return updated category with base64 image
            this.findById(id)
              .then(updatedCategory => resolve(updatedCategory))
              .catch(reject);
          });
        })
        .catch(reject);
    });
  }
// In the updateSubcategories method, replace with this:
static updateSubcategories(categoryId, subcategories) {
  return new Promise((resolve, reject) => {
    const operations = subcategories.map(subcat => {
      return new Promise((resolveSub, rejectSub) => {
        if (!subcat.name) {
          return rejectSub(new Error('Subcategory must have a name'));
        }

        // If ID is provided, try to update existing
        if (subcat.id) {
          pool.query(
            `UPDATE subcategories 
             SET name = ?, updated_at = NOW() 
             WHERE id = ? AND category_id = ?`,
            [subcat.name, subcat.id, categoryId],
            (err, result) => {
              if (err) return rejectSub(err);
              // If no rows affected, the subcategory doesn't exist or doesn't belong
              if (result.affectedRows === 0) {
                // Instead of failing, create new one
                this.createSubcategory(categoryId, subcat.name)
                  .then(resolveSub)
                  .catch(rejectSub);
              } else {
                resolveSub();
              }
            }
          );
        } else {
          // No ID provided, create new subcategory
          this.createSubcategory(categoryId, subcat.name)
            .then(resolveSub)
            .catch(rejectSub);
        }
      });
    });

    Promise.all(operations)
      .then(resolve)
      .catch(reject);
  });
}

// Add this new helper method:
static createSubcategory(categoryId, name) {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO subcategories 
       (name, category_id, status, created_at, updated_at) 
       VALUES (?, ?, 'active', NOW(), NOW())`,
      [name, categoryId],
      (err, result) => {
        if (err) return reject(err);
        resolve();
      }
    );
  });
}
}

module.exports = UpdateCategory;

//Notes:

/* to handle both updating existing categories and managing their subcategories 
(including creating new ones).*/
/* 1.Image Handling:

Buffer/base64 conversion as needed

Optional image updates*/
/*2.Category Updates:

Updates category name

Handles image updates (keeping existing if not provided)

Maintains timestamps automatically*/

/*3.Creates new subcategories when:

No ID is provided

Provided ID doesn't exist

Provided ID doesn't belong to the category

Validates that each subcategory has a name

Sets default values for new subcategories (status='active', timestamps)*/
