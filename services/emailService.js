const nodemailer = require('nodemailer');

// Email configuration
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail', // Hoặc service khác như 'outlook', 'yahoo'
    auth: {
      user: process.env.EMAIL_USER || 'your-email@gmail.com',
      pass: process.env.EMAIL_PASS || 'your-app-password'
    }
  });
};

// Email service
const emailService = {
  // Send contact form notification
  async sendContactNotification(contactData, adminEmail) {
    try {
      const transporter = createTransporter();
      
      const subjectMap = {
        'product-inquiry': 'Hỏi về sản phẩm',
        'order-support': 'Hỗ trợ đơn hàng',
        'technical-support': 'Hỗ trợ kỹ thuật',
        'partnership': 'Hợp tác kinh doanh',
        'feedback': 'Góp ý',
        'other': 'Khác'
      };

      const subjectText = subjectMap[contactData.subject] || contactData.subject;

      const mailOptions = {
        from: process.env.EMAIL_USER || 'your-email@gmail.com',
        to: adminEmail,
        subject: `[Liên hệ mới] ${subjectText} - ${contactData.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
              Thông tin liên hệ mới
            </h2>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #007bff; margin-top: 0;">Thông tin khách hàng</h3>
              <p><strong>Họ và tên:</strong> ${contactData.name}</p>
              <p><strong>Email:</strong> ${contactData.email}</p>
              <p><strong>Số điện thoại:</strong> ${contactData.phone}</p>
              <p><strong>Chủ đề:</strong> ${subjectText}</p>
            </div>
            
            <div style="background-color: #fff; padding: 20px; border: 1px solid #dee2e6; border-radius: 5px;">
              <h3 style="color: #333; margin-top: 0;">Nội dung tin nhắn</h3>
              <p style="white-space: pre-wrap; line-height: 1.6;">${contactData.message}</p>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background-color: #e9ecef; border-radius: 5px;">
              <p style="margin: 0; color: #6c757d; font-size: 14px;">
                <strong>Thời gian:</strong> ${new Date().toLocaleString('vi-VN')}
              </p>
            </div>
          </div>
        `
      };

      const result = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  },

  // Send auto-reply to customer
  async sendAutoReply(customerEmail, customerName) {
    try {
      const transporter = createTransporter();
      
      const mailOptions = {
        from: process.env.EMAIL_USER || 'your-email@gmail.com',
        to: customerEmail,
        subject: 'Cảm ơn bạn đã liên hệ - Anong',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #007bff;">Xin chào ${customerName}!</h2>
            
            <p>Cảm ơn bạn đã liên hệ với chúng tôi. Chúng tôi đã nhận được tin nhắn của bạn và sẽ phản hồi trong thời gian sớm nhất.</p>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">Thông tin liên hệ</h3>
              <p><strong>Email:</strong> ${process.env.EMAIL_USER || 'contact@anong.com'}</p>
              <p><strong>Hotline:</strong> 1900-xxxx</p>
              <p><strong>Thời gian làm việc:</strong> 8:00 - 22:00 (Thứ 2 - Chủ nhật)</p>
            </div>
            
            <p>Trân trọng,<br><strong>Đội ngũ Anong</strong></p>
          </div>
        `
      };

      const result = await transporter.sendMail(mailOptions);
      console.log('Auto-reply sent successfully:', result.messageId);
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error('Error sending auto-reply:', error);
      throw error;
    }
  }
};

module.exports = { emailService };
