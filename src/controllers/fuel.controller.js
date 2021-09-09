const Fuel = require("../models/Fuel");

const fuelCtrl = {};

// Create and save fuel.
fuelCtrl.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create fuel
  const newFuel = new Fuel({
    amount: req.body.amount,
    date: req.body.date,
    mileage: req.body.mileage,
    liters: req.body.liters,
    photo: req.body.photo,
    id_driver: req.user._id,
    active: true,
  });

  // Save fuel
  newFuel
    .save()
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Fuel.",
      });
    });
};

// Get all fuel.
fuelCtrl.getFuel = async (req, res) => {
  const id_driver = req.user._id;
  const fuels = await Fuel.find({ id_driver });
  res.status(200).send(fuels);
};

// Get one fuel by id.
fuelCtrl.getFuelId = (req, res) => {
  const _id = req.params.id;
  const id_driver = req.user._id;

  Fuel.find({ _id, id_driver })
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Fuel with id " + id });
      else if (data === [])
        res.status(404).send({ message: "Not found Fuel with id " + id });    
      else res.status(200).send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Fuel with id=" + id });
    });
};


// Update a fuel by id
fuelCtrl.updateFuel = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Fuel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Fuel with id=${id}. Maybe Product was not found!`,
        });
      } else {
        res.status(204).send({ message: "Fuel was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Fuel with id=" + id,
      });
    });
};


// Delete a fuel
fuelCtrl.deleteFuel = (req, res) => {
  const id = req.params.id;

  Fuel.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Fuel with id=${id}. Maybe Fuel was not found!`,
        });
      } else {
        res.status(204).send({
          message: "Fuel was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Fuel with id=" + id,
      });
    });
};

// Export all function controller.
module.exports = fuelCtrl;
