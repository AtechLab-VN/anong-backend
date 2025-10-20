const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config({ path: '../config.env' });

const checkDatabase = async () => {
  try {
    console.log('🔍 Kiểm tra database...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/icdayroi');
    console.log('✅ Đã kết nối MongoDB');

    // Check if database has products
    const totalProducts = await Product.countDocuments();
    
    if (totalProducts === 0) {
      console.log('⚠️ Database trống! Chạy script setup để thêm dữ liệu:');
      console.log('   node scripts/setupDatabase.js');
      return;
    }

    // Show statistics
    const categories = await Product.distinct('category');
    const products = await Product.find({}, 'name category price stock').limit(5);
    
    console.log('\n📊 Thống kê database:');
    console.log(`- Tổng số sản phẩm: ${totalProducts}`);
    console.log(`- Số danh mục: ${categories.length}`);
    console.log(`- Danh mục: ${categories.join(', ')}`);
    
    console.log('\n📦 Một số sản phẩm mẫu:');
    products.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - ${product.price.toLocaleString('vi-VN')}₫ (${product.category})`);
    });
    
    console.log('\n✅ Database đã sẵn sàng!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi khi kiểm tra database:', error);
    console.log('\n💡 Hướng dẫn khắc phục:');
    console.log('1. Đảm bảo MongoDB đã được cài đặt và chạy');
    console.log('2. Kiểm tra file config.env có đúng không');
    console.log('3. Chạy: node scripts/setupDatabase.js');
    process.exit(1);
  }
};

checkDatabase();
