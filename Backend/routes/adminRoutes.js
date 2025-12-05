import express from 'express'
import { verifyAdmin } from '../middleware/adminAuth.js'
import {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    updateOrderStatus
} from '../controllers/orderController.js'
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js'

const router = express.Router()

// All routes require admin authentication
router.use(verifyAdmin)

// ==================== ORDER ROUTES ====================

/**
 * @route GET /api/admin/orders
 * @description Get all orders with pagination and filtering
 * @query {page, limit, status, search}
 * @returns {orders, pagination}
 */
router.get('/orders', getAllOrders)

/**
 * @route GET /api/admin/orders/:id
 * @description Get single order by ID
 * @param {id} Order ID
 * @returns {order}
 */
router.get('/orders/:id', getOrderById)

/**
 * @route POST /api/admin/orders
 * @description Create new order
 * @body {userId, items, amount, address, paymentMethod}
 * @returns {order}
 */
router.post('/orders', createOrder)

/**
 * @route PUT /api/admin/orders/:id
 * @description Update order
 * @param {id} Order ID
 * @body {status, payment, address, paymentMethod}
 * @returns {order}
 */
router.put('/orders/:id', updateOrder)

/**
 * @route DELETE /api/admin/orders/:id
 * @description Delete order
 * @param {id} Order ID
 * @returns {success message}
 */
router.delete('/orders/:id', deleteOrder)

/**
 * @route PATCH /api/admin/orders/:id/status
 * @description Update order status
 * @param {id} Order ID
 * @body {status}
 * @returns {order}
 */
router.patch('/orders/:id/status', updateOrderStatus)

// ==================== PRODUCT ROUTES ====================

/**
 * @route GET /api/admin/products
 * @description Get all products with pagination and filtering
 * @query {page, limit, search, category, subCategory, bestseller, sort}
 * @returns {products, pagination}
 */
router.get('/products', getProducts)

/**
 * @route GET /api/admin/products/:id
 * @description Get single product by ID
 * @param {id} Product ID
 * @returns {product}
 */
router.get('/products/:id', getProductById)

/**
 * @route POST /api/admin/products
 * @description Create new product
 * @body {name, description, price, image, category, subCategory, sizes, bestseller}
 * @returns {product}
 */
router.post('/products', createProduct)

/**
 * @route PATCH /api/admin/products/:id
 * @description Update product
 * @param {id} Product ID
 * @body {name, description, price, image, category, subCategory, sizes, bestseller}
 * @returns {product}
 */
router.patch('/products/:id', updateProduct)

/**
 * @route DELETE /api/admin/products/:id
 * @description Delete product
 * @param {id} Product ID
 * @returns {success message}
 */
router.delete('/products/:id', deleteProduct)

export default router
