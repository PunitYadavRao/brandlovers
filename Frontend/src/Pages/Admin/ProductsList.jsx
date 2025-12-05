import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminService } from '../../services/api'
import { toast } from 'react-toastify'
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi'

const ProductsList = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        fetchProducts()
    }, [page, searchQuery])

    const fetchProducts = async () => {
        try {
            setLoading(true)
            const response = await adminService.getProducts({
                page,
                limit: 20,
                search: searchQuery
            })
            setProducts(response.data.items)
            setTotalPages(response.data.totalPages)
        } catch (error) {
            console.error('Error fetching products:', error)
            toast.error('Failed to fetch products')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id, name) => {
        if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
            return
        }

        try {
            await adminService.deleteProduct(id)
            toast.success('Product deleted successfully')
            fetchProducts()
        } catch (error) {
            console.error('Error deleting product:', error)
            toast.error('Failed to delete product')
        }
    }

    const handleSearch = (e) => {
        e.preventDefault()
        setPage(1)
        fetchProducts()
    }

    return (
        <div className='space-y-6'>
            {/* Header */}
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-2xl font-bold text-gray-900'>Products</h1>
                    <p className='text-gray-600 mt-1'>Manage your product collection</p>
                </div>
                <button
                    onClick={() => navigate('/admin/products/add')}
                    className='flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition'
                >
                    <FiPlus className='w-5 h-5' />
                    Add Product
                </button>
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} className='flex gap-2'>
                <div className='flex-1 relative'>
                    <FiSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5' />
                    <input
                        type='text'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder='Search products...'
                        className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-700'
                    />
                </div>
                <button
                    type='submit'
                    className='px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition'
                >
                    Search
                </button>
            </form>

            {/* Products Table */}
            <div className='bg-white rounded-lg shadow overflow-hidden'>
                {loading ? (
                    <div className='p-8 text-center text-gray-500'>Loading products...</div>
                ) : products.length === 0 ? (
                    <div className='p-8 text-center text-gray-500'>
                        No products found. Add your first product to get started.
                    </div>
                ) : (
                    <div className='overflow-x-auto'>
                        <table className='w-full'>
                            <thead className='bg-gray-50 border-b border-gray-200'>
                                <tr>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                        Product
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                        Category
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                        Price
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                        Sizes
                                    </th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                        Status
                                    </th>
                                    <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-gray-200'>
                                {products.map((product) => (
                                    <tr key={product.id} className='hover:bg-gray-50'>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <div className='flex items-center gap-3'>
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className='w-12 h-12 object-cover rounded'
                                                    onError={(e) => {
                                                        e.target.src = 'https://via.placeholder.com/48'
                                                    }}
                                                />
                                                <div>
                                                    <div className='text-sm font-medium text-gray-900'>
                                                        {product.name}
                                                    </div>
                                                    <div className='text-sm text-gray-500'>
                                                        {product.subCategory}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <span className='text-sm text-gray-900'>{product.category}</span>
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <span className='text-sm font-medium text-gray-900'>
                                                ${parseFloat(product.price).toFixed(2)}
                                            </span>
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <div className='flex gap-1'>
                                                {JSON.parse(product.sizes).map((size) => (
                                                    <span
                                                        key={size}
                                                        className='px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded'
                                                    >
                                                        {size}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            {product.bestseller && (
                                                <span className='px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full'>
                                                    Bestseller
                                                </span>
                                            )}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                                            <div className='flex items-center justify-end gap-2'>
                                                <button
                                                    onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                                                    className='p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition'
                                                    title='Edit'
                                                >
                                                    <FiEdit2 className='w-4 h-4' />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product.id, product.name)}
                                                    className='p-2 text-red-600 hover:bg-red-50 rounded-lg transition'
                                                    title='Delete'
                                                >
                                                    <FiTrash2 className='w-4 h-4' />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className='px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between'>
                        <div className='text-sm text-gray-700'>
                            Page {page} of {totalPages}
                        </div>
                        <div className='flex gap-2'>
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className='px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed'
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className='px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed'
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductsList
