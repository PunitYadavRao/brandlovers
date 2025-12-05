import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { productService, cartService } from '../services/api'
import { toast } from 'react-toastify'
import { useAuth } from '../hooks/useAuth'

const Product = () => {
  const { ProductID } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [addingToCart, setAddingToCart] = useState(false)

  useEffect(() => {
    fetchProduct()
  }, [ProductID])

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const response = await productService.getProductById(ProductID)
      setProduct(response.data)

      // Auto-select first size if available
      if (response.data.sizes) {
        const sizes = JSON.parse(response.data.sizes)
        if (sizes.length > 0) {
          setSelectedSize(sizes[0])
        }
      }
    } catch (error) {
      console.error('Error fetching product:', error)
      toast.error('Failed to load product')
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Please login to add items to cart')
      navigate('/signin')
      return
    }

    if (!selectedSize) {
      toast.error('Please select a size')
      return
    }

    try {
      setAddingToCart(true)
      await cartService.addToCart(parseInt(ProductID), selectedSize, quantity)
      toast.success('Added to cart successfully!')
    } catch (error) {
      console.error('Error adding to cart:', error)
      toast.error(error.response?.data?.message || 'Failed to add to cart')
    } finally {
      setAddingToCart(false)
    }
  }

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-gray-600'>Loading product...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>Product Not Found</h2>
          <button
            onClick={() => navigate('/collection')}
            className='px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition'
          >
            Back to Collection
          </button>
        </div>
      </div>
    )
  }

  const sizes = product.sizes ? JSON.parse(product.sizes) : []

  return (
    <div className='min-h-screen py-10'>
      <div className='max-w-6xl mx-auto'>
        {/* Back Button */}
        <button
          onClick={() => navigate('/collection')}
          className='mb-6 text-gray-600 hover:text-gray-900 flex items-center gap-2'
        >
          ← Back to Collection
        </button>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
          {/* Product Image */}
          <div className='bg-gray-100 rounded-lg overflow-hidden'>
            <img
              src={product.image}
              alt={product.name}
              className='w-full h-full object-cover'
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/600x800?text=Product+Image'
              }}
            />
          </div>

          {/* Product Details */}
          <div className='space-y-6'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900 mb-2'>{product.name}</h1>
              <div className='flex items-center gap-4 text-sm text-gray-600'>
                <span className='px-3 py-1 bg-gray-100 rounded'>{product.category}</span>
                <span className='px-3 py-1 bg-gray-100 rounded'>{product.subCategory}</span>
                {product.bestseller && (
                  <span className='px-3 py-1 bg-yellow-100 text-yellow-800 rounded'>Bestseller</span>
                )}
              </div>
            </div>

            <div className='text-3xl font-bold text-gray-900'>
              ${parseFloat(product.price).toFixed(2)}
            </div>

            <div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>Description</h3>
              <p className='text-gray-600 leading-relaxed'>{product.description}</p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className='text-lg font-semibold text-gray-900 mb-3'>Select Size</h3>
              <div className='flex flex-wrap gap-3'>
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 border-2 rounded-lg font-medium transition ${selectedSize === size
                        ? 'border-gray-900 bg-gray-900 text-white'
                        : 'border-gray-300 hover:border-gray-900'
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div>
              <h3 className='text-lg font-semibold text-gray-900 mb-3'>Quantity</h3>
              <div className='flex items-center gap-4'>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className='w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100 transition'
                >
                  -
                </button>
                <span className='text-lg font-medium w-12 text-center'>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className='w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100 transition'
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={addingToCart || !selectedSize}
              className='w-full py-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {addingToCart ? 'Adding to Cart...' : 'Add to Cart'}
            </button>

            {/* Product Info */}
            <div className='border-t border-gray-200 pt-6 space-y-3 text-sm text-gray-600'>
              <div className='flex items-center gap-2'>
                <span className='font-medium'>Product ID:</span>
                <span>{product.id}</span>
              </div>
              <div className='flex items-center gap-2'>
                <span className='font-medium'>Category:</span>
                <span>{product.category} / {product.subCategory}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
