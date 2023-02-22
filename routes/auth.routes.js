// Create "router" object using Router function on express module.
const router = require("express").Router()

// Create authController object by importing code outsourced file
const authController = require("../controllers/auth.controller")

router.get("/signup", authController.getSignUp)

router.post("/signup", authController.signUp)

router.get("/login", authController.getLogIn)

router.post("/login", authController.logIn)

router.post("/logout", authController.logOut)

module.exports = router