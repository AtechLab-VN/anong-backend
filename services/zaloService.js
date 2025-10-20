const axios = require('axios');

// Zalo notification service
const zaloService = {
  // Send notification to Zalo
  async sendNotification(contactData) {
    try {
      const zaloWebhookUrl = process.env.ZALO_WEBHOOK_URL;
      const zaloAccessToken = process.env.ZALO_ACCESS_TOKEN;
      
      if (!zaloWebhookUrl && !zaloAccessToken) {
        console.log('Zalo notification skipped: No webhook URL or access token configured');
        return { success: true, message: 'Zalo notification skipped' };
      }

      const subjectMap = {
        'product-inquiry': 'Hỏi về sản phẩm',
        'order-support': 'Hỗ trợ đơn hàng',
        'technical-support': 'Hỗ trợ kỹ thuật',
        'partnership': 'Hợp tác kinh doanh',
        'feedback': 'Góp ý',
        'other': 'Khác'
      };

      const subjectText = subjectMap[contactData.subject] || contactData.subject;
      const currentTime = new Date().toLocaleString('vi-VN');

      // Message content for Zalo
      const message = `🔔 *LIÊN HỆ MỚI*

👤 *Khách hàng:* ${contactData.name}
📧 *Email:* ${contactData.email}
📞 *SĐT:* ${contactData.phone}
📋 *Chủ đề:* ${subjectText}

💬 *Nội dung:*
${contactData.message}

⏰ *Thời gian:* ${currentTime}

---
📱 *Anong Website*`;

      // Send to Zalo webhook if configured
      if (zaloWebhookUrl) {
        try {
          await axios.post(zaloWebhookUrl, {
            text: message,
            contactData: contactData
          });
          console.log('Zalo webhook notification sent successfully');
        } catch (webhookError) {
          console.error('Error sending to Zalo webhook:', webhookError);
        }
      }

      // Send to Zalo API if access token is configured
      if (zaloAccessToken) {
        try {
          // This is a simplified example - you'll need to implement based on Zalo API documentation
          const zaloApiUrl = 'https://openapi.zalo.me/v2.0/oa/message';
          
          await axios.post(zaloApiUrl, {
            recipient: {
              user_id: process.env.ZALO_USER_ID // ID của bạn trên Zalo
            },
            message: {
              text: message
            }
          }, {
            headers: {
              'access_token': zaloAccessToken,
              'Content-Type': 'application/json'
            }
          });
          
          console.log('Zalo API notification sent successfully');
        } catch (apiError) {
          console.error('Error sending to Zalo API:', apiError);
        }
      }

      return { success: true, message: 'Zalo notification sent' };
    } catch (error) {
      console.error('Error sending Zalo notification:', error);
      // Don't throw error to avoid breaking the main flow
      return { success: false, error: error.message };
    }
  }
};

module.exports = { zaloService };
