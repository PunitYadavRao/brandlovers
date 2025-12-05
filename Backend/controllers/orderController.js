import prisma from '../config/database.js'

// Get all orders (Admin only)
export const getAllOrders = async (req, res) => {
    try {
        const { page = 1, limit = 10, status, search } = req.query
        const skip = (page - 1) * limit

        const where = {}

        if (status) {
            where.status = status
        }

        if (search) {
            where.OR = [
                { id: isNaN(search) ? undefined : parseInt(search) },
                { user: { email: { contains: search, mode: 'insensitive' } } },
                { user: { name: { contains: search, mode: 'insensitive' } } }
            ].filter(condition => condition.id !== undefined || condition.user)
        }

        const [orders, total] = await Promise.all([
            prisma.order.findMany({
                where,
                skip: parseInt(skip),
                take: parseInt(limit),
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true
                        }
                    },
                    items: {
                        include: {
                            product: {
                                select: {
                                    id: true,
                                    name: true,
                                    image: true,
                                    price: true
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    date: 'desc'
                }
            }),
            prisma.order.count({ where })
        ])

        return res.status(200).json({
            success: true,
            data: {
                orders,
                pagination: {
                    total,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(total / limit)
                }
            }
        })
    } catch (error) {
        console.error('Get all orders error:', error)
        return res.status(500).json({
            success: false,
            message: 'Error fetching orders',
            error: error.message
        })
    }
}

// Get single order by ID (Admin only)
export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params

        const order = await prisma.order.findUnique({
            where: { id: parseInt(id) },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                },
                items: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                image: true,
                                price: true,
                                description: true
                            }
                        }
                    }
                }
            }
        })

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            })
        }

        return res.status(200).json({
            success: true,
            data: { order }
        })
    } catch (error) {
        console.error('Get order by ID error:', error)
        return res.status(500).json({
            success: false,
            message: 'Error fetching order',
            error: error.message
        })
    }
}

// Create new order (Admin only)
export const createOrder = async (req, res) => {
    try {
        const { userId, items, amount, address, paymentMethod } = req.body

        if (!userId || !items || !amount || !address || !paymentMethod) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            })
        }

        const order = await prisma.order.create({
            data: {
                userId: parseInt(userId),
                amount: parseFloat(amount),
                address: typeof address === 'string' ? address : JSON.stringify(address),
                paymentMethod,
                date: Date.now(),
                items: {
                    create: items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        size: item.size,
                        price: parseFloat(item.price)
                    }))
                }
            },
            include: {
                items: {
                    include: {
                        product: true
                    }
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        })

        return res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: { order }
        })
    } catch (error) {
        console.error('Create order error:', error)
        return res.status(500).json({
            success: false,
            message: 'Error creating order',
            error: error.message
        })
    }
}

// Update order (Admin only)
export const updateOrder = async (req, res) => {
    try {
        const { id } = req.params
        const { status, payment, address, paymentMethod } = req.body

        const updateData = {}
        if (status !== undefined) updateData.status = status
        if (payment !== undefined) updateData.payment = payment
        if (address !== undefined) updateData.address = typeof address === 'string' ? address : JSON.stringify(address)
        if (paymentMethod !== undefined) updateData.paymentMethod = paymentMethod

        const order = await prisma.order.update({
            where: { id: parseInt(id) },
            data: updateData,
            include: {
                items: {
                    include: {
                        product: true
                    }
                },
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        })

        return res.status(200).json({
            success: true,
            message: 'Order updated successfully',
            data: { order }
        })
    } catch (error) {
        console.error('Update order error:', error)
        return res.status(500).json({
            success: false,
            message: 'Error updating order',
            error: error.message
        })
    }
}

// Delete order (Admin only)
export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params

        // First delete order items
        await prisma.orderItem.deleteMany({
            where: { orderId: parseInt(id) }
        })

        // Then delete the order
        await prisma.order.delete({
            where: { id: parseInt(id) }
        })

        return res.status(200).json({
            success: true,
            message: 'Order deleted successfully'
        })
    } catch (error) {
        console.error('Delete order error:', error)
        return res.status(500).json({
            success: false,
            message: 'Error deleting order',
            error: error.message
        })
    }
}

