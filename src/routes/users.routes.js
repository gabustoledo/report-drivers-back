const Router = require("express");
const router = Router();

const usersCtrl = require("../controllers/users.controller");

// Create
//router.post("/", usersCtrl.create);

// Get all users
router.get("/", usersCtrl.getUsers);

// Get one user
router.get("/:id", usersCtrl.getUser);

// Update user
router.put("/:id", usersCtrl.updateUser);

// Delete user
router.delete("/:id", usersCtrl.deleteUser);

module.exports = router;
