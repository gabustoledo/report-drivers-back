const Router = require("express");
const router = Router();
const productsCtrl = require("../controllers/products.controller");
const {
  isAuthenticated,
  isAdmin,
  isDev,
} = require("../middlewares/auth.middleware");

// Create
router.post("/", isAuthenticated, isAdmin, productsCtrl.create);

// Get all products
router.get("/", isAuthenticated, isAdmin, productsCtrl.getProducts);

// Get one product
router.get("/:id", isAuthenticated, isAdmin, productsCtrl.getProduct);

// Update product
router.put("/:id", isAuthenticated, isAdmin, productsCtrl.updateProduct);

// Delete product
router.delete("/:id", isAuthenticated, isDev, productsCtrl.deleteProduct);

module.exports = router;
