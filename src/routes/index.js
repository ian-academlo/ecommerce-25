const userRoutes = require("./user.routes");

const apiRoutes = (app) => {
  app.use(userRoutes);
};

module.exports = apiRoutes;
