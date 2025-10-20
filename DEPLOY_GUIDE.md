# 🚀 Hướng dẫn Deploy Dự án Anong Backend lên Web Server Miễn phí

## 📋 Tổng quan
Dự án này đã được chuẩn bị để deploy lên các platform miễn phí sau:
- **Vercel** (Khuyến nghị cho Node.js)
- **Railway** 
- **Render**
- **Heroku** (có giới hạn)

## 🔧 Chuẩn bị trước khi deploy

### 1. Cấu hình Environment Variables
Sao chép file `env.example` thành `.env` và điền thông tin thực tế:

```bash
cp env.example .env
```

**Các biến môi trường quan trọng:**
- `MONGODB_URI`: Chuỗi kết nối MongoDB Atlas
- `FIREBASE_PROJECT_ID`: ID dự án Firebase
- `FIREBASE_PRIVATE_KEY`: Private key từ Firebase service account
- `EMAIL_USER`, `EMAIL_PASS`: Thông tin email để gửi mail
- `JWT_SECRET`: Secret key cho JWT

### 2. Chuẩn bị Database
- **MongoDB Atlas**: Tạo cluster miễn phí tại [MongoDB Atlas](https://www.mongodb.com/atlas)
- **Firebase**: Cấu hình Firebase project và service account

## 🌐 Các phương án Deploy

### Option 1: Vercel (Khuyến nghị) ⭐

**Ưu điểm:**
- Miễn phí hoàn toàn
- Deploy nhanh với Git
- CDN global
- Hỗ trợ Node.js tốt

**Cách deploy:**
1. Đăng ký tài khoản tại [vercel.com](https://vercel.com)
2. Kết nối GitHub repository
3. Vercel sẽ tự động detect Node.js project
4. Thêm environment variables trong Vercel dashboard
5. Deploy!

**Lưu ý:** Vercel có giới hạn 10s cho serverless functions, phù hợp cho API nhẹ.

### Option 2: Railway

**Ưu điểm:**
- Miễn phí $5 credit/tháng
- Hỗ trợ Docker
- Database tích hợp
- Deploy từ GitHub

**Cách deploy:**
1. Đăng ký tại [railway.app](https://railway.app)
2. Connect GitHub repository
3. Railway sẽ tự động detect `railway.json`
4. Thêm environment variables
5. Deploy!

### Option 3: Render

**Ưu điểm:**
- Miễn phí với giới hạn
- Hỗ trợ Docker
- Auto-deploy từ Git
- SSL tự động

**Cách deploy:**
1. Đăng ký tại [render.com](https://render.com)
2. Connect GitHub repository
3. Chọn "Web Service"
4. Render sẽ detect `render.yaml`
5. Thêm environment variables
6. Deploy!

### Option 4: Heroku

**Ưu điểm:**
- Platform phổ biến
- Add-ons phong phú
- CLI mạnh mẽ

**Nhược điểm:**
- Không còn miễn phí (từ 2022)

## 🔐 Cấu hình Security

### 1. CORS Configuration
File `middleware/cors.js` đã được cấu hình để cho phép các domain cụ thể.

### 2. Rate Limiting
Đã cấu hình rate limiting: 100 requests/15 phút per IP.

### 3. Helmet Security
Đã thêm helmet middleware cho security headers.

## 📊 Monitoring & Health Check

### Health Check Endpoint
```
GET /api/health
```

Response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "production"
}
```

## 🚨 Troubleshooting

### Lỗi thường gặp:

1. **Database Connection Error**
   - Kiểm tra MONGODB_URI
   - Đảm bảo IP được whitelist trong MongoDB Atlas

2. **Firebase Authentication Error**
   - Kiểm tra Firebase service account key
   - Đảm bảo private key được format đúng

3. **Email Service Error**
   - Kiểm tra EMAIL_USER và EMAIL_PASS
   - Sử dụng App Password cho Gmail

4. **Port Error**
   - Platform sẽ tự động set PORT environment variable
   - Code đã handle: `process.env.PORT || 5000`

## 📝 Checklist Deploy

- [ ] Cấu hình MongoDB Atlas
- [ ] Cấu hình Firebase project
- [ ] Tạo file `.env` với thông tin thực
- [ ] Test local với `npm start`
- [ ] Push code lên GitHub
- [ ] Chọn platform deploy
- [ ] Thêm environment variables
- [ ] Deploy và test API endpoints

## 🔗 API Endpoints

Sau khi deploy thành công, các endpoints sẽ có dạng:
```
https://your-app.vercel.app/api/health
https://your-app.vercel.app/api/products
https://your-app.vercel.app/api/orders
https://your-app.vercel.app/api/firebase/products
https://your-app.vercel.app/api/firebase/orders
https://your-app.vercel.app/api/contact
```

## 💡 Tips

1. **Sử dụng Vercel** cho project nhỏ, API đơn giản
2. **Sử dụng Railway** nếu cần database và tính năng phức tạp hơn
3. **Monitor logs** thường xuyên để debug
4. **Backup database** định kỳ
5. **Sử dụng CDN** cho static files

---

**Chúc bạn deploy thành công! 🎉**
