# Anong Backend

Backend API cho website bán hàng Arduino & IoT của dự án Anong.

## Tính năng

- RESTful API cho sản phẩm
- API quản lý đơn hàng
- API liên hệ và hỗ trợ
- Tích hợp Firebase
- Tích hợp MongoDB Atlas
- Email service
- Zalo service

## Công nghệ sử dụng

- Node.js
- Express.js
- MongoDB với Mongoose
- Firebase Admin SDK
- Nodemailer
- CORS, Helmet, Rate Limiting

## Cài đặt

```bash
npm install
```

## Cấu hình

1. Tạo file `.env` với các biến môi trường:

```env
PORT=5000
MONGODB_URI=mongodb+srv://...
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----..."
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-...
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ZALO_ACCESS_TOKEN=your-zalo-token
```

2. Copy `firebase-service-account.example.json` thành `firebase-service-account.json` và điền thông tin Firebase.

## Chạy dự án

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## API Endpoints

### Sản phẩm
- `GET /api/products` - Lấy danh sách sản phẩm
- `GET /api/products/:id` - Lấy chi tiết sản phẩm
- `POST /api/products` - Tạo sản phẩm mới
- `PUT /api/products/:id` - Cập nhật sản phẩm
- `DELETE /api/products/:id` - Xóa sản phẩm

### Đơn hàng
- `GET /api/orders` - Lấy danh sách đơn hàng
- `POST /api/orders` - Tạo đơn hàng mới
- `PUT /api/orders/:id` - Cập nhật đơn hàng

### Liên hệ
- `POST /api/contact` - Gửi tin nhắn liên hệ

## Scripts

- `npm run setup-db` - Thiết lập database
- `npm run setup-atlas` - Thiết lập MongoDB Atlas
- `npm run setup-firebase` - Thiết lập Firebase
- `npm run check-db` - Kiểm tra kết nối database
- `npm run seed` - Seed dữ liệu mẫu

## Tác giả

Anong Team