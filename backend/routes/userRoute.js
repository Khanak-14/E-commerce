const express = require("express");
const {
  registerUser,
  loginUser,
  logOutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUsers,
  getSingleUsers,
  updateUserRole,
  deleteUser,
} = require("../controller/userController");
const { isAuthUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logOutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthUser, getUserDetails);
router.route("/password/update").put(isAuthUser, updatePassword);
router.route("/me/update").put(isAuthUser, updateProfile);

router
  .route("/admin/users")
  .get(isAuthUser, authorizeRoles("admin"), getAllUsers);
router
  .route("/admin/user/:id")
  .get(isAuthUser, authorizeRoles("admin"), getSingleUsers)
  .put(isAuthUser, authorizeRoles("admin"), updateUserRole)
  .delete(isAuthUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
