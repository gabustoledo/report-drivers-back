const Toll = require("../models/Toll");

const tollCtrl = {};

// Create and save extra.
tollCtrl.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create toll
  const newToll = new Toll({
    amount: req.body.amount,
    date: req.body.date,
    name: req.body.name,
    photo: req.body.photo,
    id_driver: req.user._id,
    active: true,
  });

  // Save toll
  newToll
    .save()
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Toll.",
      });
    });
};

// Get all toll.
tollCtrl.getToll = async (req, res) => {
  const id_driver = req.user._id;
  const tolls = await Toll.find({ id_driver });
  res.status(200).send(tolls);
};

// Get one toll by id.
tollCtrl.getTollId = (req, res) => {
  const _id = req.params.id;
  const id_driver = req.user._id;

  Toll.find({ _id, id_driver })
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Toll with id " + id });
      else if (data === [])
        res.status(404).send({ message: "Not found Toll with id " + id });    
      else res.status(200).send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Toll with id=" + id });
    });
};


// Update a toll by id
tollCtrl.updateToll = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Toll.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Toll with id=${id}. Maybe Toll was not found!`,
        });
      } else {
        res.status(204).send({ message: "Toll was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Toll with id=" + id,
      });
    });
};


// Delete a toll
tollCtrl.deleteToll = (req, res) => {
  const id = req.params.id;

  Toll.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Toll with id=${id}. Maybe Toll was not found!`,
        });
      } else {
        res.status(204).send({
          message: "Toll was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Toll with id=" + id,
      });
    });
};

// Export all function controller.
module.exports = tollCtrl;
