import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all products with filters
export const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      category,
      subCategory,
      bestseller,
      sort = 'newest'
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    // Build where clause
    const where = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (category) {
      where.category = category;
    }

    if (subCategory) {
      where.subCategory = subCategory;
    }

    if (bestseller === 'true') {
      where.bestseller = true;
    }

    // Build orderBy clause
    let orderBy = { date: 'desc' }; // Default: newest first

    if (sort === 'price_asc') {
      orderBy = { price: 'asc' };
    } else if (sort === 'price_desc') {
      orderBy = { price: 'desc' };
    }

    // Get products and total count
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take
      }),
      prisma.product.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        items: products,
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products'
    });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) }
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product'
    });
  }
};

// Create new product (Admin only)
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      image,
      category,
      subCategory,
      sizes,
      bestseller = false
    } = req.body;

    // Validate required fields
    if (!name || !description || !price || !image || !category || !subCategory || !sizes) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }

    // Validate sizes is an array
    if (!Array.isArray(sizes)) {
      return res.status(400).json({
        success: false,
        message: 'Sizes must be an array'
      });
    }

    // Create product
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        image,
        category,
        subCategory,
        sizes: JSON.stringify(sizes), // Store as JSON string
        bestseller: Boolean(bestseller),
        date: Math.floor(Date.now() / 1000) // Store as Unix timestamp in seconds
      }
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create product'
    });
  }
};

// Update product (Admin only)
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      price,
      image,
      category,
      subCategory,
      sizes,
      bestseller
    } = req.body;

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Build update data
    const updateData = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = parseFloat(price);
    if (image !== undefined) updateData.image = image;
    if (category !== undefined) updateData.category = category;
    if (subCategory !== undefined) updateData.subCategory = subCategory;
    if (sizes !== undefined) {
      if (!Array.isArray(sizes)) {
        return res.status(400).json({
          success: false,
          message: 'Sizes must be an array'
        });
      }
      updateData.sizes = JSON.stringify(sizes);
    }
    if (bestseller !== undefined) updateData.bestseller = Boolean(bestseller);

    // Update product
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: updateData
    });

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update product'
    });
  }
};

// Delete product (Admin only)
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: parseInt(id) }
    });

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Delete product
    await prisma.product.delete({
      where: { id: parseInt(id) }
    });

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete product'
    });
  }
};