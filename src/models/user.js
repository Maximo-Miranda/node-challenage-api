import { DataTypes } from 'sequelize'
import sequelize from '../database/connection.js'
import Product from './product.js'


const User = sequelize.define('users', {
    firstname: {
        type: DataTypes.STRING,
    },
    lastname: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        isEmail: true,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.ENUM(['BUYER', 'SELLER', 'ADMIN']),
        defaultValue: "BUYER"
    }
})

User.hasMany(Product)

export default User
