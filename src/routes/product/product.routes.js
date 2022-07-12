// node_module requires
import express from 'express'
// SRC requieres
import { store, index } from '../../controllers/product.controller.js'
import auth from '../../middlewares/auth.middleware.js'
import role from '../../middlewares/role.middleware.js'

const ProductRoutes = express()

// Store Route
ProductRoutes.post('/products', [auth, role(['SELLER', 'ADMIN'])], store)
// Index Route
ProductRoutes.get('/products', [auth], index)

export default ProductRoutes