const { Op } = require("sequelize");
const { Cars, ProductsInCar } = require("../models");

const addProductToCar = async (req, res, next) => {
  try {
    // por el body debe venir la sig info
    // { productId, quantity, price }
    const carId = req.params.id;
    const { productId, quantity, price } = req.body;

    // quiero que si el producto ya existe en el carrito entonces sume la cantidad y no cree uno nuevo
    // verificar si el carrido con el id  ya tiene un producto con el productoId
    // entonces sumamos - si no existe lo creamos

    const productInCar = await ProductsInCar.findAll({
      where: {
        [Op.and]: [{ carId }, { productId }],
      },
    }); // si el carId y productId
    console.log(productInCar);
    if (productInCar.length < 1) {
      await ProductsInCar.create({ carId, productId, quantity, price });
    }

    if (productInCar.length > 0) {
      await ProductsInCar.increment({ quantity }, { where: { carId } });
    }

    // si agrego un producto
    // debo actualizar el total del carrito
    // multiplico el price * quantity
    await Cars.increment({ total: quantity * price }, { where: { id: carId } });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addProductToCar,
};
