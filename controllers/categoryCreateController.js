
/*
const { createCategory} = require("../modules/createCategory");

const CreateCategoryController = {
  addCategory: (req, res) => {
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);

    const { name, subcategories } = req.body;
    const image = req.file ? req.file.buffer : null;

    // Input validation
    if (!name || !image) {
      return res.status(400).json({ message: "Category name and image are required" });
    }

    if (!subcategories || !JSON.parse(subcategories).length) {
      return res.status(400).json({ message: "At least one subcategory is required" });
    }

    const subcategoriesArray = JSON.parse(subcategories);

    createCategory(name, image, subcategoriesArray, (err, result) => {
      if (err) {
        console.error("Error creating category:", err);
        return res.status(500).json({ 
          message: "Database error",
          error: err.message 
        });
      }
      
      res.status(201).json({ 
        message: "Category created with subcategories",
        categoryId: result.categoryId,
        subcategoriesCount: result.subCount
      });
    });
  }
};

module.exports = CreateCategoryController;*/
const { createCategory, getCategoryById } = require("../modules/createCategory");

const CreateCategoryController = {
  addCategory: (req, res) => {
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);

    const { name, subcategories } = req.body;
    const image = req.file ? req.file.buffer : null;

    // Input validation
    if (!name || !image) {
      return res.status(400).json({ message: "Category name and image are required" });
    }

    if (!subcategories || !JSON.parse(subcategories).length) {
      return res.status(400).json({ message: "At least one subcategory is required" });
    }

    const subcategoriesArray = JSON.parse(subcategories);

    createCategory(name, image, subcategoriesArray, (err, result) => {
      if (err) {
        console.error("Error creating category:", err);
        return res.status(500).json({ 
          message: "Database error",
          error: err.message 
        });
      }
      
      // Fetch the complete category object after creation
      getCategoryById(result.categoryId, (err, category) => {
        if (err) {
          console.error("Error fetching created category:", err);
          return res.status(201).json({ 
            message: "Category created but unable to fetch details",
            categoryId: result.categoryId
          });
        }
        
        // Return complete category object
        res.status(201).json({
          message: "Category created successfully",
          category: {
            id: category.id,
            name: category.name,
            image: category.image_url || category.image,
            subCategories: category.subcategories || [],
            createdAt: category.created_at,
            updatedAt: category.updated_at
          }
        });
      });
    });
  }
};

module.exports = CreateCategoryController;