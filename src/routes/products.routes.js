const { Router } = require("express");
const { getAllProducts } = require("../controllers/products.controllers");

const router = Router();

router.get("/products", getAllProducts);

module.exports = router;
