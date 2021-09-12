const Router = require("express");
const router = Router();
const extraCtrl = require("../controllers/extra.controller");
const {
  isAuthenticated,
  isDev,
} = require("../middlewares/auth.middleware");

// Create
router.post("/", isAuthenticated, extraCtrl.create);

// Get all extras
router.get("/", isAuthenticated, extraCtrl.getExtra);

// Get extra all my drivers
router.get("/mydrivers", isAuthenticated, extraCtrl.getExtraByUser);

// Get one extra
router.get("/:id", isAuthenticated, extraCtrl.getExtraId);

// Update extra
router.put("/:id", isAuthenticated, extraCtrl.updateExtra);

// Delete extra
router.delete("/:id", isAuthenticated, isDev, extraCtrl.deleteExtra);

module.exports = router;
