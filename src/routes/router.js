// node_modules requires
import express from 'express'
import AuthRoutes from './auth/auth.routes.js'
import ProductRoutes from './product/product.routes.js'

const router = express()

router.use(AuthRoutes)
router.use(ProductRoutes)

export default router