const { Router } = require("express");
const {
  addProductToCar,
  buyProductsInCar,
} = require("../controllers/car.controllers");

const router = Router();

router.post("/products/car/:id", addProductToCar);
router.post("/products/order/", buyProductsInCar);

module.exports = router;
