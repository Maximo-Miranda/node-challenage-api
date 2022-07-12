// node_module requires
import express from 'express'
// SRC requieres
import {login, register} from '../../controllers/auth.controller.js'

const AuthRoutes = express()

// Login Route
AuthRoutes.post('/login', login)
// Register Route
AuthRoutes.post('/register', register)

export default AuthRoutes