const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((db) => console.log("DB is conected"))
  .catch((err) => console.log(err));
