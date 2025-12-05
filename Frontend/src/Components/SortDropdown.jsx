import React from 'react';
import { useShop } from '@/hooks/useShop';
import { SORT_OPTIONS } from '@/utils/constants';
import { cn } from '@/utils/utils';

/**
 * SortDropdown component for product sorting
 */
const SortDropdown = ({ className = '' }) => {
    const { sortOption, setSortOption, setCurrentPage } = useShop();

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
        setCurrentPage(1); // Reset to first page on sort change
    };

    return (
        <div className={cn('relative', className)}>
            <label htmlFor="sort" className="sr-only">
                Sort by
            </label>
            <select
                id="sort"
                value={sortOption}
                onChange={handleSortChange}
                className="appearance-none w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent cursor-pointer transition-all"
            >
                {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {/* Custom dropdown arrow */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </div>
    );
};

export default SortDropdown;
