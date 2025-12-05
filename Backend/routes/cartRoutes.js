import express from 'express';
import { authenticate } from '../middleware/auth.js';
import {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
} from '../controllers/cartController.js';

const router = express.Router();

// All cart routes require authentication
router.use(authenticate);

/**
 * @route GET /api/cart
 * @description Get user's cart with items
 * @returns {cart}
 */
router.get('/', getCart);

/**
 * @route POST /api/cart
 * @description Add item to cart
 * @body {productId, size, quantity}
 * @returns {cartItem}
 */
router.post('/', addToCart);

/**
 * @route PATCH /api/cart/:itemId
 * @description Update cart item quantity or size
 * @param {itemId} Cart item ID
 * @body {quantity, size}
 * @returns {cartItem}
 */
router.patch('/:itemId', updateCartItem);

/**
 * @route DELETE /api/cart/:itemId
 * @description Remove item from cart
 * @param {itemId} Cart item ID
 * @returns {success message}
 */
router.delete('/:itemId', removeFromCart);

/**
 * @route DELETE /api/cart
 * @description Clear entire cart
 * @returns {success message}
 */
router.delete('/', clearCart);

export default router;
