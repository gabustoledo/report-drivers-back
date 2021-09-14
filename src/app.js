// Dependencias
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const compression = require("compression");
const helmet = require("helmet");

// Exportacion de Rutas
const userRouter = require("./routes/users.routes");
const authRouter = require("./routes/auth.routes");
const extraRouter = require("./routes/extra.routes");
const tollRouter = require("./routes/toll.routes");
const fuelRouter = require("./routes/fuel.routes");
const viaticRouter = require("./routes/viatic.routes");
const moneyRouter = require("./routes/money.routes");

const app = express();

require("dotenv").config();
app.set("port", process.env.PORT || 8080);

app.use(cors());
//app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
//app.use(compression());
//app.use(helmet());

// Definicion de rutas de la api
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/extra", extraRouter);
app.use("/api/toll", tollRouter);
app.use("/api/fuel", fuelRouter);
app.use("/api/viatic", viaticRouter);
app.use("/api/money", moneyRouter);

module.exports = app;
