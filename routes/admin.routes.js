// Create "router" object using Router function on express module.
const router = require("express").Router()

const adminController = require("../controllers/admin.controller")

router.get("/products", adminController.getProducts)

router.get("/products/new", adminController.getNewProduct)

module.exports = router