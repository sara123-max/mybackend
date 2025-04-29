//the code for this update is that request will contains all fields of product but only image filed
//will  be missing in form data if the client doesnt updted the image of product therefore the exited image will reamin
//if the field is present then the client updates the product and image 
/*explication:
*thz returnBuffer parameter to findById:

When true, keeps the image as a buffer (for internal operations)

When false (default), converts to base64 (for API responses)

*the update flow:

First fetch uses findById(id, true) to get the buffer

Update uses either the new buffer or keeps the existing buffer

Final fetch uses default findById(id) to return base64*/
const pool = require('../db');

class UpdateProduct {
  //add ,returnBuffer = false
  static findById(id, returnBuffer = false) {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
            if (err) return reject(err);
            if (results.length === 0) return resolve(null);
            
            const product = results[0];
            
            // Only convert to base64 if explicitly requested (for final response)
            if (product.image && Buffer.isBuffer(product.image) && !returnBuffer) {
                product.image = product.image.toString('base64');
            }
            
            resolve(product);
        });
    });
}

    static update(id, productData) {
        return new Promise((resolve, reject) => {
            this.findById(id,true)
                .then(existingProduct => {
                    if (!existingProduct) throw new Error('Product not found');

                    // Handle image - keep existing if not updating
                    const imageToUse = productData.image !== undefined 
                        ? productData.image // New image buffer
                        : existingProduct.image; // Existing image (already base64 or buffer)

                    // Prepare query
                    const setClauses = [
                        'name = ?',
                        'price = ?',
                        productData.image !== undefined ? 'image = ?' : null,
                        'category_id = ?',
                        'subcategory_id = ?',
                        'stock_quantity = ?',
                        'brand = ?',
                        'status = ?',
                        'rating = ?',
                        'discount_price = ?',
                        'weight = ?',
                        'dimensions = ?',
                        'color = ?',
                        'description = ?',
                        'expiration_date = ?',
                        'supplier_id = ?',
                        'shipping_details = ?',
                        'updated_at = NOW()'
                    ].filter(Boolean);

                    const query = `
                        UPDATE products 
                        SET ${setClauses.join(', ')}
                        WHERE id = ?
                    `;

                    const values = [
                        productData.name,
                        productData.price,
                        ...(productData.image !== undefined ? [imageToUse] : []),
                        productData.category_id,
                        productData.subcategory_id,
                        productData.stock_quantity,
                        productData.brand,
                        productData.status,
                        productData.rating,
                        productData.discount_price,
                        productData.weight,
                        productData.dimensions,
                        productData.color,
                        productData.description,
                        productData.expiration_date,
                        productData.supplier_id,
                        productData.shipping_details,
                        id
                    ];

                    pool.query(query, values, (err, result) => {
                        if (err) return reject(err);
                        if (result.affectedRows === 0) {
                            return reject(new Error('Failed to update product'));
                        }
                        // Return updated product with base64 image
                        this.findById(id)
                            .then(updatedProduct => resolve(updatedProduct))
                            .catch(reject);
                    });
                })
                .catch(reject);
        });
    }
}

module.exports = UpdateProduct;