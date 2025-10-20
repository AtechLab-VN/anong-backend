const express = require('express');
const router = express.Router();
const { productService } = require('../services/firebase');
const { body, validationResult } = require('express-validator');

// GET /api/firebase/products - Lấy danh sách tất cả sản phẩm
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    
    const filters = {};
    if (category) filters.category = category;
    if (search) filters.search = search;
    
    const products = await productService.getProducts(filters);
    
    res.json({
      success: true,
      data: products,
      total: products.length
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi lấy danh sách sản phẩm'
    });
  }
});

// GET /api/firebase/products/categories - Lấy danh sách danh mục
router.get('/categories', async (req, res) => {
  try {
    const categories = await productService.getCategories();
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi lấy danh mục'
    });
  }
});

// GET /api/firebase/products/:id - Lấy chi tiết sản phẩm
router.get('/:id', async (req, res) => {
  try {
    const product = await productService.getProduct(req.params.id);
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(404).json({
      success: false,
      message: 'Không tìm thấy sản phẩm'
    });
  }
});

// POST /api/firebase/products - Tạo sản phẩm mới (Admin only)
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
    
    const product = await productService.createProduct(req.body);
    
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

// PUT /api/firebase/products/:id - Cập nhật sản phẩm (Admin only)
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
    
    const product = await productService.updateProduct(req.params.id, req.body);
    
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

// DELETE /api/firebase/products/:id - Xóa sản phẩm (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    await productService.deleteProduct(req.params.id);
    
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
