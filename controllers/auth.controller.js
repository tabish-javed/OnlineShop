
function getSignUp(req, res) {
    res.render("customer/auth/signup")
}

function signUp(req, res) {

}

function getLogIn(req, res) {
    //...
}


module.exports = {
    getSignUp: getSignUp,
    getLogIn: getLogIn,
    signUp: signUp,
}