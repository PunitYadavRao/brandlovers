import React, { useState, useEffect } from 'react';
import { useShop } from '@/hooks/useShop';
import SearchBar from '@/Components/SearchBar';
import FilterPanel from '@/Components/FilterPanel';
import SortDropdown from '@/Components/SortDropdown';
import ProductGrid from '@/Components/ProductGrid';
import ProductListItem from '@/Components/ProductListItem';
import ViewToggle from '@/Components/ViewToggle';
import Pagination from '@/Components/ui/Pagination';
import Button from '@/Components/ui/Button';
import Loading from '@/Components/ui/Loading';

const Collection = () => {
  const {
    products,
    productsLoading,
    productsTotalCount,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    selectedCategories,
    selectedSubCategories,
    selectedSizes,
    showBestseller,
    searchQuery,
  } = useShop();

  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const totalPages = Math.ceil(productsTotalCount / itemsPerPage);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Count active filters
  const activeFiltersCount =
    selectedCategories.length +
    selectedSubCategories.length +
    selectedSizes.length +
    (showBestseller ? 1 : 0);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">All Products</h1>
          <p className="text-gray-600">
            Discover our complete collection of premium clothing
          </p>
        </div>

        {/* Search Bar - Mobile */}
        <div className="mb-6 lg:hidden">
          <SearchBar />
        </div>

        {/* Controls Bar */}
        <div className="flex items-center justify-between gap-4 mb-6">
          {/* Filter Button - Mobile */}
          <Button
            variant="outline"
            onClick={() => setShowMobileFilters(true)}
            className="lg:hidden"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
            {activeFiltersCount > 0 && (
              <span className="ml-2 bg-gray-900 text-white text-xs px-2 py-0.5 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </Button>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:block flex-1 max-w-md">
            <SearchBar />
          </div>

          {/* Results Count */}
          <div className="hidden md:block text-sm text-gray-600">
            {productsLoading ? (
              'Loading...'
            ) : (
              `${productsTotalCount} ${productsTotalCount === 1 ? 'product' : 'products'}`
            )}
          </div>

          {/* View Toggle */}
          <ViewToggle view={viewMode} onViewChange={setViewMode} className="hidden sm:flex" />

          {/* Sort Dropdown */}
          <div className="w-48">
            <SortDropdown />
          </div>
        </div>

        {/* Active Search Query */}
        {searchQuery && (
          <div className="mb-4 text-sm text-gray-600">
            Showing results for: <span className="font-semibold">"{searchQuery}"</span>
          </div>
        )}

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-4">
              <FilterPanel />
            </div>
          </aside>

          {/* Products Grid/List */}
          <div className="flex-1">
            {viewMode === 'grid' ? (
              <ProductGrid
                products={products}
                loading={productsLoading}
                emptyMessage={searchQuery ? `No products found for "${searchQuery}"` : 'No products found'}
              />
            ) : (
              <div className="space-y-4">
                {productsLoading ? (
                  <Loading size="lg" text="Loading products..." />
                ) : products.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                      {searchQuery ? `No products found for "${searchQuery}"` : 'No products found'}
                    </p>
                  </div>
                ) : (
                  products.map((product) => (
                    <ProductListItem key={product.id} product={product} />
                  ))
                )}
              </div>
            )}

            {/* Pagination */}
            {!productsLoading && products.length > 0 && totalPages > 1 && (
              <div className="mt-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setShowMobileFilters(false)}
          />

          {/* Drawer */}
          <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-white shadow-xl overflow-y-auto animate-slideIn">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Filter Content */}
            <FilterPanel isMobile />

            {/* Footer */}
            <div className="sticky bottom-0 p-4 border-t bg-white">
              <Button
                variant="primary"
                className="w-full"
                onClick={() => setShowMobileFilters(false)}
              >
                Show {productsTotalCount} Products
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collection;