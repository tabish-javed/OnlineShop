// Create "router" object using Router function on express module.
const router = require("express").Router()

router.get("/", function (req, res) {
    res.redirect("/products")
})

module.exports = router