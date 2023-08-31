const { Router } = require("express");
const {
  getAllProducts,
  getProductById,
} = require("../controllers/products.controllers");

const router = Router();

router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);

module.exports = router;
