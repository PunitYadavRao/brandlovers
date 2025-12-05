import { buildQueryString } from '@/utils/utils';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

// Fetch wrapper with interceptors
const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('authToken');

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${url}`, config);

    if (response.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/signin';
      return;
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error = new Error(errorData.message || `Request failed with status ${response.status}`);
      error.status = response.status;
      error.response = { 
        status: response.status,
        data: errorData
      };
      throw error;
    }

    return response.json();
  } catch (error) {
    if (error.message === 'Failed to fetch') {
      return {
        success: true,
        data: { items: [], total: 0, page: 1, limit: 20, totalPages: 0 }
      };
    }
    throw error;
  }
};

// ==================== AUTH SERVICES ====================
export const authService = {
  signup: (email, password, name) =>
    fetchWithAuth('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    }),

  login: (email, password) =>
    fetchWithAuth('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  adminLogin: (email, password) =>
    fetchWithAuth('/auth/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getProfile: () =>
    fetchWithAuth('/auth/me'),

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },
};

// ==================== PRODUCT SERVICES ====================
export const productService = {
  /**
   * Get products with filters, search, sort, and pagination
   * @param {Object} params - Query parameters
   * @param {string} params.search - Search query
   * @param {string} params.category - Category filter
   * @param {string} params.subCategory - Subcategory filter
   * @param {string} params.sort - Sort option (relevant, price_asc, price_desc, newest)
   * @param {number} params.page - Page number
   * @param {number} params.limit - Items per page
   * @param {boolean} params.bestseller - Filter bestsellers
   */
  getProducts: (params = {}) => {
    const queryString = buildQueryString(params);
    return fetchWithAuth(`/api/products?${queryString}`);
  },

  getProductById: (id) =>
    fetchWithAuth(`/api/products/${id}`),

  searchProducts: (query, params = {}) =>
    fetchWithAuth(`/api/products?search=${encodeURIComponent(query)}&${buildQueryString(params)}`),
};

// ==================== CART SERVICES ====================
export const cartService = {
  getCart: () =>
    fetchWithAuth('/api/cart'),

  addToCart: (productId, size, quantity = 1) =>
    fetchWithAuth('/api/cart', {
      method: 'POST',
      body: JSON.stringify({ productId, size, quantity }),
    }),

  updateCartItem: (itemId, quantity, size) =>
    fetchWithAuth(`/api/cart/${itemId}`, {
      method: 'PATCH',
      body: JSON.stringify({ quantity, size }),
    }),

  removeFromCart: (itemId) =>
    fetchWithAuth(`/api/cart/${itemId}`, { method: 'DELETE' }),

  clearCart: () =>
    fetchWithAuth('/api/cart', { method: 'DELETE' }),
};

// ==================== ORDER SERVICES ====================
export const orderService = {
  createOrder: (orderData) =>
    fetchWithAuth('/api/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),

  getOrders: (params = {}) => {
    const queryString = buildQueryString(params);
    return fetchWithAuth(`/api/orders?${queryString}`);
  },

  getOrderById: (id) =>
    fetchWithAuth(`/api/orders/${id}`),

  // Payment integration
  createStripeSession: (orderData) =>
    fetchWithAuth('/api/orders/stripe', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),

  createRazorpayOrder: (orderData) =>
    fetchWithAuth('/api/orders/razorpay', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),

  verifyPayment: (paymentData) =>
    fetchWithAuth('/api/orders/verify-payment', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    }),
};

// ==================== ADMIN SERVICES ====================
export const adminService = {
  // Product management
  createProduct: (productData) =>
    fetchWithAuth('/api/admin/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    }),

  updateProduct: (id, productData) =>
    fetchWithAuth(`/api/admin/products/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(productData),
    }),

  deleteProduct: (id) =>
    fetchWithAuth(`/api/admin/products/${id}`, { method: 'DELETE' }),

  getProducts: (params = {}) => {
    const queryString = buildQueryString(params);
    return fetchWithAuth(`/api/admin/products?${queryString}`);
  },

  // Order management
  getOrders: (params = {}) => {
    const queryString = buildQueryString(params);
    return fetchWithAuth(`/api/admin/orders?${queryString}`);
  },

  updateOrderStatus: (id, status) =>
    fetchWithAuth(`/api/admin/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  getOrderById: (id) =>
    fetchWithAuth(`/api/admin/orders/${id}`),

  // Dashboard stats
  getDashboardStats: () =>
    fetchWithAuth('/api/admin/dashboard/stats'),
};

// ==================== HELPER FUNCTIONS ====================
export const saveToken = (token) => {
  localStorage.setItem('authToken', token);
};

export const getToken = () => {
  return localStorage.getItem('authToken');
};

export const saveUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!getToken();
};

export default fetchWithAuth;

