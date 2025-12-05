import { useContext } from 'react';
import { ShopContext } from '@/context/ShopContext';

/**
 * Custom hook to access ShopContext
 * @returns {Object} Shop context value
 */
export function useShop() {
    const context = useContext(ShopContext);

    if (!context) {
        throw new Error('useShop must be used within a ShopContextProvider');
    }

    return context;
}

export default useShop;
