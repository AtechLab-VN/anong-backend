# 🚀 Hướng dẫn Deploy lên Vercel - Chi tiết từng bước

## ❌ Các vấn đề thường gặp khi deploy Vercel

### 1. **Lỗi Secret Scanning**
- **Nguyên nhân**: GitHub phát hiện secret trong code
- **Giải pháp**: Sử dụng branch `deployment-config` (đã sạch)

### 2. **Lỗi Build Failed**
- **Nguyên nhân**: Thiếu dependencies hoặc cấu hình sai
- **Giải pháp**: Kiểm tra `package.json` và `vercel.json`

### 3. **Lỗi Environment Variables**
- **Nguyên nhân**: Chưa cấu hình biến môi trường
- **Giải pháp**: Thêm env vars trong Vercel dashboard

## 🔧 Các bước Deploy lên Vercel

### Bước 1: Chuẩn bị Repository
```bash
# Đảm bảo bạn đang ở branch deployment-config
git checkout deployment-config
git status
```

### Bước 2: Đăng ký và Connect Vercel
1. Truy cập [vercel.com](https://vercel.com)
2. Đăng nhập bằng GitHub account
3. Click "New Project"
4. Chọn repository: `AtechLab-VN/anong-backend`
5. **Quan trọng**: Chọn branch `deployment-config` thay vì `main`

### Bước 3: Cấu hình Project Settings
- **Framework Preset**: Other
- **Root Directory**: `./` (mặc định)
- **Build Command**: `npm install` (tự động detect)
- **Output Directory**: `./` (mặc định)

### Bước 4: Thêm Environment Variables
Trong Vercel dashboard, thêm các biến sau:

#### 🔐 Biến bắt buộc:
```
NODE_ENV=production
PORT=5000
```

#### 🗄️ Database (MongoDB Atlas):
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/anong-backend
```

#### 🔥 Firebase:
```
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nyour-private-key\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40your-project.iam.gserviceaccount.com
```

#### 📧 Email (Nodemailer):
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=noreply@anong.com
```

#### 🔑 JWT:
```
JWT_SECRET=your-super-secret-jwt-key-here
```

### Bước 5: Deploy
1. Click "Deploy"
2. Chờ build process (2-3 phút)
3. Kiểm tra logs nếu có lỗi

## 🚨 Troubleshooting

### Lỗi "Build Failed"
```bash
# Kiểm tra logs trong Vercel dashboard
# Thường do:
- Thiếu dependencies
- Lỗi syntax trong code
- Environment variables chưa đúng
```

### Lỗi "Function Timeout"
```json
// Trong vercel.json đã set maxDuration: 30s
// Nếu vẫn timeout, có thể do:
- Database connection chậm
- API call bên ngoài chậm
```

### Lỗi "Module Not Found"
```bash
# Kiểm tra package.json có đầy đủ dependencies
npm install
```

### Lỗi "Environment Variable Missing"
```bash
# Kiểm tra tất cả env vars đã được thêm trong Vercel dashboard
# Đặc biệt chú ý:
- MONGODB_URI
- FIREBASE_PRIVATE_KEY (format đúng)
- JWT_SECRET
```

## ✅ Kiểm tra Deploy thành công

### 1. Health Check
```
GET https://your-app.vercel.app/api/health
```

Response mong đợi:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "production"
}
```

### 2. Test API Endpoints
```
GET https://your-app.vercel.app/api/products
GET https://your-app.vercel.app/api/firebase/products
POST https://your-app.vercel.app/api/contact
```

## 🔄 Auto Deploy
Sau khi setup xong, mỗi lần push code lên branch `deployment-config`, Vercel sẽ tự động deploy.

## 💡 Tips để Deploy thành công

1. **Luôn sử dụng branch `deployment-config`** (không có secret)
2. **Test local trước**: `npm start` và test API
3. **Kiểm tra logs** trong Vercel dashboard khi có lỗi
4. **Environment variables** phải chính xác 100%
5. **Firebase private key** phải format đúng với dấu ngoặc kép

## 🆘 Nếu vẫn không được

1. **Tạo repository mới** hoàn toàn sạch
2. **Copy code** từ branch `deployment-config`
3. **Deploy từ repository mới**

---

**Chúc bạn deploy thành công! 🎉**
