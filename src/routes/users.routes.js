const Router = require("express");
const router = Router();
const {
  isAuthenticated,
  isAdmin,
  isDev,
} = require("../middlewares/auth.middleware");
const usersCtrl = require("../controllers/users.controller");

// Create
//router.post("/", usersCtrl.create);

// Get all users
router.get("/", isAuthenticated, isAdmin, usersCtrl.getUsers);

// Get one user
// router.get("/:id", isAuthenticated, isAdmin, usersCtrl.getUser); // Talves no se necesite en un futuro, pero dejarlo por siacaso.

// Update user
// router.put("/:id", isAuthenticated, isAdmin, usersCtrl.updateUser); // No se si deje modificar el usuario, en ese caso lo hare manualmente yo si solo lo usara mi papa.

// Delete user
// router.delete("/:id", isAuthenticated, isDev, usersCtrl.deleteUser); // No estara disponible para nadie, solo para mi.

module.exports = router;
