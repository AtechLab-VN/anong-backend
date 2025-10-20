const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config({ path: '../config.env' });

const products = [
  {
    name: "Arduino MEGA2560 R3 Atmega16u2 (kèm cáp)",
    price: 335000,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
    description: "Arduino MEGA2560 R3 với 54 chân digital I/O, 16 analog inputs và 4 UARTs. Phù hợp cho các dự án phức tạp.",
    category: "Arduino",
    stock: 50
  },
  {
    name: "Arduino UNO R3 DIP (kèm cáp)",
    price: 110000,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
    description: "Arduino UNO R3 với ATmega328P, 14 chân digital I/O và 6 analog inputs. Lý tưởng cho người mới bắt đầu.",
    category: "Arduino",
    stock: 100
  },
  {
    name: "Arduino nano V3.0 ATmega328P",
    price: 65000,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
    description: "Arduino Nano nhỏ gọn với đầy đủ tính năng của UNO, phù hợp cho các dự án cần kích thước nhỏ.",
    category: "Arduino",
    stock: 80
  },
  {
    name: "Module SIM 4G A7680C (thay thế SIM800/SIM800L)",
    price: 225000,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    description: "Module 4G A7680C hỗ trợ 4G LTE, GPS, WiFi và Bluetooth. Thay thế hoàn hảo cho SIM800 series.",
    category: "Module",
    stock: 30
  },
  {
    name: "Module 4 relay 5V USB điều khiển PLC LCUS-4",
    price: 150000,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    description: "Module 4 relay 5V với điều khiển USB, phù hợp cho tự động hóa và điều khiển thiết bị.",
    category: "Module",
    stock: 25
  },
  {
    name: "Module 2 relay 5V USB điều khiển PLC LCUS-2",
    price: 100000,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    description: "Module 2 relay 5V với điều khiển USB, thiết kế nhỏ gọn cho các ứng dụng đơn giản.",
    category: "Module",
    stock: 40
  },
  {
    name: "Cảm biến khoảng cách bằng tia laser TOF400F 4M",
    price: 270000,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    description: "Cảm biến khoảng cách laser TOF400F với độ chính xác cao, đo được khoảng cách lên đến 4m.",
    category: "Cảm biến",
    stock: 20
  },
  {
    name: "Màn hình cảm ứng TFT 4 inch SPI ST7796S",
    price: 420000,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    description: "Màn hình cảm ứng TFT 4 inch với độ phân giải 480x320, giao tiếp SPI, hỗ trợ cảm ứng.",
    category: "Màn hình",
    stock: 15
  },
  {
    name: "Màn hình cảm ứng TFT 3.5 inch SPI ILI9488",
    price: 310000,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    description: "Màn hình cảm ứng TFT 3.5 inch với độ phân giải 320x480, giao tiếp SPI, dễ sử dụng.",
    category: "Màn hình",
    stock: 35
  },
  {
    name: "Module định vị GPS GT-U12 GOOUUU TECH",
    price: 490000,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    description: "Module GPS GT-U12 với độ chính xác cao, hỗ trợ GLONASS và BeiDou, phù hợp cho IoT.",
    category: "Module",
    stock: 12
  },
  {
    name: "Camera OV2640 75 độ 20MM",
    price: 75000,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    description: "Camera OV2640 với góc nhìn 75 độ, độ phân giải 2MP, giao tiếp SPI/I2C, nhỏ gọn.",
    category: "Module",
    stock: 60
  },
  {
    name: "LCD 1602 5V xanh dương",
    price: 25000,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    description: "Màn hình LCD 16x2 với đèn nền xanh dương, giao tiếp I2C, dễ sử dụng cho hiển thị thông tin.",
    category: "Màn hình",
    stock: 100
  },
  {
    name: "Mạch giảm áp Buck DC-DC LM2596 3A",
    price: 15000,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    description: "Mạch giảm áp DC-DC LM2596 với dòng tối đa 3A, hiệu suất cao, có thể điều chỉnh điện áp đầu ra.",
    category: "Linh kiện",
    stock: 200
  },
  {
    name: "Mạch tăng áp Boost DC-DC XL6009",
    price: 20000,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    description: "Mạch tăng áp DC-DC XL6009 với dòng tối đa 4A, hiệu suất cao, phù hợp cho các ứng dụng cần điện áp cao.",
    category: "Linh kiện",
    stock: 150
  },
  {
    name: "Động cơ giảm tốc V1 + Bánh xe",
    price: 17000,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    description: "Động cơ giảm tốc V1 với bánh xe, tốc độ 200RPM, mô-men xoắn cao, phù hợp cho robot và xe tự động.",
    category: "Linh kiện",
    stock: 80
  },
  {
    name: "Module ESP32-CAM WiFi + bluetooth Camera OV2640",
    price: 180000,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    description: "Module ESP32-CAM với WiFi, Bluetooth, camera OV2640 2MP, phù hợp cho IoT và giám sát từ xa.",
    category: "Module",
    stock: 45
  }
];

const setupDatabase = async () => {
  try {
    console.log('🚀 Bắt đầu thiết lập database...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/icdayroi');
    console.log('✅ Đã kết nối MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️ Đã xóa dữ liệu cũ');

    // Insert new products
    await Product.insertMany(products);
    console.log(`✅ Đã thêm ${products.length} sản phẩm vào database`);

    // Show some statistics
    const totalProducts = await Product.countDocuments();
    const categories = await Product.distinct('category');
    
    console.log('\n📊 Thống kê database:');
    console.log(`- Tổng số sản phẩm: ${totalProducts}`);
    console.log(`- Số danh mục: ${categories.length}`);
    console.log(`- Danh mục: ${categories.join(', ')}`);
    
    console.log('\n🎉 Thiết lập database hoàn tất!');
    console.log('💡 Bạn có thể chạy backend server với: npm run dev');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi khi thiết lập database:', error);
    process.exit(1);
  }
};

setupDatabase();
