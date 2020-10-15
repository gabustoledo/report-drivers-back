// Dependencias
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");

// Exportacion de Rutas
const userRouter = require("./routes/users.routes");
const productRouter = require("./routes/products.routes");
const authRouter = require("./routes/auth.routes");

const app = express();

require("dotenv").config();
app.set("port", process.env.PORT || 3000);

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

// Definicion de rutas de la api
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/auth", authRouter);

module.exports = app;
