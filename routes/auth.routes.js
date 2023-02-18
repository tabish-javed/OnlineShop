// Create "router" object using Router function on express module.
const router = require("express").Router()

// Create authController object by importing code outsourced file
const authController = require("../controllers/auth.controller")

router.get("/signup", authController.getSignUp)

router.get("/login", authController.getLogIn)

module.exports = router