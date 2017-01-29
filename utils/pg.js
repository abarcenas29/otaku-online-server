require('dotenv').config()
const db = require('pg-promise')()

module.exports = db(process.env.DATABASE_URL)
