// Create "router" object using Router function on express module.
const router = require("express").Router()

const cartController = require("../controllers/cart.controller")

router.post("/items", cartController.addCartItem)

module.exports = router