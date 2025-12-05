import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get user's cart with items
export const getCart = async (req, res) => {
    try {
        const userId = req.user.userId;

        let cart = await prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                price: true,
                                image: true,
                                category: true,
                                subCategory: true
                            }
                        }
                    }
                }
            }
        });

        // Create cart if doesn't exist
        if (!cart) {
            cart = await prisma.cart.create({
                data: { userId },
                include: {
                    items: {
                        include: {
                            product: {
                                select: {
                                    id: true,
                                    name: true,
                                    price: true,
                                    image: true,
                                    category: true,
                                    subCategory: true
                                }
                            }
                        }
                    }
                }
            });
        }

        res.json({
            success: true,
            data: cart
        });
    } catch (error) {
        console.error('Error fetching cart:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch cart'
        });
    }
};

// Add item to cart
export const addToCart = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { productId, size, quantity = 1 } = req.body;

        if (!productId || !size) {
            return res.status(400).json({
                success: false,
                message: 'Product ID and size are required'
            });
        }

        // Verify product exists
        const product = await prisma.product.findUnique({
            where: { id: parseInt(productId) }
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        // Get or create cart
        let cart = await prisma.cart.findUnique({
            where: { userId }
        });

        if (!cart) {
            cart = await prisma.cart.create({
                data: { userId }
            });
        }

        // Check if item already exists in cart
        const existingItem = await prisma.cartItem.findFirst({
            where: {
                cartId: cart.id,
                productId: parseInt(productId),
                size
            }
        });

        let cartItem;
        if (existingItem) {
            // Update quantity
            cartItem = await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + parseInt(quantity) },
                include: {
                    product: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                            image: true
                        }
                    }
                }
            });
        } else {
            // Create new cart item
            cartItem = await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId: parseInt(productId),
                    size,
                    quantity: parseInt(quantity)
                },
                include: {
                    product: {
                        select: {
                            id: true,
                            name: true,
                            price: true,
                            image: true
                        }
                    }
                }
            });
        }

        res.json({
            success: true,
            message: 'Item added to cart',
            data: cartItem
        });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add item to cart'
        });
    }
};

// Update cart item
export const updateCartItem = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { itemId } = req.params;
        const { quantity, size } = req.body;

        // Verify cart item belongs to user
        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id: parseInt(itemId),
                cart: { userId }
            }
        });

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: 'Cart item not found'
            });
        }

        // Update cart item
        const updateData = {};
        if (quantity !== undefined) updateData.quantity = parseInt(quantity);
        if (size !== undefined) updateData.size = size;

        const updatedItem = await prisma.cartItem.update({
            where: { id: parseInt(itemId) },
            data: updateData,
            include: {
                product: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        image: true
                    }
                }
            }
        });

        res.json({
            success: true,
            message: 'Cart item updated',
            data: updatedItem
        });
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update cart item'
        });
    }
};

// Remove item from cart
export const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { itemId } = req.params;

        // Verify cart item belongs to user
        const cartItem = await prisma.cartItem.findFirst({
            where: {
                id: parseInt(itemId),
                cart: { userId }
            }
        });

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: 'Cart item not found'
            });
        }

        // Delete cart item
        await prisma.cartItem.delete({
            where: { id: parseInt(itemId) }
        });

        res.json({
            success: true,
            message: 'Item removed from cart'
        });
    } catch (error) {
        console.error('Error removing from cart:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to remove item from cart'
        });
    }
};

// Clear entire cart
export const clearCart = async (req, res) => {
    try {
        const userId = req.user.userId;

        const cart = await prisma.cart.findUnique({
            where: { userId }
        });

        if (!cart) {
            return res.json({
                success: true,
                message: 'Cart is already empty'
            });
        }

        // Delete all cart items
        await prisma.cartItem.deleteMany({
            where: { cartId: cart.id }
        });

        res.json({
            success: true,
            message: 'Cart cleared'
        });
    } catch (error) {
        console.error('Error clearing cart:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to clear cart'
        });
    }
};
