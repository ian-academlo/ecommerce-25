"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cars.belongsTo(models.Users, { foreignKey: "userId" });
      Cars.belongsToMany(models.Products, { through: "ProductsInCar" });
    }
  }
  Cars.init(
    {
      userId: DataTypes.INTEGER,
      total: DataTypes.REAL,
    },
    {
      sequelize,
      modelName: "Cars",
      timestamps: false,
    }
  );
  return Cars;
};
