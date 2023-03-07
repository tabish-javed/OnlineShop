// Create "router" object using Router function on express module.
const router = require("express").Router()

const productsController = require("../controllers/products.controller")

router.get("/products", productsController.getAllProducts)

router.get("/products/:id", productsController.getProductDetails)

module.exports = router