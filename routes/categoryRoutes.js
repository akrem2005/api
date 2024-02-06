const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const authController = require("../controllers/authcontroller");

router.get("/", authController.verifyToken, categoryController.getCategories);
router.post("/new", authController.isAdmin, categoryController.createCategory);
router.put("/:id", authController.isAdmin, categoryController.updateCategory);
router.delete(
  "/:id",
  authController.isAdmin,
  categoryController.deleteCategory
);
router.get(
  "/:id",
  authController.verifyToken,
  categoryController.getCategoryById
);

module.exports = router;
