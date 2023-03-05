const expressSession = require("express-session")
const mongoDbStore = require("connect-mongodb-session")
require("dotenv").config()

// Reading environment variables from ".env" file
const userID = process.env.USER_ID
const password = process.env.PASSWORD


const uriMongoDB = `mongodb+srv://${userID}:${password}@cluster0.v60qg.mongodb.net/?retryWrites=true&w=majority`

function createSessionStore() {
    const MongoDBStore = mongoDbStore(expressSession)

    const store = new MongoDBStore({
        uri: uriMongoDB,
        databaseName: "online-shop",
        collection: "sessions",
    })
    return store
}

function createSessionConfig() {
    return {
        secret: "hygqap-syfnoq-Sozby7",
        resave: false,
        saveUninitialized: false,
        store: createSessionStore(),
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
        },
    }
}

module.exports = createSessionConfig