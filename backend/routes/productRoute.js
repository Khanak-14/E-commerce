const express = require("express");
const {
 
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
  getAllProduct,
} = require("../controller/productcontroller");
const {isAuthUser, authorizeRoles} = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProduct);
router.route("/admin/products").get(isAuthUser,authorizeRoles("admin"),getAdminProducts);
router.route("/admin/product/new").post(isAuthUser,authorizeRoles("admin"),createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthUser,authorizeRoles("admin"),updateProduct)
  .delete(isAuthUser,authorizeRoles("admin"),deleteProduct)
router.route("/product/:id").get(getProductDetails)

router.route("/review").put(isAuthUser,createProductReview)
router.route("/reviews").get(getProductReviews).delete(deleteReview)

module.exports = router;
