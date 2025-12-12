import { Router } from 'express'
import { getProductsController, getProductController, createProductController, updateProductController, deleteProductController } from './product.controller.js'
import { verifyToken as authMiddleware } from '../../middlewares/authMiddleware.js'

const router = Router()

router.get('/', getProductsController)
router.get('/:id', getProductController)
router.post('/', authMiddleware, createProductController)


router.post('/create', authMiddleware, createProductController)

router.put('/:id', authMiddleware, updateProductController)
router.delete('/:id', authMiddleware, deleteProductController)

export default router
