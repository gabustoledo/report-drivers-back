const Router = require("express");
const router = Router();
const tollCtrl = require("../controllers/toll.controller");
const {
  isAuthenticated,
  isDev,
} = require("../middlewares/auth.middleware");

// Create
router.post("/", isAuthenticated, tollCtrl.create);

// Get all extras
router.get("/", isAuthenticated, tollCtrl.getToll);

// Get one extra
router.get("/:id", isAuthenticated, tollCtrl.getTollId);

// Update extra
router.put("/:id", isAuthenticated, tollCtrl.updateToll);

// Delete extra
router.delete("/:id", isAuthenticated, isDev, tollCtrl.deleteToll);

module.exports = router;
