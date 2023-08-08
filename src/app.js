const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const apiRoutes = require("./routes");
const errorRoutes = require("./routes/error.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

apiRoutes(app);

app.get("/", (req, res) => {
  res.json({
    message: "Bienvenido a mi app",
  });
});

errorRoutes(app);

module.exports = app;

// $2b$10$C/i8/EVDWgZokvsLFtGBi.jv9nT2XrrPX1Z9HtTz5k5eAfcwE17sG
