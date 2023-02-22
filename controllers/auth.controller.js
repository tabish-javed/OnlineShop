const User = require("../models/user.model")
const authUtil = require("../util/authentication")

function getSignUp(req, res) {
    res.render("customer/auth/signup")
}

async function signUp(req, res) {
    const user = new User(
        req.body.email,
        req.body.password,
        req.body.fullname,
        req.body.street,
        req.body.postal,
        req.body.city
    )

    await user.signUp()

    res.redirect("/login")
}

function getLogIn(req, res) {
    res.render("customer/auth/login")
}

async function logIn(req, res) {
    const user = new User(req.body.email, req.body.password)
    const existingUser = await user.getUserWithSameEmail()

    if (!existingUser) {
        res.redirect("/login")
        return
    }

    const passwordIsCorrect = await user.hasMatchingPassword(existingUser.password)

    if (!passwordIsCorrect) {
        res.redirect("/login")
        return
    }

    authUtil.createUserSession(req, existingUser, function () {
        res.redirect("/")
    })

}



module.exports = {
    getSignUp: getSignUp,
    getLogIn: getLogIn,
    signUp: signUp,
    logIn: logIn
}