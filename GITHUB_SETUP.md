# 🚀 Quick Start Guide - Upload lên GitHub

Hướng dẫn nhanh để upload project Henei Dimsum lên GitHub.

## Bước 1: Khởi tạo Git Repository

Mở terminal/PowerShell tại thư mục `d:\HeneiDimsum` và chạy:

```bash
# Khởi tạo git repository
git init

# Kiểm tra files
git status
```

## Bước 2: Thêm files vào Git

```bash
# Thêm tất cả files (trừ những file trong .gitignore)
git add .

# Kiểm tra xem files nào sẽ được commit
git status
```

## Bước 3: Commit lần đầu

```bash
# Commit với message rõ ràng
git commit -m "Initial commit: Henei Dimsum website"
```

## Bước 4: Tạo Repository trên GitHub

### Cách 1: Qua Web Interface

1. Đăng nhập vào [GitHub](https://github.com)
2. Click nút **"+"** ở góc trên bên phải
3. Chọn **"New repository"**
4. Điền thông tin:
   - **Repository name**: `henei-dimsum`
   - **Description**: "Website đặt món dimsum Hong Kong"
   - **Visibility**: Chọn **Public** hoặc **Private**
   - **KHÔNG** chọn:
     - ❌ Add a README file (đã có rồi)
     - ❌ Add .gitignore (đã có rồi)
     - ❌ Choose a license (đã có rồi)
5. Click **"Create repository"**

### Cách 2: Qua GitHub CLI (nếu đã cài)

```bash
gh repo create henei-dimsum --public --source=. --remote=origin
```

## Bước 5: Kết nối với GitHub Repository

Sau khi tạo repo trên GitHub, copy URL (dạng: `https://github.com/username/henei-dimsum.git`)

```bash
# Thêm remote repository
git remote add origin https://github.com/YOUR_USERNAME/henei-dimsum.git

# Kiểm tra remote
git remote -v
```

## Bước 6: Push code lên GitHub

```bash
# Đổi tên branch thành main (nếu cần)
git branch -M main

# Push code lên GitHub
git push -u origin main
```

Nếu gặp lỗi authentication, làm theo một trong các cách:

### Option A: HTTPS với Personal Access Token

1. GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
2. Generate new token (classic)
3. Chọn scopes: `repo`, `workflow`
4. Copy token
5. Khi push, dùng token thay vì password

### Option B: SSH

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copy public key
cat ~/.ssh/id_ed25519.pub

# Add vào GitHub: Settings > SSH and GPG keys > New SSH key

# Đổi remote sang SSH
git remote set-url origin git@github.com:YOUR_USERNAME/henei-dimsum.git

# Push
git push -u origin main
```

## Bước 7: Verify

Sau khi push thành công:

1. Mở browser
2. Vào `https://github.com/YOUR_USERNAME/henei-dimsum`
3. Kiểm tra files đã được upload

## ✅ Checklist

- [ ] `.gitignore` đã được tạo (không push `.env`, `node_modules`)
- [ ] `README.md` có đầy đủ thông tin
- [ ] Files nhạy cảm không bị push (`.env`)
- [ ] Repository visibility đúng (Public/Private)
- [ ] README hiển thị đẹp trên GitHub

## 🔄 Update Code sau này

Mỗi khi có thay đổi:

```bash
# Kiểm tra changes
git status

# Thêm files đã thay đổi
git add .
# hoặc thêm từng file
git add backend/server.js frontend/src/App.js

# Commit với message rõ ràng
git commit -m "feat: thêm tính năng X"
# hoặc
git commit -m "fix: sửa lỗi Y"

# Push lên GitHub
git push origin main
```

## 📝 Commit Message Best Practices

```bash
# Feature mới
git commit -m "feat: thêm trang admin quản lý đơn hàng"

# Sửa bug
git commit -m "fix: sửa lỗi tính tổng tiền giỏ hàng"

# Cập nhật documentation
git commit -m "docs: cập nhật README với hướng dẫn deploy"

# Refactor code
git commit -m "refactor: tối ưu API calls với axios interceptors"

# Style/format
git commit -m "style: format code với Prettier"

# Dependencies
git commit -m "chore: cập nhật dependencies"
```

## 🌿 Branching Strategy (Optional)

Nếu làm việc theo nhóm:

```bash
# Tạo branch mới cho feature
git checkout -b feature/payment-integration

# Code...

# Commit
git add .
git commit -m "feat: tích hợp VNPay payment"

# Push branch lên GitHub
git push origin feature/payment-integration

# Tạo Pull Request trên GitHub
# Sau khi review, merge vào main
```

## 🚨 Lưu ý quan trọng

### ❌ KHÔNG push những files sau:

- `.env` (chứa secrets)
- `node_modules/` (quá lớn, sẽ install lại)
- `build/` hoặc `dist/` (generated files)
- `.DS_Store` (MacOS)
- `Thumbs.db` (Windows)
- IDE configs (`.vscode/`, `.idea/`)

✅ Đã được handle bởi `.gitignore`

### Kiểm tra trước khi push

```bash
# Xem files sẽ được push
git status

# Xem nội dung thay đổi
git diff

# Xem commit history
git log --oneline
```

## 🔐 Bảo mật

### Environment Variables

**❌ KHÔNG làm:**
```bash
git add .env
git commit -m "add env file"
```

**✅ NÊN làm:**
```bash
# .gitignore đã có .env rồi
# Tạo .env.example để hướng dẫn người khác
```

Tạo file `.env.example`:

```env
# backend/.env.example
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
PORT=5000
JWT_SECRET=your_secret_key
```

```env
# frontend/.env.example
REACT_APP_API_URL=http://localhost:5000/api
```

## 🎯 Next Steps

Sau khi push lên GitHub:

1. **README Badge**: Thêm badges (build status, license, etc.)
2. **GitHub Actions**: Setup CI/CD
3. **Issues & Projects**: Organize tasks
4. **Wiki**: Viết documentation chi tiết
5. **Releases**: Tag versions (v1.0.0, v1.1.0)

## 📚 Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)

## 🆘 Troubleshooting

### Lỗi: "fatal: remote origin already exists"

```bash
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/henei-dimsum.git
```

### Lỗi: "Updates were rejected"

```bash
git pull origin main --rebase
git push origin main
```

### Lỗi: "Permission denied (publickey)"

Chuyển sang dùng HTTPS thay vì SSH:

```bash
git remote set-url origin https://github.com/YOUR_USERNAME/henei-dimsum.git
```

---

**Chúc mừng! 🎉 Project của bạn đã có trên GitHub!**

Share link với mọi người: `https://github.com/YOUR_USERNAME/henei-dimsum`
