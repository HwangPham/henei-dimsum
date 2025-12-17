# 🚀 Quick Start - Deploy to Vercel

## Các bước deploy nhanh:

### 1️⃣ Chuẩn bị MongoDB
- Tạo tài khoản [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Tạo cluster và lấy connection string

### 2️⃣ Deploy Backend
1. Vào [Vercel Dashboard](https://vercel.com)
2. **Add New > Project** > Import repository
3. **Root Directory**: `backend`
4. Thêm Environment Variables:
   - `MONGO_URI`: [Your MongoDB connection string]
   - `NODE_ENV`: `production`
   - `JWT_SECRET`: [Random string]
5. Deploy

### 3️⃣ Deploy Frontend
1. **Add New > Project** > Import repository (lần 2)
2. **Root Directory**: `frontend`
3. Thêm Environment Variable:
   - `REACT_APP_API_URL`: `https://[backend-url].vercel.app/api`
4. Deploy

### 4️⃣ Import Data
```bash
cd backend
node importData.js
node scripts/seedAdmin.js
```

## 📖 Hướng dẫn chi tiết

Xem file [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md) để biết hướng dẫn đầy đủ.

## 🔗 Links

- Backend: `https://henei-dimsum-backend.vercel.app`
- Frontend: `https://henei-dimsum.vercel.app`
- Docs: [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md)
