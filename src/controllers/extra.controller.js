const Extra = require("../models/Extra");

const extraCtrl = {};

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

  // Save extra
  newExtra
    .save()
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Extra.",
      });
    });
};

// Get all extra.
extraCtrl.getExtra = async (req, res) => {
  const id_driver = req.user._id;
  const extras = await Extra.find({ id_driver });
  res.status(200).send(extras);
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

// Export all function controller.
module.exports = extraCtrl;
