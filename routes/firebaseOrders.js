const express = require('express');
const router = express.Router();
const { orderService } = require('../services/firebase');
const { body, validationResult } = require('express-validator');

// GET /api/firebase/orders - Lấy danh sách đơn hàng (Admin only)
router.get('/', async (req, res) => {
  try {
    const { status } = req.query;
    
    const filters = {};
    if (status) filters.status = status;
    
    const orders = await orderService.getOrders(filters);
    
    res.json({
      success: true,
      data: orders,
      total: orders.length
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi lấy danh sách đơn hàng'
    });
  }
});

// GET /api/firebase/orders/:id - Lấy chi tiết đơn hàng
router.get('/:id', async (req, res) => {
  try {
    const order = await orderService.getOrder(req.params.id);
    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(404).json({
      success: false,
      message: 'Không tìm thấy đơn hàng'
    });
  }
});

// POST /api/firebase/orders - Tạo đơn hàng mới
router.post('/', [
  body('customer').isObject().withMessage('Thông tin khách hàng là bắt buộc'),
  body('customer.name').notEmpty().withMessage('Tên khách hàng là bắt buộc'),
  body('customer.email').isEmail().withMessage('Email không hợp lệ'),
  body('customer.phone').notEmpty().withMessage('Số điện thoại là bắt buộc'),
  body('customer.address').notEmpty().withMessage('Địa chỉ là bắt buộc'),
  body('items').isArray({ min: 1 }).withMessage('Đơn hàng phải có ít nhất 1 sản phẩm'),
  body('items.*.productId').notEmpty().withMessage('ID sản phẩm là bắt buộc'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Số lượng phải là số nguyên dương'),
  body('items.*.price').isNumeric().withMessage('Giá sản phẩm phải là số'),
  body('total').isNumeric().withMessage('Tổng tiền phải là số')
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
    
    const order = await orderService.createOrder(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Tạo đơn hàng thành công',
      data: order
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi tạo đơn hàng'
    });
  }
});

// PUT /api/firebase/orders/:id/status - Cập nhật trạng thái đơn hàng (Admin only)
router.put('/:id/status', [
  body('status').isIn(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'])
    .withMessage('Trạng thái đơn hàng không hợp lệ')
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
    
    await orderService.updateOrderStatus(req.params.id, req.body.status);
    
    res.json({
      success: true,
      message: 'Cập nhật trạng thái đơn hàng thành công'
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi cập nhật trạng thái đơn hàng'
    });
  }
});

module.exports = router;
