const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { body, validationResult } = require('express-validator');

// GET /api/products - Lấy danh sách tất cả sản phẩm
router.get('/', async (req, res) => {
  try {
    const { category, page = 1, limit = 12, search } = req.query;
    
    // Tạo filter object
    const filter = { isActive: true };
    
    if (category && category !== 'Tất cả') {
      filter.category = category;
    }
    
    if (search) {
      filter.name = { $regex: search, $options: 'i' };
    }
    
    // Tính toán pagination
    const skip = (page - 1) * limit;
    
    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Product.countDocuments(filter);
    
    res.json({
      success: true,
      data: products,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalProducts: total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi lấy danh sách sản phẩm'
    });
  }
});

// GET /api/products/categories - Lấy danh sách danh mục
router.get('/categories', async (req, res) => {
  try {
    const categories = await Product.distinct('category', { isActive: true });
    res.json({
      success: true,
      data: ['Tất cả', ...categories]
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi lấy danh mục'
    });
  }
});

// GET /api/products/:id - Lấy chi tiết sản phẩm
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm'
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
      message: 'Lỗi server khi lấy thông tin sản phẩm'
    });
  }
});

// POST /api/products - Tạo sản phẩm mới (Admin only)
router.post('/', [
  body('name').notEmpty().withMessage('Tên sản phẩm là bắt buộc'),
  body('price').isNumeric().withMessage('Giá sản phẩm phải là số'),
  body('description').notEmpty().withMessage('Mô tả sản phẩm là bắt buộc'),
  body('image').isURL().withMessage('URL hình ảnh không hợp lệ'),
  body('category').notEmpty().withMessage('Danh mục sản phẩm là bắt buộc'),
  body('stock').isInt({ min: 0 }).withMessage('Số lượng tồn kho phải là số nguyên dương')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Dữ liệu không hợp lệ',
        errors: errors.array()
      });
    }
    
    const product = new Product(req.body);
    await product.save();
    
    res.status(201).json({
      success: true,
      message: 'Tạo sản phẩm thành công',
      data: product
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi tạo sản phẩm'
    });
  }
});

// PUT /api/products/:id - Cập nhật sản phẩm (Admin only)
router.put('/:id', [
  body('name').optional().notEmpty().withMessage('Tên sản phẩm không được để trống'),
  body('price').optional().isNumeric().withMessage('Giá sản phẩm phải là số'),
  body('description').optional().notEmpty().withMessage('Mô tả sản phẩm không được để trống'),
  body('image').optional().isURL().withMessage('URL hình ảnh không hợp lệ'),
  body('category').optional().notEmpty().withMessage('Danh mục sản phẩm không được để trống'),
  body('stock').optional().isInt({ min: 0 }).withMessage('Số lượng tồn kho phải là số nguyên dương')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Dữ liệu không hợp lệ',
        errors: errors.array()
      });
    }
    
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm'
      });
    }
    
    res.json({
      success: true,
      message: 'Cập nhật sản phẩm thành công',
      data: product
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi cập nhật sản phẩm'
    });
  }
});

// DELETE /api/products/:id - Xóa sản phẩm (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy sản phẩm'
      });
    }
    
    res.json({
      success: true,
      message: 'Xóa sản phẩm thành công'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi xóa sản phẩm'
    });
  }
});

module.exports = router;
