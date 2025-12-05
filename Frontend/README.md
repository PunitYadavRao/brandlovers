# Brand Lovers - Frontend

A modern, responsive e-commerce clothing website built with React and Vite, featuring advanced product discovery, secure authentication, and seamless shopping experience.

## 🚀 Live Demo

- **Frontend**: [https://brand-lovers.vercel.app/](https://brand-lovers.vercel.app/)
- **Backend API**: [https://brandlovers.onrender.com/](https://brandlovers.onrender.com/)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Integration](#api-integration)
- [Deployment](#deployment)
- [Contributing](#contributing)

## ✨ Features

### 🛍️ E-Commerce Core
- **Product Catalog**: Browse extensive clothing collection with high-quality images
- **Advanced Search**: Real-time search with debounced input and text indexing
- **Smart Filtering**: Filter by category (Men/Women/Kids), type (Top/Bottom/Winter), size, and bestsellers
- **Flexible Sorting**: Sort by relevance, price (low-high, high-low), and newest arrivals
- **Pagination**: Efficient page-based navigation with total count display

### 🔐 Authentication & Authorization
- **User Registration/Login**: Secure email/password authentication
- **JWT-based Sessions**: Stateless authentication with role-based access
- **Protected Routes**: Secure access to orders and admin panel
- **Role Management**: User and Admin role separation

### 🛒 Shopping Experience
- **Interactive Cart**: Add, update quantities, remove items with real-time totals
- **Product Details**: Image gallery with thumbnails, size selection, quantity controls
- **Checkout Process**: Address form, payment method selection (Stripe/Razorpay/COD)
- **Order Tracking**: Real-time order status updates and history

### 👨‍💼 Admin Panel
- **Product Management**: CRUD operations with image upload
- **Order Management**: View all orders, update status, track delivery
- **Dashboard Analytics**: Overview of products and orders with pagination
- **Search & Filter**: Admin-specific search and filtering capabilities

### 📱 User Experience
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Modern UI**: TailwindCSS with custom animations and transitions
- **Loading States**: Smooth loading indicators and skeleton screens
- **Error Handling**: User-friendly error messages and empty states
- **Newsletter**: Email subscription functionality

## 🛠️ Tech Stack

### Frontend Core
- **React 19.1.1** - Modern React with latest features
- **Vite 7.1.7** - Lightning-fast build tool and dev server
- **React Router DOM 7.9.4** - Client-side routing
- **TailwindCSS 4.1.16** - Utility-first CSS framework

### State Management & API
- **React Context** - Global state management for auth, cart, and shop data
- **Axios 1.13.2** - HTTP client for API communication
- **Custom Hooks** - Reusable logic for auth, pagination, debouncing

### UI & UX
- **React Icons 5.5.0** - Comprehensive icon library
- **React Toastify 11.0.5** - Toast notifications
- **Custom Components** - Reusable UI components with consistent design

### Development Tools
- **ESLint 9.36.0** - Code linting and formatting
- **Vite Plugins** - React and TailwindCSS integration
- **Path Aliases** - Clean import statements with @ alias

## 📁 Project Structure

```
Frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   ├── admin_assets/     # Admin panel assets
│   │   └── frontend_assets/  # Main app assets
│   ├── Components/
│   │   ├── ui/              # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── Modal.jsx
│   │   │   └── Pagination.jsx
│   │   ├── AdminLayout.jsx
│   │   ├── AdminNavbar.jsx
│   │   ├── AdminSidebar.jsx
│   │   ├── CartItem.jsx
│   │   ├── FilterPanel.jsx
│   │   ├── Hero.jsx
│   │   ├── LatestCollection.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductGrid.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── SearchBar.jsx
│   │   └── SortDropdown.jsx
│   ├── context/
│   │   ├── AuthContext.jsx  # Authentication state
│   │   └── ShopContext.jsx  # Shopping cart & products
│   ├── hooks/
│   │   ├── useAuth.js       # Authentication logic
│   │   ├── useDebounce.js   # Search debouncing
│   │   ├── usePagination.js # Pagination logic
│   │   └── useShop.js       # Shopping logic
│   ├── Pages/
│   │   ├── Admin/           # Admin panel pages
│   │   │   ├── AddProduct.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── OrderDetails.jsx
│   │   │   ├── OrdersList.jsx
│   │   │   └── ProductsList.jsx
│   │   ├── About.jsx
│   │   ├── Cart.jsx
│   │   ├── Collection.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Orders.jsx
│   │   ├── PlaceOrders.jsx
│   │   └── Product.jsx
│   ├── services/
│   │   └── api.js           # API configuration
│   ├── utils/
│   │   ├── constants.js     # App constants
│   │   └── utils.js         # Utility functions
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── jsconfig.json
├── package.json
├── tailwind.config.js
├── vite.config.js
└── vercel.json
```

## 🚀 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd "Brand Lovers/Frontend"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=https://brandlovers.onrender.com

# Payment Gateway (Optional for development)
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id

# App Configuration
VITE_APP_NAME=Brand Lovers
VITE_CURRENCY_SYMBOL=₹
VITE_DELIVERY_FEE=10
```

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload

# Production
npm run build        # Build for production
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint for code quality checks
```

## 🔌 API Integration

The frontend communicates with the backend through RESTful APIs:

### Key API Endpoints

```javascript
// Products
GET /api/products?search=shirt&category=Men&sort=price_asc&page=1&limit=20
GET /api/products/:id

// Authentication
POST /api/auth/signup
POST /api/auth/login
GET /api/auth/me

// Cart
GET /api/cart
POST /api/cart
PATCH /api/cart/:itemId
DELETE /api/cart/:itemId

// Orders
POST /api/orders
GET /api/orders
GET /api/orders/:id

// Admin (Protected)
POST /api/admin/products
PATCH /api/admin/products/:id
DELETE /api/admin/products/:id
PATCH /api/admin/orders/:id/status
```

### API Configuration

The API client is configured in `src/services/api.js` with:
- Base URL configuration
- Request/response interceptors
- Error handling
- Authentication token management

## 🌐 Deployment

### Vercel Deployment (Recommended)

1. **Connect to Vercel**
   ```bash
   npm install -g vercel
   vercel login
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Environment Variables**
   Set environment variables in Vercel dashboard

### Manual Build

```bash
npm run build
# Deploy dist/ folder to your hosting provider
```

### Vercel Configuration

The `vercel.json` file handles SPA routing:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## 🎨 Customization

### Styling
- **TailwindCSS**: Utility-first CSS framework
- **Custom Fonts**: Playwrite MX Guides, Rubik 80s Fade, Almendra Display
- **Animations**: Custom keyframes for smooth transitions
- **Responsive**: Mobile-first design approach

### Theme Configuration
Modify `tailwind.config.js` for:
- Custom colors and fonts
- Animation timings
- Breakpoint customization
- Component styling

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Route-level access control
- **Input Validation**: Client-side form validation
- **XSS Protection**: Sanitized user inputs
- **CORS Configuration**: Proper cross-origin setup

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- **Live Frontend**: [https://brand-lovers.vercel.app/](https://brand-lovers.vercel.app/)
- **Backend API**: [https://brandlovers.onrender.com/](https://brandlovers.onrender.com/)
- **Documentation**: [API Documentation](https://brandlovers.onrender.com/api-docs)

---

Built with ❤️ using React, Vite, and TailwindCSS