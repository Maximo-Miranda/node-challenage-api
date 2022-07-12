// node_modules
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
// SRC Imports
import router from './src/routes/router.js'
import "./config.js"
import sequelize from "./src/database/connection.js"
import './src/models/user.js'
import './src/models/product.js'
import run from './src/database/seeder.js'

const main = async () => {
    // Init express instance
    const app = express()

    // Enable cors
    app.use(cors())

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    app.use(bodyParser.json())

    await sequelize.authenticate()
    console.log('Database connection has been established successfully.')

    await sequelize.sync()

    // Running init data for API
    await run()

    // Init routes
    app.use(router)

    // Start app
    app.listen(process.env.PORT, () => console.log(`Server running on port: ${process.env.PORT}`))
}

await main()