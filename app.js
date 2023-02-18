// import inbuilt modules
const path = require("path")

// import third party modules
const express = require("express")

// import code outsourced files
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

app.use(authRoutes)

app.listen(3000)