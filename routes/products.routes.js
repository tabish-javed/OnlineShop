// Create "router" object using Router function on express module.
const router = require("express").Router()

router.get("/products", function (req, res) {
    res.render("customer/products/all-products")
})

module.exports = router