# 🚀 Henei Dimsum - Vercel Deploy Steps (Print Version)

## Checklist nhanh - Deploy trong 30 phút

---

## ⏰ BƯỚC 1: MONGODB ATLAS (5 phút)

□ Đăng ký tài khoản: https://www.mongodb.com/cloud/atlas
□ Tạo cluster (Free Tier M0)
□ Database Access > Add New User:
  - Username: _________________
  - Password: _________________
□ Network Access > Add IP: 0.0.0.0/0
□ Get Connection String:
  ```
  mongodb+srv://user:pass@cluster.mongodb.net/heneidimsum
  ```
□ Save connection string: ___________________________________

---

## ⏰ BƯỚC 2: DEPLOY BACKEND (10 phút)

□ Đăng nhập Vercel: https://vercel.com
□ Add New > Project > Import Git Repository
□ Chọn repository: henei-dimsum
□ Configure:
  - Project Name: henei-dimsum-backend
  - Framework: Other
  - Root Directory: **backend** ⚠️
  
□ Environment Variables (4 biến):
  ```
  MONGO_URI = [paste MongoDB connection string]
  NODE_ENV = production
  JWT_SECRET = [random string 32+ characters]
  PORT = 5000
  ```
  
□ JWT Secret Generator:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
  Result: ___________________________________

□ Click "Deploy" và đợi 2-3 phút

□ Backend URL: ___________________________________
  (Example: https://henei-dimsum-backend.vercel.app)

□ Test backend:
  ```
  https://[your-backend-url]/api/dishes
  ```
  Should return JSON with dishes

---

## ⏰ BƯỚC 3: DEPLOY FRONTEND (10 phút)

□ Vercel Dashboard > Add New > Project
□ Import repository henei-dimsum (lần 2)
□ Configure:
  - Project Name: henei-dimsum
  - Framework: Create React App
  - Root Directory: **frontend** ⚠️
  
□ Environment Variables (1 biến):
  ```
  REACT_APP_API_URL = [Backend URL từ Bước 2]/api
  ```
  Example: https://henei-dimsum-backend.vercel.app/api

□ Click "Deploy" và đợi 2-3 phút

□ Frontend URL: ___________________________________
  (Example: https://henei-dimsum.vercel.app)

---

## ⏰ BƯỚC 4: CẬP NHẬT CORS (2 phút)

□ Vào Backend Project trên Vercel
□ Settings > Environment Variables
□ Add New:
  ```
  FRONTEND_URL = [Frontend URL từ Bước 3]
  ```
  Example: https://henei-dimsum.vercel.app

□ Deployments > Latest > ... > Redeploy
□ Đợi redeploy xong (1-2 phút)

---

## ⏰ BƯỚC 5: IMPORT DATA (3 phút)

□ Mở terminal/command prompt
□ Update backend/.env với production MongoDB:
  ```bash
  cd backend
  # Edit .env file, set MONGO_URI to production string
  ```

□ Import dishes:
  ```bash
  node importData.js
  ```
  ✅ Should see: "Dữ liệu đã được import thành công"

□ Create admin account:
  ```bash
  node scripts/seedAdmin.js
  ```
  Admin credentials:
  - Username: _________________
  - Password: _________________

---

## ✅ BƯỚC 6: KIỂM TRA (5 phút)

### Test Backend:
□ https://[backend-url]/api/dishes → Returns dishes
□ https://[backend-url]/api/promotions → Returns promotions

### Test Frontend:
□ Open: https://[frontend-url]
□ Home page loads ✓
□ Menu page shows dishes ✓
□ Can add to cart ✓
□ Cart shows items ✓
□ Can submit order ✓
□ No CORS errors in Console (F12) ✓

---

## 📝 THÔNG TIN QUAN TRỌNG

### Production URLs:
- **Backend**: ___________________________________
- **Frontend**: ___________________________________

### MongoDB:
- **Connection String**: ___________________________________
- **Database**: heneidimsum

### Admin Account:
- **Username**: ___________________________________
- **Password**: ___________________________________

### Vercel Projects:
- **Backend Project**: https://vercel.com/[username]/henei-dimsum-backend
- **Frontend Project**: https://vercel.com/[username]/henei-dimsum

---

## 🆘 CÁC LỖI THƯỜNG GẶP

### ❌ CORS Error:
→ Kiểm tra FRONTEND_URL trong backend env vars
→ Redeploy backend

### ❌ API không trả về data:
→ Kiểm tra MONGO_URI đúng chưa
→ Run importData.js để import data
→ Check MongoDB Atlas: Collections có data chưa

### ❌ Frontend không kết nối backend:
→ Kiểm tra REACT_APP_API_URL
→ Phải có /api ở cuối URL
→ Test backend URL trực tiếp trên browser

### ❌ Build Failed:
→ Check Root Directory đúng chưa (frontend hoặc backend)
→ Try build locally: npm run build
→ Check package.json có đủ dependencies

---

## 📞 HỖ TRỢ

Docs đầy đủ: See VERCEL_DEPLOY.md
Troubleshooting: See TROUBLESHOOTING.md
Email: heneidimsum@gmail.com

---

**Date Deployed**: _____ / _____ / _________
**Deployed By**: _________________________________

---

## 🎉 CHÚC MỪNG! WEBSITE ĐÃ LIVE!

Share với team:
□ Backend URL
□ Frontend URL
□ Admin credentials

Next steps:
□ Test thoroughly
□ Monitor for issues
□ Gather feedback
□ Plan next features

---

**⭐ TIP:** Save this document với URLs và credentials đã điền!
