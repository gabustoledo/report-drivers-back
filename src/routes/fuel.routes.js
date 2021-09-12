const Router = require("express");
const router = Router();
const fuelCtrl = require("../controllers/fuel.controller");
const {
  isAuthenticated,
  isDev,
} = require("../middlewares/auth.middleware");

// Create
router.post("/", isAuthenticated, fuelCtrl.create);

// Get all fuel
router.get("/", isAuthenticated, fuelCtrl.getFuel);

// Get fuel all my drivers
router.get("/mydrivers", isAuthenticated, fuelCtrl.getFuelByUser);

// Get one fuel
router.get("/:id", isAuthenticated, fuelCtrl.getFuelId);

// Update fuel
router.put("/:id", isAuthenticated, fuelCtrl.updateFuel);

// Delete fuel
router.delete("/:id", isAuthenticated, isDev, fuelCtrl.deleteFuel);

module.exports = router;
