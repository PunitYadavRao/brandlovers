import React from 'react';
import ProductCard from './ProductCard';
import { ProductGridSkeleton } from './ui/Loading';
import { cn } from '@/utils/utils';

/**
 * ProductGrid component for displaying products in a responsive grid
 */
const ProductGrid = ({
    products = [],
    loading = false,
    className = '',
    emptyMessage = 'No products found',
}) => {
    if (loading) {
        return <ProductGridSkeleton count={8} />;
    }

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 text-center">
                <svg
                    className="w-24 h-24 text-gray-300 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {emptyMessage}
                </h3>
                <p className="text-gray-600">
                    Try adjusting your filters or search query
                </p>
            </div>
        );
    }

    return (
        <div
            className={cn(
                'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6',
                className
            )}
        >
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default ProductGrid;
