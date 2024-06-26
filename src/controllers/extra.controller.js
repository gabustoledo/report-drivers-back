const Extra = require("../models/Extra");
const User = require("../models/User");
const Money = require("../models/Money");

const extraCtrl = {};

//Comparer Function
function GetSortOrder(prop) {
  return function (a, b) {
    if (a[prop] > b[prop]) {
      return 1;
    } else if (a[prop] < b[prop]) {
      return -1;
    }
    return 0;
  };
}

// Create and save extra.
extraCtrl.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create extra
  const newExtra = new Extra({
    amount: req.body.amount,
    date: req.body.date,
    comment: req.body.comment,
    photo: req.body.photo,
    id_driver: req.user._id,
    active: true,
  });

  // Create money
  const newMoney = new Money({
    amount: req.body.amount,
    date: req.body.date,
    detail: "extra",
    type: "egreso",
    id_driver: req.user._id,
    active: true,
  });
  // Save extra
  newExtra
    .save()
    .then((data) => {
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Extra.",
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

// Get all extra.
extraCtrl.getExtra = async (req, res) => {
  const id_driver = req.user._id;
  const extras = await Extra.find({ id_driver });
  const extrasSort = extras.sort(GetSortOrder("date")).reverse();
  res.status(200).send(extrasSort);
};

// Get one extra by id.
extraCtrl.getExtraId = (req, res) => {
  const _id = req.params.id;
  const id_driver = req.user._id;

  Extra.find({ _id, id_driver })
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Extra with id " + id });
      else if (data === [])
        res.status(404).send({ message: "Not found Extra with id " + id });
      else res.status(200).send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Extra with id=" + id });
    });
};

// Update a extra by id
extraCtrl.updateExtra = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Extra.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Extra with id=${id}. Maybe Product was not found!`,
        });
      } else {
        res.status(204).send({ message: "Extra was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Extra with id=" + id,
      });
    });
};

// Delete a extra
extraCtrl.deleteExtra = (req, res) => {
  const id = req.params.id;

  Extra.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Extra with id=${id}. Maybe Extra was not found!`,
        });
      } else {
        res.status(204).send({
          message: "Extra was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Extra with id=" + id,
      });
    });
};

// Get all extra.
extraCtrl.getExtraByUser = async (req, res) => {
  const employer = req.user._id;
  const users = await User.find({ employer });
  const newUsers = users.map((user) => {
    return {
      _id: user._id,
      name: user.name,
    };
  });

  let extras = [];

  for (let i = 0; i < newUsers.length; i++) {
    const id_driver = newUsers[i]._id;
    const extra = await Extra.find({ id_driver });
    const extraSort = extra.sort(GetSortOrder("date")).reverse();
    const aux = {
      _id: newUsers[i]._id,
      name: newUsers[i].name,
      extras: extraSort,
    };
    extras.push(aux);
  }

  res.status(200).send(extras);
};

// Export all function controller.
module.exports = extraCtrl;
