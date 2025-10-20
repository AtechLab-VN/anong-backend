module.exports = {
  // Email configuration
  email: {
    service: 'gmail', // Hoặc 'outlook', 'yahoo'
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  },
  
  // Zalo configuration
  zalo: {
    webhookUrl: process.env.ZALO_WEBHOOK_URL,
    accessToken: process.env.ZALO_ACCESS_TOKEN,
    userId: process.env.ZALO_USER_ID
  }
};
