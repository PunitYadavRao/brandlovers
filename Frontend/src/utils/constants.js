export const CATEGORIES = ['Men', 'Women', 'Kids'];

export const SUBCATEGORIES = {
    Men: ['Topwear', 'Bottomwear', 'Winterwear'],
    Women: ['Topwear', 'Bottomwear', 'Winterwear'],
    Kids: ['Topwear', 'Bottomwear', 'Winterwear'],
};

export const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

export const ORDER_STATUS = {
    PLACED: 'Order Placed',
    PROCESSING: 'Processing',
    OUT_FOR_DELIVERY: 'Out for delivery',
    DELIVERED: 'Delivered',
    CANCELLED: 'Cancelled',
};

export const PAYMENT_METHODS = {
    STRIPE: 'stripe',
    RAZORPAY: 'razorpay',
    COD: 'cod',
};

export const SORT_OPTIONS = [
    { value: 'relevant', label: 'Relevant' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
];

export const ITEMS_PER_PAGE = 20;

export const CURRENCY_SYMBOL = '$';

export const DELIVERY_FEE = 10;
