import { DataTypes } from 'sequelize'
import sequelize from '../database/connection.js'

const Product = sequelize.define('products', {
    name: {
        type: DataTypes.STRING,
    },
    sku: {
        type: DataTypes.STRING
    },
    quantity: {
        type: DataTypes.INTEGER,
    },
    price: {
        type: DataTypes.DECIMAL,
    }
})

export default Product
