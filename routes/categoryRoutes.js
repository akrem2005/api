const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const authController = require("../controllers/authcontroller");
//Use Router
router.get("/", authController.verifyToken, categoryController.getCategories);
router.post(
  "/new",
  authController.verifyToken,
  authController.verifyTokenAndAdmin,
  categoryController.createCategory
);
router.put(
  "/:id",
  authController.verifyToken,
  authController.verifyTokenAndAdmin,
  categoryController.updateCategory
);
router.delete(
  "/:id",
  authController.verifyToken,
  authController.verifyTokenAndAdmin,
  categoryController.deleteCategory
);
router.get(
  "/:id",
  authController.verifyToken,
  categoryController.getCategoryById
);

module.exports = router;
