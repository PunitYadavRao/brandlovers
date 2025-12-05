import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '@/hooks/useShop';
import { formatCurrency } from '@/utils/utils';
import { cn } from '@/utils/utils';
import Button from './ui/Button';

/**
 * ProductListItem component for list view display
 */
const ProductListItem = ({ product, className = '' }) => {
    const { currency } = useShop();

    return (
        <div
            className={cn(
                'group bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-200',
                className
            )}
        >
            <div className="flex flex-col sm:flex-row gap-4 p-4">
                {/* Product Image */}
                <Link
                    to={`/product/${product.id}`}
                    className="flex-shrink-0 w-full sm:w-48 h-48 rounded-lg overflow-hidden bg-gray-100"
                >
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                    />
                </Link>

                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                        <div className="flex items-start justify-between gap-4 mb-2">
                            <Link
                                to={`/product/${product.id}`}
                                className="flex-1 min-w-0"
                            >
                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-600 transition-colors line-clamp-2">
                                    {product.name}
                                </h3>
                            </Link>
                            {product.bestseller && (
                                <span className="flex-shrink-0 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">
                                    Bestseller
                                </span>
                            )}
                        </div>

                        <p className="text-sm text-gray-500 mb-3">
                            {product.category} • {product.subCategory}
                        </p>

                        {product.description && (
                            <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                                {product.description}
                            </p>
                        )}

                        {/* Sizes */}
                        {product.sizes && product.sizes.length > 0 && (
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-sm text-gray-600">Sizes:</span>
                                <div className="flex gap-1">
                                    {product.sizes.slice(0, 5).map((size) => (
                                        <span
                                            key={size}
                                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                                        >
                                            {size}
                                        </span>
                                    ))}
                                    {product.sizes.length > 5 && (
                                        <span className="px-2 py-1 text-gray-500 text-xs">
                                            +{product.sizes.length - 5}
                                        </span>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between gap-4 mt-4">
                        <p className="text-2xl font-bold text-gray-900">
                            {formatCurrency(product.price, currency)}
                        </p>
                        <Link to={`/product/${product.id}`}>
                            <Button variant="primary" size="sm">
                                View Details
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductListItem;
