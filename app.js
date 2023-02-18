// import third party modules
const express = require("express")

// import code outsourced files
const authRoutes = require("./routes/auth.routes")

const app = express()

app.use(authRoutes)

app.listen(3000)