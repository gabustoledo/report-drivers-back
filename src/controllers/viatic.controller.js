const Viatic = require("../models/Viatic");
const User = require("../models/User");
const Money = require("../models/Money");

const viaticCtrl = {};

// Create and save viatic.
viaticCtrl.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create viatic
  const newViatic = new Viatic({
    amount: req.body.amount,
    day: req.body.day,
    id_driver: req.user._id,
    active: true,
  });

  // Create money
  const newMoney = new Money({
    amount: req.body.amount,
    date: req.body.day,
    detail: "viatico",
    type: "egreso",
    id_driver: req.user._id,
    active: true,
  });

  // Save viatic
  newViatic
    .save()
    .then((data) => {
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Viatic.",
      });
    });

  // Save money
  newMoney
    .save()
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Money.",
      });
    });
};

// Get all viatic.
viaticCtrl.getViatic = async (req, res) => {
  const id_driver = req.user._id;
  const viatic = await Viatic.find({ id_driver });
  res.status(200).send(viatic);
};

// Get one viatic by id.
viaticCtrl.getViaticId = (req, res) => {
  const _id = req.params.id;
  const id_driver = req.user._id;

  Viatic.find({ _id, id_driver })
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Viatic with id " + id });
      else if (data === [])
        res.status(404).send({ message: "Not found Viatic with id " + id });
      else res.status(200).send(data[0]);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Viatic with id=" + id });
    });
};

// Update a viatic by id
viaticCtrl.updateViatic = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Viatic.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Viatic with id=${id}. Maybe Viatic was not found!`,
        });
      } else {
        res.status(204).send({ message: "Viatic was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Viatic with id=" + id,
      });
    });
};

// Delete a viatic
viaticCtrl.deleteViatic = (req, res) => {
  const id = req.params.id;

  Viatic.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Viatic with id=${id}. Maybe Viatic was not found!`,
        });
      } else {
        res.status(204).send({
          message: "Viatic was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Viatic with id=" + id,
      });
    });
};

// Get all toll.
viaticCtrl.getViaticByUser = async (req, res) => {
  const employer = req.user._id;
  const users = await User.find({ employer });
  const newUsers = users.map((user) => {
    return {
      _id: user._id,
      name: user.name,
    };
  });

  let viatics = [];

  for (let i = 0; i < newUsers.length; i++) {
    const id_driver = newUsers[i]._id;
    const viatic = await Viatic.find({ id_driver });
    const aux = {
      _id: newUsers[i]._id,
      name: newUsers[i].name,
      viatics: viatic,
    };
    viatics.push(aux);
  }

  res.status(200).send(viatics);
};

// Export all function controller.
module.exports = viaticCtrl;
