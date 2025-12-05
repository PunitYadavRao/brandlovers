import React from 'react'

const OrderStatusBadge = ({ status }) => {
    const getStatusStyles = () => {
        switch (status) {
            case 'Order Placed':
                return 'bg-blue-100 text-blue-800'
            case 'Processing':
                return 'bg-yellow-100 text-yellow-800'
            case 'Shipped':
                return 'bg-purple-100 text-purple-800'
            case 'Out for delivery':
                return 'bg-indigo-100 text-indigo-800'
            case 'Delivered':
                return 'bg-green-100 text-green-800'
            case 'Cancelled':
                return 'bg-red-100 text-red-800'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyles()}`}
        >
            {status}
        </span>
    )
}

export default OrderStatusBadge
