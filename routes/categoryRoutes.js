const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const authController = require("../controllers/authcontroller");
//Use Router
router.use(authController.verifyToken);
router.get("/", categoryController.getCategories);
router.post("/new", categoryController.createCategory);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);
router.get("/:id", categoryController.getCategoryById);

module.exports = router;
