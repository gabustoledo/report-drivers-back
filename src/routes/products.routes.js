const Router = require("express");
const router = Router();
const productsCtrl = require("../controllers/products.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

// Create
router.post("/", isAuthenticated, productsCtrl.create);

// Get all products
router.get("/", isAuthenticated, productsCtrl.getProducts);

// Get one product
router.get("/:id", isAuthenticated, productsCtrl.getProduct);

// Update product
router.put("/:id", isAuthenticated, productsCtrl.updateProduct);

// Delete product
router.delete("/:id", isAuthenticated, productsCtrl.deleteProduct);

module.exports = router;
