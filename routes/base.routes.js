// Create "router" object using Router function on express module.
const router = require("express").Router()

router.get("/", function (req, res) {
    res.redirect("/products")
})

router.get("/401", function(req, res) {
    res.status(401).render("shared/401")
})

router.get("/403", function(req, res) {
    res.status(403).render("shared/403")
})

module.exports = router