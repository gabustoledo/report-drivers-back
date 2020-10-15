const User = require("../models/User");

const usersCtrl = {};

// Create and save user.
// usersCtrl.create = async (req, res) => {
//   // Validate request
//   if (!req.body) {
//     res.status(400).send({ message: "Content can not be empty!" });
//     return;
//   }

//   // Create user
//   const newUser = new User(req.body);

//   // Save user
//   const createdUser = await newUser.save();

//   res.status(200).send(createdUser);
// };

// Get all users.
usersCtrl.getUsers = async (req, res) => {
  const users = await User.find();
  const newUsers = users.map((user) => {
    return {
      _id: user._id,
      name: user.name,
    };
  });
  res.status(200).send(newUsers);
};

// Get one user by id.
usersCtrl.getUser = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found User with id " + id });
      else
        res.status(200).send({
          _id: data._id,
          name: data.name,
        });
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving User with id=" + id });
    });
};

// Update a user by id.
usersCtrl.updateUser = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`,
        });
      } else {
        res.status(204).send({ message: "User was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

// Delete a user by id.
usersCtrl.deleteUser = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      } else {
        res.status(204).send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

// Export all function controller.
module.exports = usersCtrl;
