const Router = require("express");
const router = Router();
const viaticCtrl = require("../controllers/viatic.controller");
const {
  isAuthenticated,
  isDev,
} = require("../middlewares/auth.middleware");

// Create
router.post("/", isAuthenticated, viaticCtrl.create);

// Get all viatic
router.get("/", isAuthenticated, viaticCtrl.getViatic);

// Get viatic all my drivers
router.get("/mydrivers", isAuthenticated, viaticCtrl.getViaticByUser);

// Get one viatic
router.get("/:id", isAuthenticated, viaticCtrl.getViaticId);

// Update viatic
router.put("/:id", isAuthenticated, viaticCtrl.updateViatic);

// Delete viatic
router.delete("/:id", isAuthenticated, isDev, viaticCtrl.deleteViatic);

module.exports = router;
