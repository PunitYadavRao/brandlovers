import React from 'react';
import { cn } from '@/utils/utils';

/**
 * Pagination component
 */
const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    className = '',
    showPageNumbers = true,
    maxPageNumbers = 5,
}) => {
    if (totalPages <= 1) return null;

    const getPageNumbers = () => {
        const pages = [];
        let startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
        let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

        if (endPage - startPage + 1 < maxPageNumbers) {
            startPage = Math.max(1, endPage - maxPageNumbers + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();
    const canGoPrev = currentPage > 1;
    const canGoNext = currentPage < totalPages;

    return (
        <div className={cn('flex items-center justify-center gap-2', className)}>
            {/* Previous Button */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={!canGoPrev}
                className={cn(
                    'px-3 py-2 rounded-lg border transition-colors',
                    canGoPrev
                        ? 'border-gray-300 hover:bg-gray-100 text-gray-700'
                        : 'border-gray-200 text-gray-400 cursor-not-allowed'
                )}
                aria-label="Previous page"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>

            {/* Page Numbers */}
            {showPageNumbers && (
                <>
                    {pageNumbers[0] > 1 && (
                        <>
                            <button
                                onClick={() => onPageChange(1)}
                                className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-700 transition-colors"
                            >
                                1
                            </button>
                            {pageNumbers[0] > 2 && (
                                <span className="px-2 text-gray-500">...</span>
                            )}
                        </>
                    )}

                    {pageNumbers.map((page) => (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={cn(
                                'px-3 py-2 rounded-lg border transition-colors min-w-[40px]',
                                page === currentPage
                                    ? 'bg-gray-900 text-white border-gray-900'
                                    : 'border-gray-300 hover:bg-gray-100 text-gray-700'
                            )}
                        >
                            {page}
                        </button>
                    ))}

                    {pageNumbers[pageNumbers.length - 1] < totalPages && (
                        <>
                            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                                <span className="px-2 text-gray-500">...</span>
                            )}
                            <button
                                onClick={() => onPageChange(totalPages)}
                                className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-700 transition-colors"
                            >
                                {totalPages}
                            </button>
                        </>
                    )}
                </>
            )}

            {/* Next Button */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={!canGoNext}
                className={cn(
                    'px-3 py-2 rounded-lg border transition-colors',
                    canGoNext
                        ? 'border-gray-300 hover:bg-gray-100 text-gray-700'
                        : 'border-gray-200 text-gray-400 cursor-not-allowed'
                )}
                aria-label="Next page"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
};

export default Pagination;
