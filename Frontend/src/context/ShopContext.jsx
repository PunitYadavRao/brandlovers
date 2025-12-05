import { createContext, useState, useEffect, useCallback } from 'react';
import { productService, cartService } from '@/services/api';
import { CURRENCY_SYMBOL, DELIVERY_FEE, ITEMS_PER_PAGE } from '@/utils/constants';
import { toast } from 'react-toastify';

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
    // Product state
    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(false);
    const [productsTotalCount, setProductsTotalCount] = useState(0);

    // Cart state
    const [cartItems, setCartItems] = useState([]);
    const [cartLoading, setCartLoading] = useState(false);

    // Filter & Search state
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSubCategories, setSelectedSubCategories] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [showBestseller, setShowBestseller] = useState(false);
    const [sortOption, setSortOption] = useState('relevant');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(ITEMS_PER_PAGE);

    // Constants
    const currency = CURRENCY_SYMBOL;
    const deliveryFee = DELIVERY_FEE;

    // ==================== PRODUCT FUNCTIONS ====================

    /**
     * Fetch products with current filters, search, sort, and pagination
     */
    const fetchProducts = useCallback(async () => {
        setProductsLoading(true);
        try {
            const params = {
                page: currentPage,
                limit: itemsPerPage,
                sort: sortOption,
            };

            if (searchQuery) params.search = searchQuery;
            if (selectedCategories.length > 0) params.category = selectedCategories.join(',');
            if (selectedSubCategories.length > 0) params.subCategory = selectedSubCategories.join(',');
            if (selectedSizes.length > 0) params.size = selectedSizes.join(',');
            if (showBestseller) params.bestseller = true;

            const response = await productService.getProducts(params);
            const { items, total } = response.data || response;

            setProducts(items || []);
            setProductsTotalCount(total || 0);
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
            setProductsTotalCount(0);
        } finally {
            setProductsLoading(false);
        }
    }, [currentPage, itemsPerPage, sortOption, searchQuery, selectedCategories, selectedSubCategories, selectedSizes, showBestseller]);

    /**
     * Get single product by ID
     */
    const getProductById = async (id) => {
        try {
            const response = await productService.getProductById(id);
            return response.data || response;
        } catch (error) {
            console.error('Error fetching product:', error);
            toast.error('Failed to load product details');
            return null;
        }
    };

    // ==================== CART FUNCTIONS ====================

    /**
     * Fetch cart items
     */
    const fetchCart = useCallback(async () => {
        setCartLoading(true);
        try {
            const response = await cartService.getCart();
            setCartItems(response.data?.items || response.items || []);
        } catch (error) {
            console.error('Error fetching cart:', error);
            // Don't show error toast if user is not authenticated
            if (error.response?.status !== 401) {
                toast.error('Failed to load cart');
            }
            setCartItems([]);
        } finally {
            setCartLoading(false);
        }
    }, []);

    /**
     * Add item to cart
     */
    const addToCart = async (productId, size, quantity = 1) => {
        try {
            await cartService.addToCart(productId, size, quantity);
            await fetchCart();
            toast.success('Added to cart!');
            return true;
        } catch (error) {
            console.error('Error adding to cart:', error);
            toast.error(error.response?.data?.message || 'Failed to add to cart');
            return false;
        }
    };

    /**
     * Update cart item quantity or size
     */
    const updateCartItem = async (itemId, quantity, size) => {
        try {
            await cartService.updateCartItem(itemId, quantity, size);
            await fetchCart();
            return true;
        } catch (error) {
            console.error('Error updating cart:', error);
            toast.error('Failed to update cart');
            return false;
        }
    };

    /**
     * Remove item from cart
     */
    const removeFromCart = async (itemId) => {
        try {
            await cartService.removeFromCart(itemId);
            await fetchCart();
            toast.success('Removed from cart');
            return true;
        } catch (error) {
            console.error('Error removing from cart:', error);
            toast.error('Failed to remove item');
            return false;
        }
    };

    /**
     * Clear entire cart
     */
    const clearCart = async () => {
        try {
            await cartService.clearCart();
            setCartItems([]);
            toast.success('Cart cleared');
            return true;
        } catch (error) {
            console.error('Error clearing cart:', error);
            toast.error('Failed to clear cart');
            return false;
        }
    };

    /**
     * Get cart item count
     */
    const getCartCount = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    /**
     * Get cart total amount
     */
    const getCartAmount = () => {
        return cartItems.reduce((total, item) => {
            return total + (Number(item.product.price) * item.quantity);
        }, 0);
    };

    // ==================== FILTER FUNCTIONS ====================

    /**
     * Toggle category filter
     */
    const toggleCategory = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
        setCurrentPage(1); // Reset to first page
    };

    /**
     * Toggle subcategory filter
     */
    const toggleSubCategory = (subCategory) => {
        setSelectedSubCategories((prev) =>
            prev.includes(subCategory)
                ? prev.filter((sc) => sc !== subCategory)
                : [...prev, subCategory]
        );
        setCurrentPage(1);
    };

    /**
     * Toggle size filter
     */
    const toggleSize = (size) => {
        setSelectedSizes((prev) =>
            prev.includes(size)
                ? prev.filter((s) => s !== size)
                : [...prev, size]
        );
        setCurrentPage(1);
    };

    /**
     * Clear all filters
     */
    const clearFilters = () => {
        setSelectedCategories([]);
        setSelectedSubCategories([]);
        setSelectedSizes([]);
        setShowBestseller(false);
        setSearchQuery('');
        setSortOption('relevant');
        setCurrentPage(1);
    };

    // ==================== EFFECTS ====================

    // Fetch products when filters change
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Context value
    const value = {
        // Product data
        products,
        productsLoading,
        productsTotalCount,
        fetchProducts,
        getProductById,

        // Cart data
        cartItems,
        cartLoading,
        fetchCart,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        getCartCount,
        getCartAmount,

        // Filter & Search
        searchQuery,
        setSearchQuery,
        selectedCategories,
        toggleCategory,
        selectedSubCategories,
        toggleSubCategory,
        selectedSizes,
        toggleSize,
        showBestseller,
        setShowBestseller,
        sortOption,
        setSortOption,
        clearFilters,

        // Pagination
        currentPage,
        setCurrentPage,
        itemsPerPage,

        // Constants
        currency,
        deliveryFee,
    };

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;