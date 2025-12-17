# 🚀 Hướng Dẫn Deploy Henei Dimsum lên Vercel

## 📋 Tổng Quan

Deploy fullstack app (React + Node.js) lên Vercel với 2 projects riêng biệt:
- **Backend**: Serverless functions
- **Frontend**: Static site với React

---

## ✅ Yêu Cầu Trước Khi Deploy

- [ ] Tài khoản GitHub
- [ ] Repository đã push code lên GitHub
- [ ] Tài khoản Vercel (đăng ký tại [vercel.com](https://vercel.com))
- [ ] MongoDB Atlas đã setup (xem [DEPLOY.md](./DEPLOY.md#mongodb-atlas))

---

## 🔐 Bước 1: Chuẩn Bị Environment Variables

### Backend Environment Variables:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/heneidimsum?retryWrites=true&w=majority
NODE_ENV=production
JWT_SECRET=your_super_secret_random_string_here
PORT=5000
```

### Frontend Environment Variables:
```env
REACT_APP_API_URL=https://your-backend.vercel.app/api
```

**💡 Tip**: Tạo JWT secret ngẫu nhiên:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🚀 Bước 2: Deploy Backend

### Qua Vercel Dashboard:

1. Đăng nhập [Vercel](https://vercel.com)
2. Click **Add New... > Project**
3. **Import Git Repository**:
   - Kết nối GitHub lần đầu
   - Chọn repository `henei-dimsum`
4. **Configure Project**:
   ```
   Project Name: henei-dimsum-backend
   Framework: Other
   Root Directory: backend ⚠️
   Build Command: (leave empty)
   Output Directory: (leave empty)
   ```
5. **Environment Variables** - Click "Add" và thêm:
   ```
   MONGO_URI = [paste your MongoDB connection string]
   NODE_ENV = production
   JWT_SECRET = [your generated secret]
   PORT = 5000
   ```
6. Click **Deploy** ⚡

### ✅ Kết Quả:
- URL Backend: `https://henei-dimsum-backend.vercel.app`
- Test: `https://henei-dimsum-backend.vercel.app/api/dishes`

---

## 🎨 Bước 3: Deploy Frontend

### Qua Vercel Dashboard:

1. Quay lại [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New... > Project**
3. **Import** lại repository `henei-dimsum`
4. **Configure Project**:
   ```
   Project Name: henei-dimsum (hoặc henei-dimsum-frontend)
   Framework: Create React App
   Root Directory: frontend ⚠️
   Build Command: npm run build
   Output Directory: build
   ```
5. **Environment Variables**:
   ```
   REACT_APP_API_URL = https://henei-dimsum-backend.vercel.app/api
   ```
   ⚠️ Thay bằng URL backend thực tế từ Bước 2
6. Click **Deploy** ⚡

### ✅ Kết Quả:
- URL Frontend: `https://henei-dimsum.vercel.app`

---

## 🔧 Bước 4: Cập Nhật CORS

Sau khi deploy frontend, cần cập nhật backend cho phép frontend gọi API:

### Option 1: Thêm Environment Variable

1. Vào **Backend Project** trên Vercel
2. **Settings > Environment Variables**
3. Add variable:
   ```
   FRONTEND_URL = https://henei-dimsum.vercel.app
   ```
4. **Deployments** tab > Redeploy latest

### Option 2: Cập nhật code (khuyên dùng)

Update `backend/server.js`:
```javascript
const cors = require('cors');

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
```

Push code lên GitHub → Vercel tự động redeploy

---

## 🧪 Bước 5: Test Deployment

### Test Backend:
```bash
# Test GET dishes
curl https://henei-dimsum-backend.vercel.app/api/dishes

# Test với browser
https://henei-dimsum-backend.vercel.app/api/promotions
```

### Test Frontend:
1. Mở `https://henei-dimsum.vercel.app`
2. Kiểm tra các trang:
   - ✅ Home page
   - ✅ Menu page (xem món ăn)
   - ✅ Cart (thêm món)
   - ✅ Reservations
   - ✅ Pre-orders
3. Mở Developer Console (F12) - không có lỗi CORS

---

## 🔄 Deploy Lại (Redeploy)

### Tự Động:
- Push code lên branch `main` → Auto deploy production
- Push lên branch khác → Deploy preview

### Thủ Công:
1. Vào project trên Vercel
2. **Deployments** tab
3. Chọn deployment > **...** > **Redeploy**

---

## 📊 Bước 6: Seed Database (Quan Trọng!)

Sau khi deploy backend, cần import dữ liệu:

### Cách 1: Local Import (Khuyên dùng)

```bash
# Update backend/.env với production MongoDB URI
MONGO_URI=mongodb+srv://...

# Run import script
cd backend
node importData.js

# Seed admin account
node scripts/seedAdmin.js
```

### Cách 2: Qua Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Link to project
cd backend
vercel link

# Run command
vercel env pull .env.local
node importData.js
```

---

## 🎯 Custom Domain (Tùy Chọn)

### Thêm Domain Cho Frontend:

1. **Frontend Project** > **Settings** > **Domains**
2. Add domain: `heneidimsum.com`
3. Cấu hình DNS theo hướng dẫn Vercel:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
4. Wait for DNS propagation (5-60 phút)

### Thêm Domain Cho Backend:

1. **Backend Project** > **Settings** > **Domains**
2. Add subdomain: `api.heneidimsum.com`
3. Update frontend env:
   ```
   REACT_APP_API_URL = https://api.heneidimsum.com/api
   ```

---

## 🐛 Troubleshooting

### ❌ Lỗi: "Internal Server Error"
**Giải pháp:**
1. Check Vercel logs: Project > Deployments > Latest > Logs
2. Verify environment variables
3. Check MongoDB connection string

### ❌ Lỗi CORS
**Giải pháp:**
1. Verify `FRONTEND_URL` trong backend env vars
2. Check backend `server.js` có `cors()` middleware
3. Redeploy backend

### ❌ Frontend không load dữ liệu
**Giải pháp:**
1. Check `REACT_APP_API_URL` trong frontend env vars
2. Test backend API trực tiếp: `https://backend-url/api/dishes`
3. Check browser console for errors

### ❌ Build Failed
**Giải pháp:**
1. Verify `Root Directory` đúng (`frontend` hoặc `backend`)
2. Check `package.json` có đầy đủ dependencies
3. Try build locally: `npm run build`

---

## 📝 Checklist Hoàn Thành

- [ ] MongoDB Atlas đã setup
- [ ] Backend deployed thành công
- [ ] Backend API test OK
- [ ] Frontend deployed thành công
- [ ] Frontend connect được với backend
- [ ] Data đã import vào database
- [ ] Admin account đã seed
- [ ] CORS đã cấu hình đúng
- [ ] Test toàn bộ features trên production

---

## 🔗 Links Quan Trọng

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas**: https://cloud.mongodb.com
- **Backend Project**: `https://vercel.com/[username]/henei-dimsum-backend`
- **Frontend Project**: `https://vercel.com/[username]/henei-dimsum`

---

## 💡 Tips

1. **Free Tier Limits**:
   - Serverless function timeout: 10s (hobby), 60s (pro)
   - Bandwidth: 100GB/month
   - Build time: 6000 minutes/month

2. **Performance**:
   - Backend serverless → Cold start ~1-2s lần đầu
   - Use connection pooling cho MongoDB
   - Frontend trên CDN → Load nhanh toàn cầu

3. **Security**:
   - Không commit `.env` files
   - Sử dụng strong JWT secrets
   - Restrict MongoDB IP whitelist nếu cần

4. **Monitoring**:
   - Vercel Analytics: Settings > Analytics
   - Vercel Speed Insights
   - MongoDB Atlas monitoring

---

## 🆘 Cần Giúp Đỡ?

- Vercel Support: https://vercel.com/support
- Vercel Community: https://github.com/vercel/vercel/discussions
- Discord: https://vercel.com/discord

---

**🎉 Chúc mừng! Website của bạn đã live!** 🚀
