const admin = require('firebase-admin');
const serviceAccount = require('../config/firebase-service-account.json');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://anong-default-rtdb.firebaseio.com"
});

const db = admin.firestore();

const products = [
  {
    name: "Arduino MEGA2560 R3 Atmega16u2 (kèm cáp)",
    price: 335000,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
    description: "Arduino MEGA2560 R3 với 54 chân digital I/O, 16 analog inputs và 4 UARTs. Phù hợp cho các dự án phức tạp.",
    category: "Arduino",
    stock: 50,
    detailedInfo: {
      manufacturer: "Arduino",
      model: "MEGA2560 R3",
      chipset: "ATmega2560",
      operatingVoltage: "5V",
      inputVoltage: "7-12V",
      digitalPins: 54,
      analogPins: 16,
      pwmPins: 15,
      flashMemory: "256KB",
      sram: "8KB",
      eeprom: "4KB",
      clockSpeed: "16MHz",
      usbConnector: "USB-B",
      dimensions: "101.52mm x 53.3mm",
      weight: "37g",
      operatingTemperature: "-40°C to +85°C",
      features: [
        "54 digital input/output pins",
        "16 analog inputs",
        "4 UARTs (hardware serial ports)",
        "16 MHz crystal oscillator",
        "USB connection",
        "Power jack",
        "ICSP header",
        "Reset button"
      ],
      applications: [
        "Robotics projects",
        "IoT applications",
        "Home automation",
        "3D printing",
        "CNC machines",
        "Data logging"
      ],
      datasheet: "https://www.arduino.cc/en/uploads/Main/Arduino_Mega_2560_Rev3e_sch.pdf",
      pinout: "https://www.arduino.cc/en/uploads/Main/Arduino_Mega_2560_Rev3e_sch.pdf",
      tutorials: [
        "https://www.arduino.cc/en/Tutorial/HomePage",
        "https://create.arduino.cc/projecthub"
      ],
      compatibility: [
        "Arduino IDE",
        "PlatformIO",
        "Arduino Web Editor",
        "Arduino CLI"
      ]
    },
    isActive: true,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    name: "Arduino UNO R3 DIP (kèm cáp)",
    price: 110000,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
    description: "Arduino UNO R3 với ATmega328P, 14 chân digital I/O và 6 analog inputs. Lý tưởng cho người mới bắt đầu.",
    category: "Arduino",
    stock: 100,
    detailedInfo: {
      manufacturer: "Arduino",
      model: "UNO R3",
      chipset: "ATmega328P",
      operatingVoltage: "5V",
      inputVoltage: "7-12V",
      digitalPins: 14,
      analogPins: 6,
      pwmPins: 6,
      flashMemory: "32KB",
      sram: "2KB",
      eeprom: "1KB",
      clockSpeed: "16MHz",
      usbConnector: "USB-B",
      dimensions: "68.6mm x 53.4mm",
      weight: "25g",
      operatingTemperature: "-40°C to +85°C",
      features: [
        "14 digital input/output pins",
        "6 analog inputs",
        "6 PWM outputs",
        "16 MHz crystal oscillator",
        "USB connection",
        "Power jack",
        "ICSP header",
        "Reset button"
      ],
      applications: [
        "Learning electronics",
        "Prototyping",
        "Simple automation",
        "Sensor projects",
        "LED control",
        "Motor control"
      ],
      datasheet: "https://www.arduino.cc/en/uploads/Main/Arduino_Uno_Rev3-schematic.pdf",
      pinout: "https://www.arduino.cc/en/uploads/Main/Arduino_Uno_Rev3-schematic.pdf",
      tutorials: [
        "https://www.arduino.cc/en/Tutorial/HomePage",
        "https://create.arduino.cc/projecthub"
      ],
      compatibility: [
        "Arduino IDE",
        "PlatformIO",
        "Arduino Web Editor",
        "Arduino CLI"
      ]
    },
    isActive: true,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    name: "Arduino nano V3.0 ATmega328P",
    price: 65000,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
    description: "Arduino Nano nhỏ gọn với đầy đủ tính năng của UNO, phù hợp cho các dự án cần kích thước nhỏ.",
    category: "Arduino",
    stock: 80,
    detailedInfo: {
      manufacturer: "Arduino",
      model: "Nano V3.0",
      chipset: "ATmega328P",
      operatingVoltage: "5V",
      inputVoltage: "7-12V",
      digitalPins: 14,
      analogPins: 8,
      pwmPins: 6,
      flashMemory: "32KB",
      sram: "2KB",
      eeprom: "1KB",
      clockSpeed: "16MHz",
      usbConnector: "Mini USB",
      dimensions: "45mm x 18mm",
      weight: "7g",
      operatingTemperature: "-40°C to +85°C",
      features: [
        "14 digital input/output pins",
        "8 analog inputs",
        "6 PWM outputs",
        "16 MHz crystal oscillator",
        "Mini USB connection",
        "ICSP header",
        "Reset button",
        "Compact size"
      ],
      applications: [
        "Wearable projects",
        "Portable devices",
        "IoT sensors",
        "Mini robots",
        "Embedded systems",
        "Prototyping"
      ],
      datasheet: "https://www.arduino.cc/en/uploads/Main/Arduino_Nano-Rev3.2-SCH.pdf",
      pinout: "https://www.arduino.cc/en/uploads/Main/Arduino_Nano-Rev3.2-SCH.pdf",
      tutorials: [
        "https://www.arduino.cc/en/Tutorial/HomePage",
        "https://create.arduino.cc/projecthub"
      ],
      compatibility: [
        "Arduino IDE",
        "PlatformIO",
        "Arduino Web Editor",
        "Arduino CLI"
      ]
    },
    isActive: true,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    name: "Module SIM 4G A7680C (thay thế SIM800/SIM800L)",
    price: 225000,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    description: "Module 4G A7680C hỗ trợ 4G LTE, GPS, WiFi và Bluetooth. Thay thế hoàn hảo cho SIM800 series.",
    category: "Module",
    stock: 30,
    detailedInfo: {
      manufacturer: "Ai-Thinker",
      model: "A7680C",
      chipset: "A7680C",
      operatingVoltage: "3.3V - 4.2V",
      inputVoltage: "3.3V - 4.2V",
      frequency: "GSM 850/900/1800/1900MHz, LTE B1/B3/B5/B8",
      dataRate: "LTE Cat-1: 10Mbps downlink, 5Mbps uplink",
      gps: "Built-in GPS",
      wifi: "802.11 b/g/n",
      bluetooth: "Bluetooth 4.2",
      antenna: "External antenna connector",
      dimensions: "24mm x 24mm x 3mm",
      weight: "5g",
      operatingTemperature: "-40°C to +85°C",
      features: [
        "4G LTE connectivity",
        "Built-in GPS",
        "WiFi 802.11 b/g/n",
        "Bluetooth 4.2",
        "AT command interface",
        "Low power consumption",
        "Compact size"
      ],
      applications: [
        "IoT devices",
        "Asset tracking",
        "Remote monitoring",
        "Smart agriculture",
        "Vehicle tracking",
        "Industrial automation"
      ],
      datasheet: "https://docs.ai-thinker.com/_media/a7680c_datasheet_v1.0.pdf",
      pinout: "https://docs.ai-thinker.com/_media/a7680c_pinout.pdf",
      tutorials: [
        "https://docs.ai-thinker.com/a7680c",
        "https://github.com/Ai-Thinker-Open"
      ],
      compatibility: [
        "Arduino",
        "ESP32",
        "Raspberry Pi",
        "STM32"
      ]
    },
    isActive: true,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    name: "Module 4 relay 5V USB điều khiển PLC LCUS-4",
    price: 150000,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    description: "Module 4 relay 5V với điều khiển USB, phù hợp cho tự động hóa và điều khiển thiết bị.",
    category: "Module",
    stock: 25,
    detailedInfo: {
      manufacturer: "LCUS",
      model: "LCUS-4",
      chipset: "USB to Serial",
      operatingVoltage: "5V",
      inputVoltage: "5V",
      relayType: "SPDT (Single Pole Double Throw)",
      maxVoltage: "250V AC / 30V DC",
      maxCurrent: "10A",
      relayCount: 4,
      controlInterface: "USB",
      protocol: "USB HID",
      dimensions: "75mm x 55mm x 25mm",
      weight: "85g",
      operatingTemperature: "-10°C to +60°C",
      features: [
        "4 independent relays",
        "USB control interface",
        "LED indicators",
        "Optical isolation",
        "High switching capacity",
        "Easy to use"
      ],
      applications: [
        "Home automation",
        "Industrial control",
        "Lighting control",
        "Motor control",
        "Security systems",
        "HVAC control"
      ],
      datasheet: "https://www.lcus.com/datasheet/lcus-4-relay-module.pdf",
      pinout: "https://www.lcus.com/pinout/lcus-4-relay-module.pdf",
      tutorials: [
        "https://www.lcus.com/tutorials/relay-module",
        "https://github.com/lcus/relay-module"
      ],
      compatibility: [
        "Windows",
        "Linux",
        "macOS",
        "Arduino",
        "Raspberry Pi"
      ]
    },
    isActive: true,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    name: "Cảm biến khoảng cách bằng tia laser TOF400F 4M",
    price: 270000,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    description: "Cảm biến khoảng cách laser TOF400F với độ chính xác cao, đo được khoảng cách lên đến 4m.",
    category: "Cảm biến",
    stock: 20,
    detailedInfo: {
      manufacturer: "Benewake",
      model: "TOF400F",
      chipset: "VL53L0X",
      operatingVoltage: "3.3V - 5V",
      inputVoltage: "3.3V - 5V",
      measuringRange: "0.1m - 4m",
      accuracy: "±1mm",
      resolution: "1mm",
      measuringSpeed: "50Hz",
      laserWavelength: "940nm",
      laserClass: "Class 1",
      interface: "I2C",
      dimensions: "20mm x 20mm x 10mm",
      weight: "3g",
      operatingTemperature: "-10°C to +60°C",
      features: [
        "High accuracy laser ranging",
        "I2C interface",
        "Low power consumption",
        "Compact size",
        "Fast measurement",
        "Multiple targets detection"
      ],
      applications: [
        "Robotics navigation",
        "Obstacle avoidance",
        "Level measurement",
        "Security systems",
        "Industrial automation",
        "Smart home"
      ],
      datasheet: "https://www.benewake.com/download/TOF400F_Datasheet.pdf",
      pinout: "https://www.benewake.com/download/TOF400F_Pinout.pdf",
      tutorials: [
        "https://www.benewake.com/tutorials/tof400f",
        "https://github.com/benewake/tof400f"
      ],
      compatibility: [
        "Arduino",
        "ESP32",
        "Raspberry Pi",
        "STM32"
      ]
    },
    isActive: true,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    name: "Màn hình cảm ứng TFT 4 inch SPI ST7796S",
    price: 420000,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    description: "Màn hình cảm ứng TFT 4 inch với độ phân giải 480x320, giao tiếp SPI, hỗ trợ cảm ứng.",
    category: "Màn hình",
    stock: 15,
    detailedInfo: {
      manufacturer: "STMicroelectronics",
      model: "ST7796S",
      chipset: "ST7796S",
      screenSize: "4 inch",
      resolution: "480 x 320",
      displayType: "TFT LCD",
      colorDepth: "16-bit (65K colors)",
      interface: "SPI",
      touchType: "Resistive",
      operatingVoltage: "3.3V - 5V",
      backlight: "LED",
      viewingAngle: "160°",
      brightness: "400 cd/m²",
      contrast: "500:1",
      dimensions: "85mm x 55mm x 8mm",
      weight: "45g",
      operatingTemperature: "-20°C to +70°C",
      features: [
        "High resolution display",
        "SPI interface",
        "Resistive touch",
        "LED backlight",
        "Wide viewing angle",
        "Low power consumption"
      ],
      applications: [
        "Embedded systems",
        "Industrial HMI",
        "IoT displays",
        "Medical devices",
        "Automotive displays",
        "Consumer electronics"
      ],
      datasheet: "https://www.st.com/resource/en/datasheet/st7796s.pdf",
      pinout: "https://www.st.com/resource/en/pinout/st7796s.pdf",
      tutorials: [
        "https://www.st.com/en/display-ics/st7796s.html",
        "https://github.com/stmicroelectronics/st7796s"
      ],
      compatibility: [
        "Arduino",
        "ESP32",
        "Raspberry Pi",
        "STM32"
      ]
    },
    isActive: true,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  },
  {
    name: "Mạch giảm áp Buck DC-DC LM2596 3A",
    price: 15000,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    description: "Mạch giảm áp DC-DC LM2596 với dòng tối đa 3A, hiệu suất cao, có thể điều chỉnh điện áp đầu ra.",
    category: "Linh kiện",
    stock: 200,
    detailedInfo: {
      manufacturer: "Texas Instruments",
      model: "LM2596",
      chipset: "LM2596",
      inputVoltage: "4.5V - 40V",
      outputVoltage: "1.25V - 37V (adjustable)",
      maxCurrent: "3A",
      efficiency: "92%",
      switchingFrequency: "150kHz",
      operatingTemperature: "-40°C to +125°C",
      protection: "Over-current, Over-temperature",
      package: "TO-263-5",
      dimensions: "45mm x 20mm x 15mm",
      weight: "8g",
      features: [
        "High efficiency switching",
        "Adjustable output voltage",
        "Over-current protection",
        "Over-temperature protection",
        "Low dropout voltage",
        "Wide input voltage range"
      ],
      applications: [
        "Power supplies",
        "Battery chargers",
        "LED drivers",
        "Motor control",
        "Industrial equipment",
        "Automotive electronics"
      ],
      datasheet: "https://www.ti.com/lit/ds/symlink/lm2596.pdf",
      pinout: "https://www.ti.com/lit/ds/symlink/lm2596.pdf",
      tutorials: [
        "https://www.ti.com/product/LM2596",
        "https://github.com/ti-simplelink/lm2596"
      ],
      compatibility: [
        "Universal",
        "Arduino",
        "ESP32",
        "Raspberry Pi"
      ]
    },
    isActive: true,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp()
  }
];

