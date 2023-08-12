const { Op } = require("sequelize");
const { Products } = require("../models");

const getAllProducts = async (req, res, next) => {
  try {
    // pedir todos los productos al modelo Products
    const products = await Products.findAll({
      where: {
        availableQty: {
          [Op.gt]: 0,
        },
      },
    });
    res.json(products);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
};
