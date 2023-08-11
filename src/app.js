const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const apiRoutes = require("./routes");
const errorRoutes = require("./routes/error.routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

apiRoutes(app);

app.use("/avatars", express.static(path.join(__dirname, "../public")));
app.get("/", (req, res) => {
  res.json({
    message: "Bienvenido a mi app",
  });
});

errorRoutes(app);

module.exports = app;