const setupFirebase = async () => {
  try {
    console.log('🚀 Bắt đầu thiết lập Firebase Firestore...');
    
    // Clear existing products
    const productsRef = db.collection('products');
    const snapshot = await productsRef.get();
    
    if (!snapshot.empty) {
      const batch = db.batch();
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      console.log('🗑️ Đã xóa dữ liệu cũ');
    }

    // Add new products
    const batch = db.batch();
    products.forEach(product => {
      const docRef = productsRef.doc();
      batch.set(docRef, product);
    });
    
    await batch.commit();
    console.log(`✅ Đã thêm ${products.length} sản phẩm vào Firestore`);

    // Show some statistics
    const categories = [...new Set(products.map(p => p.category))];
    
    console.log('\n📊 Thống kê Firebase Firestore:');
    console.log(`- Tổng số sản phẩm: ${products.length}`);
    console.log(`- Số danh mục: ${categories.length}`);
    console.log(`- Danh mục: ${categories.join(', ')}`);
    
    // Create initial contact info
    const { contactService } = require('../services/firebaseContact');
    await contactService.createInitialContact();
    console.log('✅ Đã tạo thông tin liên hệ ban đầu');
    
    console.log('\n🎉 Thiết lập Firebase Firestore hoàn tất!');
    console.log('💡 Bạn có thể chạy backend server với: npm run dev');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi khi thiết lập Firebase:', error);
    console.log('\n💡 Hướng dẫn khắc phục:');
    console.log('1. Kiểm tra file firebase-service-account.json');
    console.log('2. Đảm bảo Firebase project đã được tạo');
    console.log('3. Kiểm tra Firestore đã được enable');
    process.exit(1);
  }
};

setupFirebase();