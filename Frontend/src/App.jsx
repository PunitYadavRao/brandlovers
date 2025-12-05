import React from 'react'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './Pages/Home'
import Collection from './Pages/Collection'
import About from './Pages/About'
import Login from './Pages/Login'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp'
import Contact from './Pages/Contact'
import Cart from './Pages/Cart'
import Orders from './Pages/Orders'
import PlaceOrders from './Pages/PlaceOrders'
import Product from './Pages/Product'
import MyProfile from './Pages/MyProfile'
import ProtectedRoute from './Components/ProtectedRoute'
import AdminLayout from './Components/AdminLayout'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import OrdersList from './Pages/Admin/OrdersList'
import OrderDetails from './Pages/Admin/OrderDetails'
import ProductsList from './Pages/Admin/ProductsList'
import AddProduct from './Pages/Admin/AddProduct'
import OrderDetailsPage from './Pages/OrderDetails'

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Routes>
        {/* Public Auth Routes */}
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />

        {/* Admin Routes */}
        <Route path='/admin' element={
          <ProtectedRoute adminOnly={true}>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<AdminDashboard />} />
          <Route path='orders' element={<OrdersList />} />
          <Route path='orders/:id' element={<OrderDetails />} />
          <Route path='products' element={<ProductsList />} />
          <Route path='products/add' element={<AddProduct />} />
          <Route path='products/edit/:id' element={<AddProduct />} />
        </Route>

        {/* User Routes */}
        <Route path='/*' element={
          <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/collection' element={<Collection />} />
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/orders' element={<Orders />} />
              <Route path='/orders/:id' element={<OrderDetailsPage />} />
              <Route path='/place-order' element={<PlaceOrders />} />
              <Route path='/product/:ProductID' element={<Product />} />
              <Route path='/profile' element={
                <ProtectedRoute>
                  <MyProfile />
                </ProtectedRoute>
              } />
            </Routes>
          </div>
        } />
      </Routes>
    </>
  )
}

export default App