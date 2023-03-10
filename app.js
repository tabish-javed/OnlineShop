// import inbuilt modules
const path = require("path")

// import third party modules
const express = require("express")
const csurf = require("csurf")
const expressSession = require("express-session")

// import code outsourced files
const createSessionConfig = require("./config/session")
const db = require("./data/database")
const addCsrfTokenMiddleware = require("./middleware/csrf-token")
const errorHandlerMiddleware = require("./middleware/error-handler")
const checkAuthStatusMiddleware = require("./middleware/check-auth")
const protectRoutesMiddleware = require("./middleware/protect-routes")
const cartMiddleware = require("./middleware/cart")
const updateCartPricesMiddleware = require("./middleware/update-cart-prices")
const notFoundMiddleware = require("./middleware/not-found")

const authRoutes = require("./routes/auth.routes")
const productsRoutes = require("./routes/products.routes")
const baseRoutes = require("./routes/base.routes")
const adminRoutes = require("./routes/admin.routes")
const cartRoutes = require("./routes/cart.route")
const ordersRoutes = require("./routes/orders.routes")

// setup app object by calling express function
const app = express()

//=== SETUP EJS VIEW ENGINE ===|
// setup app option for rendering views using "ejs" module
app.set("view engine", "ejs")
// setup second app option to define path where views folder exists
app.set("views", path.join(__dirname, "views"))

//=== SETUP MIDDLEWARE FOR STATIC CONTENT ===|
app.use(express.static("public"))
app.use("/products/assets", express.static("product-data"))
//=== SETUP MIDDLEWARE TO RECEIVE DATA ATTACHED WITH INCOMING REQUESTS ===|
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//=== SETUP SESSION CONFIGURATION ===|
const sessionConfig = createSessionConfig()
app.use(expressSession(sessionConfig))

//=== SETUP CSRF MIDDLEWARE ===|
app.use(csurf())

app.use(cartMiddleware)
app.use(updateCartPricesMiddleware)

app.use(addCsrfTokenMiddleware)
app.use(checkAuthStatusMiddleware)

app.use(baseRoutes)
app.use(authRoutes)
app.use(productsRoutes)
app.use("/cart", cartRoutes)

app.use("/orders", protectRoutesMiddleware, ordersRoutes)
app.use("/admin", protectRoutesMiddleware, adminRoutes)

app.use(notFoundMiddleware)

app.use(errorHandlerMiddleware)

db.connectToDatabase()
    .then(function () {
        app.listen(3000)
    }).catch(function (error) {
        console.log("Failed to connect to the database!")
        console.log(error)
    })