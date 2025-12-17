# Hướng dẫn Deploy

Tài liệu này hướng dẫn deploy ứng dụng Henei Dimsum lên các nền tảng hosting phổ biến.

## 📋 Mục lục

- [Deploy Backend](#deploy-backend)
  - [Render.com](#rendercom-recommended)
  - [Railway.app](#railwayapp)
  - [Heroku](#heroku)
- [Deploy Frontend](#deploy-frontend)
  - [Vercel](#vercel-recommended)
  - [Netlify](#netlify)
- [MongoDB Atlas](#mongodb-atlas)
- [Environment Variables](#environment-variables)

---

## 🗄️ MongoDB Atlas

Trước khi deploy, cần setup MongoDB Atlas:

1. Đăng ký tài khoản tại [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Tạo cluster mới (chọn Free Tier M0)
3. Tạo Database User:
   - Database Access > Add New Database User
   - Username: `henei_dimsum`
   - Password: Tạo password mạnh
4. Whitelist IP:
   - Network Access > Add IP Address
   - Chọn "Allow Access from Anywhere" (0.0.0.0/0)
5. Get Connection String:
   - Clusters > Connect > Connect your application
   - Copy connection string
   - Thay `<password>` bằng password của bạn
   - Thay `<dbname>` bằng `heneidimsum`

Connection string mẫu:
```
mongodb+srv://henei_dimsum:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/heneidimsum?retryWrites=true&w=majority
```

---

## 🚀 Deploy Backend

### Render.com (Recommended)

**Ưu điểm**: Free tier, dễ dùng, tự động deploy từ GitHub

#### Bước 1: Chuẩn bị

Thêm file `render.yaml` vào root directory:

```yaml
services:
  - type: web
    name: henei-dimsum-backend
    env: node
    buildCommand: cd backend && npm install
    startCommand: cd backend && npm start
    envVars:
      - key: MONGO_URI
        sync: false
      - key: PORT
        value: 5000
      - key: NODE_ENV
        value: production
```

#### Bước 2: Deploy

1. Đăng ký [Render.com](https://render.com)
2. New > Web Service
3. Connect GitHub repository
4. Cấu hình:
   - **Name**: henei-dimsum-backend
   - **Root Directory**: `backend`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
5. Environment Variables:
   - `MONGO_URI`: Paste connection string từ MongoDB Atlas
   - `PORT`: 5000
   - `NODE_ENV`: production
6. Click "Create Web Service"

Sau vài phút, bạn sẽ có URL dạng: `https://henei-dimsum-backend.onrender.com`

#### Test API:
```bash
curl https://henei-dimsum-backend.onrender.com/api/dishes
```

---

### Railway.app

1. Đăng ký [Railway.app](https://railway.app)
2. New Project > Deploy from GitHub
3. Select repository
4. Settings:
   - Root Directory: `backend`
   - Start Command: `npm start`
5. Variables:
   - Add `MONGO_URI`, `PORT`, `NODE_ENV`
6. Deploy!

---

### Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create henei-dimsum-backend

# Set environment variables
heroku config:set MONGO_URI="your_mongodb_uri"
heroku config:set NODE_ENV=production

# Deploy
git subtree push --prefix backend heroku main

# View logs
heroku logs --tail
```

---

## 🌐 Deploy Frontend & Backend lên Vercel

### Vercel Full-Stack Deploy (Recommended)

**Ưu điểm**: Deploy cả frontend và backend trên cùng 1 platform, serverless functions, CDN toàn cầu

---

### 🔥 Bước 1: Deploy Backend lên Vercel

#### Chuẩn bị:
- File `backend/vercel.json` đã được tạo sẵn
- Cấu hình MongoDB Atlas (xem phần MongoDB Atlas ở trên)

#### Deploy Backend:

**Cách 1: Qua Vercel Dashboard**

1. Đăng ký/đăng nhập [Vercel](https://vercel.com)
2. Click **Add New... > Project**
3. Import Git Repository (hoặc kết nối GitHub lần đầu)
4. Chọn repository `henei-dimsum`
5. Cấu hình project:
   - **Project Name**: `henei-dimsum-backend`
   - **Framework Preset**: Other
   - **Root Directory**: `backend` ⚠️ QUAN TRỌNG!
   - **Build Command**: `npm install` (hoặc để trống)
   - **Output Directory**: `.` (để trống)
6. Environment Variables - Add các biến sau:
   ```
   MONGO_URI = mongodb+srv://user:pass@cluster.mongodb.net/heneidimsum?retryWrites=true&w=majority
   NODE_ENV = production
   JWT_SECRET = your_super_secret_key_here_change_this
   PORT = 5000
   ```
7. Click **Deploy**

Sau vài phút, backend sẽ có URL: `https://henei-dimsum-backend.vercel.app`

**Cách 2: Qua Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Di chuyển vào thư mục backend
cd backend

# Login Vercel
vercel login

# Deploy lần đầu
vercel

# Làm theo hướng dẫn:
# - Set up and deploy? Y
# - Which scope? Chọn account của bạn
# - Link to existing project? N
# - What's your project's name? henei-dimsum-backend
# - In which directory is your code located? ./

# Thêm environment variables
vercel env add MONGO_URI
# Paste connection string MongoDB Atlas

vercel env add JWT_SECRET
# Nhập secret key

vercel env add NODE_ENV
# Nhập: production

# Deploy production
vercel --prod
```

#### Test Backend API:
```bash
# Test dishes endpoint
curl https://henei-dimsum-backend.vercel.app/api/dishes

# Test với Postman hoặc browser
https://henei-dimsum-backend.vercel.app/api/dishes
```

---

### 🎨 Bước 2: Deploy Frontend lên Vercel

#### Chuẩn bị:
- File `frontend/vercel.json` đã được tạo sẵn
- Copy URL backend từ bước 1

#### Deploy Frontend:

**Cách 1: Qua Vercel Dashboard**

1. Trở về Vercel Dashboard
2. Click **Add New... > Project**
3. Chọn lại repository `henei-dimsum`
4. Cấu hình project:
   - **Project Name**: `henei-dimsum-frontend` (hoặc `henei-dimsum`)
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend` ⚠️ QUAN TRỌNG!
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
5. Environment Variables:
   ```
   REACT_APP_API_URL = https://henei-dimsum-backend.vercel.app/api
   ```
   ⚠️ Thay URL bằng URL backend thực tế từ bước 1
6. Click **Deploy**

URL frontend: `https://henei-dimsum.vercel.app`

**Cách 2: Qua Vercel CLI**

```bash
# Di chuyển vào thư mục frontend
cd ../frontend

# Deploy
vercel

# Làm theo hướng dẫn:
# - Set up and deploy? Y
# - Which scope? Chọn account
# - Link to existing project? N
# - What's your project's name? henei-dimsum
# - In which directory is your code located? ./

# Thêm API URL
vercel env add REACT_APP_API_URL
# Nhập: https://henei-dimsum-backend.vercel.app/api

# Deploy production
vercel --prod
```

---

### 🔄 Cập nhật CORS cho Backend

Sau khi có URL frontend, cần cập nhật CORS trong backend:

1. Vào Vercel Dashboard > Backend project
2. Settings > Environment Variables
3. Add variable mới:
   ```
   FRONTEND_URL = https://henei-dimsum.vercel.app
   ```
4. Redeploy backend (Deployments > ... > Redeploy)

Hoặc cập nhật code `backend/server.js`:
```javascript
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
};
app.use(cors(corsOptions));
```

---

### 🚀 Tự động Deploy khi Push Code

Vercel tự động deploy khi bạn push code lên GitHub:

- **Production**: Push lên branch `main` → Auto deploy production
- **Preview**: Push lên branch khác → Auto deploy preview URL

Để tắt auto-deploy:
1. Project Settings > Git
2. Tắt "Automatic Deployments from GitHub"

---

### Vercel (Alternative - Monorepo Deploy)

Nếu muốn deploy từ root project (không tách riêng backend/frontend):

---

### Netlify

#### Deploy qua Drag & Drop

```bash
# Build frontend
cd frontend
npm run build

# Tạo file _redirects trong build folder
echo "/* /index.html 200" > build/_redirects
```

1. Đăng nhập [Netlify](https://netlify.com)
2. Drag & drop thư mục `build/` vào Netlify
3. Site settings > Environment variables:
   - `REACT_APP_API_URL`: URL backend

#### Deploy qua GitHub

1. New site from Git
2. Connect to GitHub
3. Select repository
4. Build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/build`
5. Environment variables: Thêm `REACT_APP_API_URL`
6. Deploy!

---

## 🔐 Environment Variables

### Backend (.env)

**Development**:
```env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/heneidimsum
PORT=5000
NODE_ENV=development
JWT_SECRET=dev_secret_key_12345
```

**Production** (Render/Railway):
```env
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/heneidimsum
PORT=5000
NODE_ENV=production
JWT_SECRET=super_secure_production_key
```

### Frontend (.env)

**Development**:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

**Production** (Vercel/Netlify):
```env
REACT_APP_API_URL=https://henei-dimsum-backend.onrender.com/api
```

---

## ✅ Checklist sau khi Deploy

- [ ] Backend health check: `curl https://your-backend.com/api/dishes`
- [ ] Frontend load được trang chủ
- [ ] Menu page load được dữ liệu từ backend
- [ ] Giỏ hàng hoạt động (add/remove items)
- [ ] Tạo đơn hàng thành công
- [ ] CORS được configure đúng
- [ ] Environment variables đã set đầy đủ
- [ ] SSL certificate hoạt động (HTTPS)

---

## 🐛 Troubleshooting

### CORS Error

**Lỗi**: `Access to fetch at 'https://backend...' from origin 'https://frontend...' has been blocked by CORS policy`

**Giải pháp**: Thêm frontend domain vào CORS whitelist trong `backend/server.js`:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://henei-dimsum.vercel.app'
  ],
  credentials: true
}));
```

### Build Failed

**Lỗi**: `Error: Cannot find module '...'`

**Giải pháp**:
- Kiểm tra `package.json` có đầy đủ dependencies
- Chạy `npm install` trước khi build
- Xóa `node_modules` và `package-lock.json`, chạy lại `npm install`

### Environment Variables không load

**React**: Phải prefix bằng `REACT_APP_`
- ✅ `REACT_APP_API_URL`
- ❌ `API_URL`

Sau khi thay đổi `.env`, phải rebuild:
```bash
npm run build
```

---

## 📊 Monitoring & Analytics

### Backend Logs (Render)

```bash
# Xem logs real-time
# Dashboard > Service > Logs tab
```

### Frontend Analytics (Vercel)

1. Dashboard > Project > Analytics
2. Xem page views, performance metrics

---

## 🔄 Auto Deploy

Sau khi setup xong, mỗi lần push code lên GitHub:

```bash
git add .
git commit -m "Update feature X"
git push origin main
```

Vercel và Render sẽ tự động:
1. Detect changes
2. Build lại project
3. Deploy version mới
4. Notify qua email/Slack

---

## 🎯 Custom Domain

### Vercel

1. Mua domain (Namecheap, GoDaddy, etc.)
2. Vercel Dashboard > Domains
3. Add Domain: `heneidimsum.com`
4. Update DNS records theo hướng dẫn
5. Wait for propagation (5-60 phút)

### Render

1. Dashboard > Settings > Custom Domain
2. Add domain: `api.heneidimsum.com`
3. Update DNS: CNAME record trỏ đến Render URL

---

## 💡 Tips

1. **Free Tier Limits**:
   - Render: Sleep sau 15 phút không hoạt động (request đầu tiên chậm ~30s)
   - Vercel: 100GB bandwidth/month
   - MongoDB Atlas: 512MB storage

2. **Keep Backend Awake**:
   - Dùng service như [UptimeRobot](https://uptimerobot.com) để ping backend mỗi 5 phút

3. **CDN**: Vercel tự động enable CDN cho static assets

4. **Cache**: Thêm cache headers cho images:
```javascript
// backend/server.js
app.use('/images', express.static('public/images', {
  maxAge: '7d'
}));
```

---

Made with ❤️ by Henei Dimsum Team
