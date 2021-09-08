const Router = require("express");
const router = Router();
const extraCtrl = require("../controllers/extra.controller");
const {
  isAuthenticated,
  isAdmin,
  isDev,
} = require("../middlewares/auth.middleware");

// Create
router.post("/", isAuthenticated, isAdmin, extraCtrl.create);

// Get all extras
router.get("/", isAuthenticated, isAdmin, extraCtrl.getExtra);

// Get one extra
router.get("/:id", isAuthenticated, isAdmin, extraCtrl.getExtra);

// Update extra
router.put("/:id", isAuthenticated, isAdmin, extraCtrl.updateExtra);

// Delete extra
router.delete("/:id", isAuthenticated, isDev, extraCtrl.deleteExtra);

module.exports = router;
