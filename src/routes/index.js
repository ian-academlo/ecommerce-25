const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("../swagger.json");
const userRoutes = require("./user.routes");
const productsRoutes = require("./products.routes");
const carRoutes = require("./cars.routes");

const apiRoutes = (app) => {
  app.use(userRoutes);
  app.use(productsRoutes);
  app.use(carRoutes);
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
};

module.exports = apiRoutes;
