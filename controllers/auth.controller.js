const User = require("../models/user.model")
const authUtil = require("../util/authentication")
const validation = require("../util/validation")
const sessionFlash = require("../util/session-flash")

function getSignUp(req, res) {
    res.render("customer/auth/signup")
}

async function signUp(req, res, next) {
    const enteredData = {
        email: req.body.email,
        password: req.body.password,
        fullname: req.body.fullname,
        street: req.body.street,
        postal: req.body.postal,
        city: req.body.city,
    }
    if (
        !validation.userDetailsAreValid(
            req.body.email,
            req.body.password,
            req.body.fullname,
            req.body.street,
            req.body.postal,
            req.body.city
        ) || !validation.emailIsConfirmed(
            req.body.email,
            req.body["confirm-email"]
        )
    ) {
        sessionFlash.flashDataToSession(req, {
            errorMessage: `Please check your input.
            Password must be at least 6 characters long.
            Postal Code must be 6 characters long.`,
            ...enteredData

        }, function () {
            res.redirect("/signup")
        })

        return
    }

    const user = new User(
        req.body.email,
        req.body.password,
        req.body.fullname,
        req.body.street,
        req.body.postal,
        req.body.city
    )

    try {
        const existsAlready = await user.existsAlready()

        if (existsAlready) {
            sessionFlash.flashDataToSession(req, {
                errorMessage: "User exists already!",
                ...enteredData
            }, function () {
                res.redirect("/signup")
            })

            return
        }
        await user.signUp()
    } catch (error) {
        next(error)
        return
    }

    res.redirect("/login")
}

function getLogIn(req, res) {
    res.render("customer/auth/login")
}

async function logIn(req, res, next) {
    const user = new User(req.body.email, req.body.password)
    let existingUser
    try {
        existingUser = await user.getUserWithSameEmail()
    } catch (error) {
        next(error)
        return
    }

    const sessionErrorData = {
        errorMessage: "Invalid credentials - Please double check your email and password",
        email: user.email,
        password: user.password
    }

    if (!existingUser) {
        sessionFlash.flashDataToSession(req, sessionErrorData, function () {
            res.redirect("/login")
        })

        return
    }

    const passwordIsCorrect = await user.hasMatchingPassword(existingUser.password)

    if (!passwordIsCorrect) {
        sessionFlash.flashDataToSession(req, sessionErrorData, function () {
            res.redirect("/login")
        })
        return
    }

    authUtil.createUserSession(req, existingUser, function () {
        res.redirect("/")
    })

}

function logOut(req, res) {
    authUtil.destroyUserAuthSession(req)
    res.redirect("/login")
}

module.exports = {
    getSignUp: getSignUp,
    getLogIn: getLogIn,
    signUp: signUp,
    logIn: logIn,
    logOut: logOut
}