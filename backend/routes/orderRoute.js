const express = require("express");
const router = express.Router();
const { isAutenticatedUser, authorizeRoles } = require("../middleware/Auth");
const {
  newOrder,
  getSingleOrder,
  myOrder,
  getAllOrders,
  updateOrdersStatus,
  deleteOrderStatus,
} = require("../controllers/orderController");

router.route(`/order/new`).post(isAutenticatedUser, newOrder);

router.route(`/order/:id`).get(isAutenticatedUser, getSingleOrder);

router.route(`/orders/me`).get(isAutenticatedUser, myOrder);

router
  .route(`/admin/orders`)
  .get(isAutenticatedUser, authorizeRoles("admin"), getAllOrders);

router
  .route(`/admin/order/:id`)
  .put(isAutenticatedUser, authorizeRoles("admin"), updateOrdersStatus)
  .delete(isAutenticatedUser, authorizeRoles("admin"), deleteOrderStatus);
module.exports = router;
