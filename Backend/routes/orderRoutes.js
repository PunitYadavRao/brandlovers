import express from 'express';
import { authenticate } from '../middleware/auth.js';
import {
    getUserOrders,
    createUserOrder,
    getUserOrderById
} from '../controllers/orderController.js';

const router = express.Router();

// All order routes require authentication
router.use(authenticate);

/**
 * @route GET /api/orders
 * @description Get logged-in user's orders
 * @query {page, limit}
 * @returns {orders, pagination}
 */
router.get('/', getUserOrders);

/**
 * @route POST /api/orders
 * @description Create order from cart
 * @body {address, paymentMethod}
 * @returns {order}
 */
router.post('/', createUserOrder);

/**
 * @route GET /api/orders/:id
 * @description Get single order by ID (user's own orders only)
 * @param {id} Order ID
 * @returns {order}
 */
router.get('/:id', getUserOrderById);

export default router;
