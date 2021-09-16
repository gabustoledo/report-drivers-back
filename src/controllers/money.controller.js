const Money = require("../models/Money");
const User = require("../models/User");

const moneyCtrl = {};

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

// Create and save money.
moneyCtrl.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create money
  const newMoney = new Money({
    amount: req.body.amount,
    date: req.body.date,
    detail: req.body.detail,
    type: req.body.type,
    id_driver: req.user._id,
    active: true,
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

// Create and save money.
moneyCtrl.createByUser = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create money
  const newMoney = new Money({
    amount: req.body.amount,
    date: req.body.date,
    detail: req.body.detail,
    type: req.body.type,
    id_driver: req.body.id_driver,
    active: true,
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

// Get all money.
moneyCtrl.getMoney = async (req, res) => {
  const id_driver = req.user._id;
  const moneys = await Money.find({ id_driver });
  const moneysSort = moneys.sort(GetSortOrder("date")).reverse();

  let total = 0;
  for (let i = 0; i < moneysSort.length; i++) {
    if (moneysSort[i].type === "ingreso") total += moneysSort[i].amount;
    else total -= moneysSort[i].amount;
  }
  res.status(200).send({ moneys: moneysSort, total: total });
};

// Get one money by id.
moneyCtrl.getMoneyId = (req, res) => {
  const _id = req.params.id;
  const id_driver = req.user._id;

  Money.find({ _id, id_driver })
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Money with id " + id });
      else if (data === [])
        res.status(404).send({ message: "Not found Money with id " + id });
      else res.status(200).send(data[0]);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Money with id=" + id });
    });
};

// Update a money by id
moneyCtrl.updateMoney = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Money.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Money with id=${id}. Maybe Money was not found!`,
        });
      } else {
        res.status(204).send({ message: "Money was updated successfully." });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Money with id=" + id,
      });
    });
};

// Delete a money
moneyCtrl.deleteMoney = (req, res) => {
  const id = req.params.id;

  Money.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Money with id=${id}. Maybe Money was not found!`,
        });
      } else {
        res.status(204).send({
          message: "Money was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Money with id=" + id,
      });
    });
};

// Get all money.
moneyCtrl.getMoneyByUser = async (req, res) => {
  const employer = req.user._id;
  const users = await User.find({ employer });
  const newUsers = users.map((user) => {
    return {
      _id: user._id,
      name: user.name,
    };
  });

  let moneys = [];

  for (let i = 0; i < newUsers.length; i++) {
    const id_driver = newUsers[i]._id;
    const money = await Money.find({ id_driver });
    const moneySort = money.sort(GetSortOrder("date")).reverse();

    let total = 0;
    for (let i = 0; i < moneySort.length; i++) {
      if (moneySort[i].type === "ingreso") total += moneySort[i].amount;
      else total -= moneySort[i].amount;
    }

    const aux = {
      _id: newUsers[i]._id,
      name: newUsers[i].name,
      moneys: moneySort,
      total: total,
    };
    moneys.push(aux);
  }

  res.status(200).send(moneys);
};

// Export all function controller.
module.exports = moneyCtrl;
