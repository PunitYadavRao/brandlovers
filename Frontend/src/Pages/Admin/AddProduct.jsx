import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { adminService } from '../../services/api'
import { toast } from 'react-toastify'
import { FiArrowLeft } from 'react-icons/fi'

const AddProduct = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const isEditMode = Boolean(id)
    const [loading, setLoading] = useState(false)
    const [fetchingProduct, setFetchingProduct] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: '',
        category: '',
        subCategory: '',
        sizes: [],
        bestseller: false
    })

    // Fetch product data when in edit mode
    useEffect(() => {
        if (isEditMode) {
            fetchProductData()
        }
    }, [id])

    const fetchProductData = async () => {
        try {
            setFetchingProduct(true)
            const response = await adminService.getProducts({ page: 1, limit: 1000 })
            const product = response.data.items.find(p => p.id === parseInt(id))

            if (product) {
                setFormData({
                    name: product.name,
                    description: product.description,
                    price: product.price.toString(),
                    image: product.image,
                    category: product.category,
                    subCategory: product.subCategory,
                    sizes: JSON.parse(product.sizes),
                    bestseller: product.bestseller
                })
            } else {
                toast.error('Product not found')
                navigate('/admin/products')
            }
        } catch (error) {
            console.error('Error fetching product:', error)
            toast.error('Failed to fetch product details')
            navigate('/admin/products')
        } finally {
            setFetchingProduct(false)
        }
    }

    const availableSizes = ['S', 'M', 'L', 'XL', 'XXL']
    const categories = ['Men', 'Women', 'Kids']
    const subCategories = ['Topwear', 'Bottomwear', 'Winterwear']

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.name || !formData.description || !formData.price || !formData.image ||
            !formData.category || !formData.subCategory || formData.sizes.length === 0) {
            toast.error('Please fill in all required fields')
            return
        }

        try {
            setLoading(true)
            const productData = {
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                image: formData.image,
                category: formData.category,
                subCategory: formData.subCategory,
                sizes: formData.sizes,
                bestseller: formData.bestseller
            }

            if (isEditMode) {
                await adminService.updateProduct(id, productData)
                toast.success('Product updated successfully')
            } else {
                await adminService.createProduct(productData)
                toast.success('Product added successfully')
            }
            navigate('/admin/products')
        } catch (error) {
            console.error(`Error ${isEditMode ? 'updating' : 'creating'} product:`, error)
            toast.error(error.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'add'} product`)
        } finally {
            setLoading(false)
        }
    }

    const handleSizeToggle = (size) => {
        setFormData(prev => ({
            ...prev,
            sizes: prev.sizes.includes(size)
                ? prev.sizes.filter(s => s !== size)
                : [...prev.sizes, size]
        }))
    }

    return (
        <div className='space-y-6'>
            {/* Header */}
            <div className='flex items-center gap-4'>
                <button
                    onClick={() => navigate('/admin/products')}
                    className='p-2 hover:bg-gray-100 rounded-lg transition'
                >
                    <FiArrowLeft className='w-5 h-5' />
                </button>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900'>
                        {isEditMode ? 'Edit Product' : 'Add New Product'}
                    </h1>
                    <p className='text-gray-600 mt-1'>
                        {isEditMode ? 'Update product information' : 'Add a new product to your collection'}
                    </p>
                </div>
            </div>

            {/* Form */}
            {fetchingProduct ? (
                <div className='bg-white rounded-lg shadow p-8 text-center text-gray-500'>
                    Loading product data...
                </div>
            ) : (
                <form onSubmit={handleSubmit} className='bg-white rounded-lg shadow'>
                    <div className='p-6 space-y-6'>
                        {/* Product Information */}
                        <div>
                            <h2 className='text-lg font-semibold text-gray-900 mb-4'>Product Information</h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div className='md:col-span-2'>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        Product Name <span className='text-red-500'>*</span>
                                    </label>
                                    <input
                                        type='text'
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-700'
                                        placeholder='Enter product name'
                                    />
                                </div>
                                <div className='md:col-span-2'>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        Description <span className='text-red-500'>*</span>
                                    </label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={formData.description}
                                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-700'
                                        placeholder='Enter product description'
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        Price <span className='text-red-500'>*</span>
                                    </label>
                                    <input
                                        type='number'
                                        step='0.01'
                                        required
                                        value={formData.price}
                                        onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-700'
                                        placeholder='0.00'
                                    />
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        Image URL <span className='text-red-500'>*</span>
                                    </label>
                                    <input
                                        type='url'
                                        required
                                        value={formData.image}
                                        onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-700'
                                        placeholder='https://example.com/image.jpg'
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Category & Subcategory */}
                        <div>
                            <h2 className='text-lg font-semibold text-gray-900 mb-4'>Category</h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        Category <span className='text-red-500'>*</span>
                                    </label>
                                    <select
                                        required
                                        value={formData.category}
                                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-700'
                                    >
                                        <option value=''>Select category</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        Sub Category <span className='text-red-500'>*</span>
                                    </label>
                                    <select
                                        required
                                        value={formData.subCategory}
                                        onChange={(e) => setFormData(prev => ({ ...prev, subCategory: e.target.value }))}
                                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-700'
                                    >
                                        <option value=''>Select sub category</option>
                                        {subCategories.map(subCat => (
                                            <option key={subCat} value={subCat}>{subCat}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Sizes */}
                        <div>
                            <h2 className='text-lg font-semibold text-gray-900 mb-4'>
                                Available Sizes <span className='text-red-500'>*</span>
                            </h2>
                            <div className='flex flex-wrap gap-3'>
                                {availableSizes.map(size => (
                                    <button
                                        key={size}
                                        type='button'
                                        onClick={() => handleSizeToggle(size)}
                                        className={`px-6 py-2 border rounded-lg font-medium transition ${formData.sizes.includes(size)
                                            ? 'bg-gray-900 text-white border-gray-900'
                                            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-700'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                            {formData.sizes.length === 0 && (
                                <p className='text-sm text-red-500 mt-2'>Please select at least one size</p>
                            )}
                        </div>

                        {/* Bestseller */}
                        <div>
                            <label className='flex items-center gap-2 cursor-pointer'>
                                <input
                                    type='checkbox'
                                    checked={formData.bestseller}
                                    onChange={(e) => setFormData(prev => ({ ...prev, bestseller: e.target.checked }))}
                                    className='w-4 h-4 rounded border-gray-300'
                                />
                                <span className='text-sm font-medium text-gray-700'>Mark as Bestseller</span>
                            </label>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className='px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-end gap-4'>
                        <button
                            type='button'
                            onClick={() => navigate('/admin/products')}
                            className='px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition'
                        >
                            Cancel
                        </button>
                        <button
                            type='submit'
                            disabled={loading}
                            className='px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50'
                        >
                            {loading
                                ? (isEditMode ? 'Updating Product...' : 'Adding Product...')
                                : (isEditMode ? 'Update Product' : 'Add Product')
                            }
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default AddProduct
