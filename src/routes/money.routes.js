const Router = require("express");
const router = Router();
const moneyCtrl = require("../controllers/money.controller");
const {
  isAuthenticated,
  isDev,
} = require("../middlewares/auth.middleware");

// Create
router.post("/", isAuthenticated, moneyCtrl.create);

// Create
router.post("/byuser", isAuthenticated, moneyCtrl.createByUser);

// Get all fuel
router.get("/", isAuthenticated, moneyCtrl.getMoney);

// Get fuel all my drivers
router.get("/mydrivers", isAuthenticated, moneyCtrl.getMoneyByUser);

// Get one fuel
router.get("/:id", isAuthenticated, moneyCtrl.getMoneyId);

// Update fuel
router.put("/:id", isAuthenticated, moneyCtrl.updateMoney);

// Delete fuel
router.delete("/:id", isAuthenticated, isDev, moneyCtrl.deleteMoney);

module.exports = router;