// Update order status (Admin only)
export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body

        if (!status) {
            return res.status(400).json({
                success: false,
                message: 'Status is required'
            })
        }

        const order = await prisma.order.update({
            where: { id: parseInt(id) },
            data: { status },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        })

        return res.status(200).json({
            success: true,
            message: 'Order status updated successfully',
            data: { order }
        })
    } catch (error) {
        console.error('Update order status error:', error)
        return res.status(500).json({
            success: false,
            message: 'Error updating order status',
            error: error.message
        })
    }
}

// ==================== USER-FACING ORDER FUNCTIONS ====================

// Get logged-in user's orders
export const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.userId
        const { page = 1, limit = 10 } = req.query
        const skip = (page - 1) * limit

        const [orders, total] = await Promise.all([
            prisma.order.findMany({
                where: { userId },
                skip: parseInt(skip),
                take: parseInt(limit),
                include: {
                    items: {
                        include: {
                            product: {
                                select: {
                                    id: true,
                                    name: true,
                                    image: true,
                                    price: true
                                }
                            }
                        }
                    }
                },
                orderBy: {
                    date: 'desc'
                }
            }),
            prisma.order.count({ where: { userId } })
        ])

        return res.status(200).json({
            success: true,
            data: {
                orders,
                pagination: {
                    total,
                    page: parseInt(page),
                    limit: parseInt(limit),
                    totalPages: Math.ceil(total / limit)
                }
            }
        })
    } catch (error) {
        console.error('Get user orders error:', error)
        return res.status(500).json({
            success: false,
            message: 'Error fetching orders',
            error: error.message
        })
    }
}

// Create order from cart (User)
export const createUserOrder = async (req, res) => {
    try {
        const userId = req.user.userId
        const { address, paymentMethod = 'COD' } = req.body

        if (!address) {
            return res.status(400).json({
                success: false,
                message: 'Shipping address is required'
            })
        }

        // Get user's cart with items
        const cart = await prisma.cart.findUnique({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        })

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Cart is empty'
            })
        }

        // Calculate total amount
        const amount = cart.items.reduce((total, item) => {
            return total + (parseFloat(item.product.price) * item.quantity)
        }, 0)

        // Create order
        const order = await prisma.order.create({
            data: {
                userId,
                amount,
                address: typeof address === 'string' ? address : JSON.stringify(address),
                paymentMethod,
                date: Math.floor(Date.now() / 1000), // Unix timestamp in seconds
                items: {
                    create: cart.items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        size: item.size,
                        price: parseFloat(item.product.price)
                    }))
                }
            },
            include: {
                items: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                image: true,
                                price: true
                            }
                        }
                    }
                }
            }
        })

        // Clear cart after order creation
        await prisma.cartItem.deleteMany({
            where: { cartId: cart.id }
        })

        return res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            data: { order }
        })
    } catch (error) {
        console.error('Create user order error:', error)
        return res.status(500).json({
            success: false,
            message: 'Error creating order',
            error: error.message
        })
    }
}

// Get single order by ID (User - own orders only)
export const getUserOrderById = async (req, res) => {
    try {
        const userId = req.user.userId
        const { id } = req.params

        const order = await prisma.order.findFirst({
            where: {
                id: parseInt(id),
                userId // Ensure user can only access their own orders
            },
            include: {
                items: {
                    include: {
                        product: {
                            select: {
                                id: true,
                                name: true,
                                image: true,
                                price: true,
                                description: true
                            }
                        }
                    }
                }
            }
        })

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            })
        }

        return res.status(200).json({
            success: true,
            data: { order }
        })
    } catch (error) {
        console.error('Get user order by ID error:', error)
        return res.status(500).json({
            success: false,
            message: 'Error fetching order',
            error: error.message
        })
    }
}
