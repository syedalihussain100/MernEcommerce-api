const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  LogoutUser,
  forgetPassword,
  RestPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isAutenticatedUser, authorizeRoles } = require("../middleware/Auth");

// register routes

router.route(`/register`).post(registerUser);
router.route(`/login`).post(loginUser);
router.route(`/logout`).get(LogoutUser);
router.route(`/forget/password`).post(forgetPassword);
router.route(`/password/reset/:token`).put(RestPassword);
router.route(`/password/update`).put(isAutenticatedUser, updatePassword);
// user details
router.route(`/me`).get(isAutenticatedUser, getUserDetails);
router.route(`/me/update`).put(isAutenticatedUser, updateProfile);
router
  .route(`/admin/users`)
  .get(isAutenticatedUser, authorizeRoles("admin"), getAllUser);

router
  .route(`/admin/user/:id`)
  .get(isAutenticatedUser, authorizeRoles("admin"), getSingleUser)
  .put(isAutenticatedUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAutenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
