const express = require('express');
const router = express.Router();
const { contactService } = require('../services/firebaseContact');
const { emailService } = require('../services/emailService');
const { zaloService } = require('../services/zaloService');
const { body, validationResult } = require('express-validator');

// GET /api/contact - Lấy thông tin liên hệ
router.get('/', async (req, res) => {
  try {
    const contactInfo = await contactService.getContactInfo();
    
    res.json({
      success: true,
      data: contactInfo
    });
  } catch (error) {
    console.error('Error fetching contact info:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi lấy thông tin liên hệ'
    });
  }
});

// PUT /api/contact - Cập nhật thông tin liên hệ (Admin only)
router.put('/', [
  body('companyName').notEmpty().withMessage('Tên công ty là bắt buộc'),
  body('email').isEmail().withMessage('Email không hợp lệ'),
  body('phone').notEmpty().withMessage('Số điện thoại là bắt buộc'),
  body('address.street').notEmpty().withMessage('Địa chỉ đường là bắt buộc'),
  body('address.ward').notEmpty().withMessage('Phường/xã là bắt buộc'),
  body('address.district').notEmpty().withMessage('Quận/huyện là bắt buộc'),
  body('address.city').notEmpty().withMessage('Thành phố là bắt buộc'),
  body('address.postalCode').notEmpty().withMessage('Mã bưu điện là bắt buộc'),
  body('description').notEmpty().withMessage('Mô tả công ty là bắt buộc')
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
    
    const contactInfo = await contactService.updateContactInfo(req.body);
    
    res.json({
      success: true,
      message: 'Cập nhật thông tin liên hệ thành công',
      data: contactInfo
    });
  } catch (error) {
    console.error('Error updating contact info:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi cập nhật thông tin liên hệ'
    });
  }
});

// POST /api/contact/init - Tạo thông tin liên hệ ban đầu (Admin only)
router.post('/init', async (req, res) => {
  try {
    const contactInfo = await contactService.createInitialContact();
    
    res.status(201).json({
      success: true,
      message: 'Tạo thông tin liên hệ ban đầu thành công',
      data: contactInfo
    });
  } catch (error) {
    console.error('Error creating initial contact:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi tạo thông tin liên hệ ban đầu'
    });
  }
});

// POST /api/contact/submit - Xử lý form liên hệ
router.post('/submit', [
  body('name').notEmpty().withMessage('Họ và tên là bắt buộc'),
  body('email').isEmail().withMessage('Email không hợp lệ'),
  body('phone').notEmpty().withMessage('Số điện thoại là bắt buộc'),
  body('subject').notEmpty().withMessage('Chủ đề là bắt buộc'),
  body('message').notEmpty().withMessage('Nội dung tin nhắn là bắt buộc')
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

    const { name, email, phone, subject, message } = req.body;

    // Lấy thông tin liên hệ từ database để lấy email admin
    const contactInfo = await contactService.getContactInfo();
    const adminEmail = contactInfo.email;

    // Gửi email thông báo cho admin
    try {
      await emailService.sendContactNotification(req.body, adminEmail);
      console.log('Email notification sent to admin');
    } catch (emailError) {
      console.error('Error sending email notification:', emailError);
      // Không dừng quá trình nếu email lỗi
    }

    // Gửi thông báo Zalo
    try {
      await zaloService.sendNotification(req.body);
      console.log('Zalo notification sent');
    } catch (zaloError) {
      console.error('Error sending Zalo notification:', zaloError);
      // Không dừng quá trình nếu Zalo lỗi
    }

    // Gửi email tự động phản hồi cho khách hàng
    try {
      await emailService.sendAutoReply(email, name);
      console.log('Auto-reply email sent to customer');
    } catch (autoReplyError) {
      console.error('Error sending auto-reply:', autoReplyError);
      // Không dừng quá trình nếu auto-reply lỗi
    }

    res.json({
      success: true,
      message: 'Gửi liên hệ thành công! Chúng tôi sẽ phản hồi sớm nhất.'
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server khi xử lý form liên hệ'
    });
  }
});

module.exports = router;
