
function getSignUp(req, res) {
    res.render("customer/auth/signup")
}


function getLogIn(req, res) {
    //...
}


module.exports = {
    getSignUp: getSignUp,
    getLogIn: getLogIn,
}