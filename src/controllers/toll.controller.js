const Products = require("../models/Products");

const productsCtrl = {};

// Create and save product.
productsCtrl.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create product
  const newProduct = new Products(req.body);

  // Save user
  newProduct
    .save()
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Product.",
      });
    });
};

// Get all products.
productsCtrl.getProducts = async (req, res) => {
  const products = await Products.find();
  res.status(200).send(products);
};

// Get one product by id.
productsCtrl.getProduct = (req, res) => {
  const id = req.params.id;

  Products.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Product with id " + id });
      else res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Product with id=" + id });
    });
};


// Update a product by id
productsCtrl.updateProduct = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Products.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found!`,
        });
      } else {
        res.status(204).send({ message: "Product was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Product with id=" + id,
      });
    });
};


// Delete a product
productsCtrl.deleteProduct = (req, res) => {
  const id = req.params.id;

  Products.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`,
        });
      } else {
        res.status(204).send({
          message: "Product was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id,
      });
    });
};

// Export all function controller.
module.exports = productsCtrl;
