const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.getCategories);
router.post("/new", categoryController.createCategory);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);
router.get("/:type", categoryController.getCategoryByType);

module.exports = router;
