const { Router } = require("express");
const { addProductToCar } = require("../controllers/car.controllers");

const router = Router();

router.post("/products/car/:id", addProductToCar);

module.exports = router;
