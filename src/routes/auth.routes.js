const Router = require("express");
const authCtrl = require("../controllers/auth.controller");
const { isAuthenticated, isAdmin } = require("../middlewares/auth.middleware");
const router = Router();

router.post("/login", authCtrl.login);

router.post("/register", isAuthenticated, isAdmin, authCtrl.register);

module.exports = router;
