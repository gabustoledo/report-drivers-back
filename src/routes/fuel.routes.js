const Router = require("express");
const router = Router();
const fuelCtrl = require("../controllers/fuel.controller");
const {
  isAuthenticated,
  isDev,
} = require("../middlewares/auth.middleware");

// Create
router.post("/", isAuthenticated, fuelCtrl.create);

// Get all extras
router.get("/", isAuthenticated, fuelCtrl.getFuel);

// Get one extra
router.get("/:id", isAuthenticated, fuelCtrl.getFuelId);

// Update extra
router.put("/:id", isAuthenticated, fuelCtrl.updateFuel);

// Delete extra
router.delete("/:id", isAuthenticated, isDev, fuelCtrl.deleteFuel);

module.exports = router;
