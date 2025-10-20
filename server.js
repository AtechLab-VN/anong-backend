const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config({ path: './config.env' });

const connectDB = require('./config/database');
const corsMiddleware = require('./middleware/cors');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

// Import Firebase routes
const firebaseProductRoutes = require('./routes/firebaseProducts');
const firebaseOrderRoutes = require('./routes/firebaseOrders');
const contactRoutes = require('./routes/contact');

const app = express();

// Connect to database (only if MongoDB URI is configured)
if (process.env.MONGODB_URI && !process.env.MONGODB_URI.includes('localhost')) {
  connectDB();
} else {
  console.log('⚠️ MongoDB connection skipped - using Firebase only');
}

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Quá nhiều requests từ IP này, vui lòng thử lại sau 15 phút'
  }
});
app.use(limiter);

// CORS middleware
app.use(corsMiddleware);

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Firebase API routes
app.use('/api/firebase/products', firebaseProductRoutes);
app.use('/api/firebase/orders', firebaseOrderRoutes);

// Contact API routes
app.use('/api/contact', contactRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint không tồn tại'
  });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy trên port ${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/api/health`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  process.exit(1);
});

module.exports = app;
