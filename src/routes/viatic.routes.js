const Router = require("express");
const router = Router();
const viaticCtrl = require("../controllers/viatic.controller");
const {
  isAuthenticated,
  isDev,
} = require("../middlewares/auth.middleware");

// Create
router.post("/", isAuthenticated, viaticCtrl.create);

// Get all extras
router.get("/", isAuthenticated, viaticCtrl.getViatic);

// Get one extra
router.get("/:id", isAuthenticated, viaticCtrl.getViaticId);

// Update extra
router.put("/:id", isAuthenticated, viaticCtrl.updateViatic);

// Delete extra
router.delete("/:id", isAuthenticated, isDev, viaticCtrl.deleteViatic);

module.exports = router;
