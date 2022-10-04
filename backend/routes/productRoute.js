const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllproducts,
  productUpdate,
  productgetId,
  productDelete,
  createProductReview,
  getAllReviews,
  deleteReview,
  getAdminProducts,
} = require("../controllers/productController");
const { isAutenticatedUser, authorizeRoles } = require("../middleware/Auth");

// product create
router
  .route(`/admin/products/new`)
  .post(isAutenticatedUser, authorizeRoles("admin"), createProduct);

// product get
router.route(`/products`).get(getAllproducts);

// Admin product route
router
  .route(`/admin/products`)
  .get(isAutenticatedUser, authorizeRoles("admin"), getAdminProducts);

// product update  or product delete
router
  .route(`/admin/product/:id`)
  .put(isAutenticatedUser, authorizeRoles("admin"), productUpdate)
  .delete(isAutenticatedUser, authorizeRoles("admin"), productDelete);

// productbyid

router.route(`/product/:id`).get(productgetId);

// review

router.route(`/review`).put(isAutenticatedUser, createProductReview);

router
  .route(`/review`)
  .get(getAllReviews)
  .delete(isAutenticatedUser, deleteReview);

module.exports = router;
