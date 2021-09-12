const Router = require("express");
const router = Router();
const tollCtrl = require("../controllers/toll.controller");
const {
  isAuthenticated,
  isDev,
} = require("../middlewares/auth.middleware");

// Create
router.post("/", isAuthenticated, tollCtrl.create);

// Get all toll
router.get("/", isAuthenticated, tollCtrl.getToll);

// Get toll all my drivers
router.get("/mydrivers", isAuthenticated, tollCtrl.getTollByUser);

// Get one toll
router.get("/:id", isAuthenticated, tollCtrl.getTollId);

// Update toll
router.put("/:id", isAuthenticated, tollCtrl.updateToll);

// Delete toll
router.delete("/:id", isAuthenticated, isDev, tollCtrl.deleteToll);

module.exports = router;
