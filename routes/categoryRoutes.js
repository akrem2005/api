const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const authController = require("../controllers/authcontroller");
//Use Router
router.get("/", authController.verifyToken, categoryController.getCategories);
router.post(
  "/new",
  authController.verifyToken,
  categoryController.createCategory
);
router.put(
  "/:id",
  authController.verifyToken,
  categoryController.updateCategory
);
router.delete(
  "/:id",
  authController.verifyToken,
  categoryController.deleteCategory
);
router.get(
  "/:id",
  authController.verifyToken,
  categoryController.getCategoryById
);

module.exports = router;
