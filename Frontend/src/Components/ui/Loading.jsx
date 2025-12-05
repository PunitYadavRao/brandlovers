import React from 'react';
import { cn } from '@/utils/utils';

/**
 * Loading spinner component
 */
export const Spinner = ({ size = 'md', className = '' }) => {
    const sizes = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
    };

    return (
        <div className={cn('animate-spin rounded-full border-2 border-gray-300 border-t-gray-900', sizes[size], className)} />
    );
};

/**
 * Full page loading component
 */
export const PageLoading = () => {
    return (
        <div className="flex items-center justify-center min-h-[400px]">
            <Spinner size="lg" />
        </div>
    );
};

/**
 * Skeleton loader for cards
 */
export const SkeletonCard = () => {
    return (
        <div className="animate-pulse">
            <div className="bg-gray-200 aspect-square rounded-lg mb-3" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>
    );
};

/**
 * Skeleton loader for product grid
 */
export const ProductGridSkeleton = ({ count = 8 }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: count }).map((_, index) => (
                <SkeletonCard key={index} />
            ))}
        </div>
    );
};

/**
 * Generic skeleton loader
 */
export const Skeleton = ({ className = '', ...props }) => {
    return (
        <div
            className={cn('skeleton rounded', className)}
            {...props}
        />
    );
};

const Loading = {
    Spinner,
    PageLoading,
    SkeletonCard,
    ProductGridSkeleton,
    Skeleton,
};

export default Loading;
