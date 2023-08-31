const { Router } = require("express");
const {
  addProductToCar,
  buyProductsInCar,
} = require("../controllers/car.controllers");
const authenticate = require("../middlewares/auth.middleware");

const router = Router();

router.post("/products/car/:id", authenticate, addProductToCar);
router.post("/products/order/", buyProductsInCar);

module.exports = router;
