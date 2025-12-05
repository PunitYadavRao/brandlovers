import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '@/hooks/useShop';
import { formatCurrency } from '@/utils/utils';
import Button from './ui/Button';

/**
 * CartItem component for displaying individual cart items
 */
const CartItem = ({ item, onUpdate, onRemove }) => {
    const { currency } = useShop();
    const [isUpdating, setIsUpdating] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);

    const { product, size, quantity } = item;

    // Handle quantity change
    const handleQuantityChange = async (newQuantity) => {
        if (newQuantity < 1) return;
        setIsUpdating(true);
        await onUpdate(item.id, newQuantity, size);
        setIsUpdating(false);
    };

    // Handle size change
    const handleSizeChange = async (newSize) => {
        setIsUpdating(true);
        await onUpdate(item.id, quantity, newSize);
        setIsUpdating(false);
    };

    // Handle remove
    const handleRemove = async () => {
        setIsRemoving(true);
        await onRemove(item.id);
    };

    const itemTotal = product.price * quantity;

    return (
        <div
            className={`
                bg-white rounded-lg p-4 md:p-6 border border-gray-200 
                transition-all duration-300 hover:shadow-md
                ${isRemoving ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}
            `}
        >
            <div className="flex gap-4 md:gap-6">
                {/* Product Image */}
                <Link
                    to={`/product/${product.id}`}
                    className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-gray-100 group"
                >
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                </Link>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-4 mb-2">
                        <div className="flex-1 min-w-0">
                            <Link
                                to={`/product/${product.id}`}
                                className="text-base md:text-lg font-semibold text-gray-900 hover:text-gray-600 transition-colors line-clamp-2"
                            >
                                {product.name}
                            </Link>
                            <p className="text-sm text-gray-500 mt-1">
                                {product.category} • {product.subCategory}
                            </p>
                        </div>

                        {/* Remove Button - Desktop */}
                        <button
                            onClick={handleRemove}
                            disabled={isRemoving}
                            className="hidden md:block text-gray-400 hover:text-red-600 transition-colors p-2 h-fit"
                            aria-label="Remove item"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-wrap items-center gap-4 mt-4">
                        {/* Size Selector */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Size:</span>
                            <select
                                value={size}
                                onChange={(e) => handleSizeChange(e.target.value)}
                                disabled={isUpdating}
                                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {product.sizes?.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Qty:</span>
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                <button
                                    onClick={() => handleQuantityChange(quantity - 1)}
                                    disabled={quantity <= 1 || isUpdating}
                                    className="px-3 py-1.5 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    aria-label="Decrease quantity"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                    </svg>
                                </button>
                                <span className="px-4 py-1.5 text-sm font-medium min-w-[3rem] text-center border-x border-gray-300">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => handleQuantityChange(quantity + 1)}
                                    disabled={isUpdating}
                                    className="px-3 py-1.5 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    aria-label="Increase quantity"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="ml-auto">
                            <p className="text-lg md:text-xl font-bold text-gray-900">
                                {formatCurrency(itemTotal, currency)}
                            </p>
                            {quantity > 1 && (
                                <p className="text-xs text-gray-500 text-right">
                                    {formatCurrency(product.price, currency)} each
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Remove Button - Mobile */}
                    <button
                        onClick={handleRemove}
                        disabled={isRemoving}
                        className="md:hidden mt-4 text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
