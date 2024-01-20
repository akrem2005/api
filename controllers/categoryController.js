// File: controllers/categoryController.js

const Category = require("../models/Category");

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve categories" });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
      image: req.body.image,
      type: req.body.type,
    });
    await category.save();
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Failed to create category" });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    if (req.body.name) {
      category.name = req.body.name;
    }
    if (req.body.image) {
      category.image = req.body.image;
    }
    if (req.body.type) {
      category.type = req.body.type;
    }

    await category.save();
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Failed to update category" });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    await category.remove();
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete category" });
  }
};

exports.getCategoryByType = async (req, res) => {
  try {
    const { type } = req.params;
    const category = await Category.findOne({ type });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve category" });
  }
};
