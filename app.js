// import inbuilt modules
const path = require("path")

// import third party modules
const express = require("express")
const csurf = require("csurf")

// import database object
const db = require("./data/database")
// import code outsourced files
const addCsrfTokenMiddleware = require("./middleware/csrf-token")
const authRoutes = require("./routes/auth.routes")

// setup app object by calling express function
const app = express()

//=== SETUP EJS VIEW ENGINE ===|
// setup app option for rendering views using "ejs" module
app.set("view engine", "ejs")
// setup second app option to define path where views folder exists
app.set("views", path.join(__dirname, "views"))

//=== SETUP MIDDLEWARE FOR STATIC CONTENT ===|
app.use(express.static("public"))
//=== SETUP MIDDLEWARE TO RECEIVE DATA ATTACHED WITH INCOMING REQUESTS ===|
app.use(express.urlencoded({ extended: false }))

//=== SETUP CSRF MIDDLEWARE
app.use(csurf())

app.use(addCsrfTokenMiddleware)

app.use(authRoutes)

db.connectToDatabase()
    .then(function () {
        app.listen(3000)
    }).catch(function (error) {
        console.log("Failed to connect to the database!")
        console.log(error)
    })