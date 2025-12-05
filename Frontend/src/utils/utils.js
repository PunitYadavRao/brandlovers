/**
 * Combines class names conditionally
 * @param  {...any} classes - Class names to combine
 * @returns {string} Combined class names
 */
export function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}

/**
 * Formats a number as currency
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency symbol (default: '$')
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount, currency = '$') {
    return `${currency}${Number(amount).toFixed(2)}`;
}

/**
 * Formats a timestamp to readable date
 * @param {number} timestamp - Unix timestamp
 * @returns {string} Formatted date string
 */
export function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

/**
 * Formats a timestamp to readable date and time
 * @param {number} timestamp - Unix timestamp
 * @returns {string} Formatted date and time string
 */
export function formatDateTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

/**
 * Truncates text to a maximum length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

/**
 * Generates a URL-friendly slug from text
 * @param {string} text - Text to slugify
 * @returns {string} Slugified text
 */
export function generateSlug(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

/**
 * Debounces a function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Parses query string to object
 * @param {string} queryString - Query string
 * @returns {Object} Parsed query object
 */
export function parseQueryString(queryString) {
    const params = new URLSearchParams(queryString);
    const result = {};
    for (const [key, value] of params) {
        result[key] = value;
    }
    return result;
}

/**
 * Builds query string from object
 * @param {Object} params - Parameters object
 * @returns {string} Query string
 */
export function buildQueryString(params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            if (Array.isArray(value)) {
                value.forEach((v) => searchParams.append(key, v));
            } else {
                searchParams.append(key, value);
            }
        }
    });
    return searchParams.toString();
}
