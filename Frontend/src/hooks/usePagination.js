import { useState, useMemo } from 'react';

/**
 * Custom hook for pagination logic
 * @param {number} totalItems - Total number of items
 * @param {number} itemsPerPage - Items per page
 * @returns {Object} Pagination state and controls
 */
export function usePagination(totalItems, itemsPerPage = 20) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = useMemo(() => {
        return Math.ceil(totalItems / itemsPerPage);
    }, [totalItems, itemsPerPage]);

    const goToPage = (page) => {
        const pageNumber = Math.max(1, Math.min(page, totalPages));
        setCurrentPage(pageNumber);
    };

    const nextPage = () => {
        goToPage(currentPage + 1);
    };

    const prevPage = () => {
        goToPage(currentPage - 1);
    };

    const goToFirstPage = () => {
        setCurrentPage(1);
    };

    const goToLastPage = () => {
        setCurrentPage(totalPages);
    };

    const canGoNext = currentPage < totalPages;
    const canGoPrev = currentPage > 1;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    return {
        currentPage,
        totalPages,
        itemsPerPage,
        goToPage,
        nextPage,
        prevPage,
        goToFirstPage,
        goToLastPage,
        canGoNext,
        canGoPrev,
        startIndex,
        endIndex,
        setCurrentPage,
    };
}

export default usePagination;
