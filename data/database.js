// Importing "dotenv" package to read ".env" file holding environment variables
require("dotenv").config()

// Importing "mongodb" package to have MongoDB connections
const mongodb = require("mongodb")

// Reading environment variables from ".env" file
const userID = process.env.USER_ID
const password = process.env.PASSWORD

// const MongoClient = mongodb.MongoClient

const uriMongoDB = `mongodb+srv://${userID}:${password}@cluster0.v60qg.mongodb.net/?retryWrites=true&w=majority`

let database

async function connectToDatabase() {
    const client = await mongodb.MongoClient.connect(uriMongoDB)
    database = client.db("online-shop")
}

function getDB() {
    if (!database) {
        throw new Error("You must connect first!")
    }
    return database
}

module.exports = {
    connectToDatabase: connectToDatabase,
    getDb: getDB
}