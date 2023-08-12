const userRoutes = require("./user.routes");
const productsRoutes = require("./products.routes");
const carRoutes = require("./cars.routes");

const apiRoutes = (app) => {
  app.use(userRoutes);
  app.use(productsRoutes);
  app.use(carRoutes);
};

module.exports = apiRoutes;
