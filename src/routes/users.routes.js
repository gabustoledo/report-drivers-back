const Router = require("express");
const router = Router();
const { isAuthenticated } = require("../middlewares/auth.middleware");
const usersCtrl = require("../controllers/users.controller");

// Create
//router.post("/", usersCtrl.create);

// Get all users
router.get("/", isAuthenticated, usersCtrl.getUsers);

// Get one user
router.get("/:id", isAuthenticated, usersCtrl.getUser);

// Update user
router.put("/:id", isAuthenticated, usersCtrl.updateUser);

// Delete user
router.delete("/:id", isAuthenticated, usersCtrl.deleteUser);

module.exports = router;
