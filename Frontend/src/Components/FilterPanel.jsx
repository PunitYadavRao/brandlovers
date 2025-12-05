import React from 'react';
import { useShop } from '@/hooks/useShop';
import { CATEGORIES, SUBCATEGORIES, SIZES } from '@/utils/constants';
import { cn } from '@/utils/utils';

/**
 * FilterPanel component for product filtering
 */
const FilterPanel = ({ className = '', isMobile = false }) => {
    const {
        selectedCategories,
        toggleCategory,
        selectedSubCategories,
        toggleSubCategory,
        selectedSizes,
        toggleSize,
        showBestseller,
        setShowBestseller,
        clearFilters,
    } = useShop();

    const hasActiveFilters =
        selectedCategories.length > 0 ||
        selectedSubCategories.length > 0 ||
        selectedSizes.length > 0 ||
        showBestseller;

    return (
        <div className={cn('bg-white', isMobile ? 'p-4' : '', className)}>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Filters</h3>
                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="text-sm text-gray-600 hover:text-gray-900 underline"
                    >
                        Clear all
                    </button>
                )}
            </div>

            {/* Categories */}
            <div className="mb-6">
                <h4 className="font-medium mb-3">Category</h4>
                <div className="space-y-2">
                    {CATEGORIES.map((category) => (
                        <label key={category} className="flex items-center cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category)}
                                onChange={() => toggleCategory(category)}
                                className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900 cursor-pointer"
                            />
                            <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
                                {category}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Subcategories (Type) */}
            <div className="mb-6">
                <h4 className="font-medium mb-3">Type</h4>
                <div className="space-y-2">
                    {['Topwear', 'Bottomwear', 'Winterwear'].map((subCategory) => (
                        <label key={subCategory} className="flex items-center cursor-pointer group">
                            <input
                                type="checkbox"
                                checked={selectedSubCategories.includes(subCategory)}
                                onChange={() => toggleSubCategory(subCategory)}
                                className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900 cursor-pointer"
                            />
                            <span className="ml-2 text-sm text-gray-700 group-hover:text-gray-900">
                                {subCategory}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Sizes */}
            <div className="mb-6">
                <h4 className="font-medium mb-3">Size</h4>
                <div className="flex flex-wrap gap-2">
                    {SIZES.map((size) => (
                        <button
                            key={size}
                            onClick={() => toggleSize(size)}
                            className={cn(
                                'px-3 py-1.5 text-sm rounded-md border transition-colors',
                                selectedSizes.includes(size)
                                    ? 'bg-gray-900 text-white border-gray-900'
                                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-900'
                            )}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            {/* Bestseller */}
            <div className="mb-6">
                <label className="flex items-center cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={showBestseller}
                        onChange={(e) => setShowBestseller(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900 cursor-pointer"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-900">
                        Bestsellers Only
                    </span>
                </label>
            </div>
        </div>
    );
};

export default FilterPanel;
