# 🤝 Đóng góp cho Henei Dimsum

Cảm ơn bạn đã quan tâm đến việc đóng góp cho dự án! Tài liệu này sẽ hướng dẫn bạn cách đóng góp một cách hiệu quả.

## 📋 Mục lục

- [Code of Conduct](#code-of-conduct)
- [Làm thế nào để đóng góp?](#làm-thế-nào-để-đóng-góp)
- [Quy trình phát triển](#quy-trình-phát-triển)
- [Coding Standards](#coding-standards)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Báo cáo Bug](#báo-cáo-bug)
- [Đề xuất tính năng](#đề-xuất-tính-năng)

## 📜 Code of Conduct

Dự án này tuân thủ [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/). Bằng cách tham gia, bạn được kỳ vọng sẽ duy trì quy tắc này.

## 🚀 Làm thế nào để đóng góp?

### 1. Fork Repository

Click nút "Fork" ở góc trên bên phải của repository.

### 2. Clone Repository

```bash
git clone https://github.com/your-username/henei-dimsum.git
cd henei-dimsum
```

### 3. Tạo Branch mới

```bash
git checkout -b feature/ten-tinh-nang
# hoặc
git checkout -b fix/ten-bug
```

### 4. Cài đặt Dependencies

```bash
# Cài tất cả dependencies
npm run install:all

# Hoặc từng phần
cd backend && npm install
cd ../frontend && npm install
```

### 5. Thực hiện thay đổi

- Code feature/fix của bạn
- Test kỹ trước khi commit
- Viết code rõ ràng, có comments

### 6. Commit Changes

```bash
git add .
git commit -m "feat: thêm tính năng X"
```

### 7. Push lên GitHub

```bash
git push origin feature/ten-tinh-nang
```

### 8. Tạo Pull Request

- Vào repository của bạn trên GitHub
- Click "Compare & pull request"
- Điền thông tin chi tiết về thay đổi
- Submit!

## 🔄 Quy trình phát triển

### Setup môi trường

1. **Node.js**: Cài đặt phiên bản >= 18.x
2. **MongoDB**: Sử dụng MongoDB Atlas hoặc local
3. **IDE**: Khuyến nghị VS Code với extensions:
   - ESLint
   - Prettier
   - ES7+ React/Redux/React-Native snippets

### Chạy Development Server

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

**Hoặc dùng concurrently (từ root):**
```bash
npm run dev
```

### Testing

#### Backend
```bash
cd backend
npm test
```

#### Frontend
```bash
cd frontend
npm test
```

## 📝 Coding Standards

### JavaScript/React

- Sử dụng **ES6+** syntax
- Component: Functional components với Hooks
- Naming:
  - Components: PascalCase (`MenuPage.jsx`)
  - Files: camelCase (`api.js`)
  - Variables: camelCase (`menuData`)
  - Constants: UPPER_SNAKE_CASE (`API_BASE_URL`)

### Code Style

```javascript
// ✅ Good
const MenuPage = () => {
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    fetchData();
  }, []);
  
  return <div>Content</div>;
};

// ❌ Bad
function MenuPage(){
  var loading=false
  return(
    <div>Content</div>
  )
}
```

### CSS

- Sử dụng class names có ý nghĩa
- BEM naming convention (optional)
- Responsive design (mobile-first)

```css
/* ✅ Good */
.menu-container {
  display: flex;
  padding: 2rem;
}

.menu-container__item {
  margin: 1rem;
}

/* ❌ Bad */
.mc {
  display: flex;
}
```

### API Routes

- RESTful naming
- Plural nouns cho resources
- HTTP methods chuẩn

```javascript
// ✅ Good
GET    /api/dishes
POST   /api/dishes
PUT    /api/dishes/:id
DELETE /api/dishes/:id

// ❌ Bad
GET    /api/getDishes
POST   /api/createDish
```

## 💬 Commit Messages

Sử dụng [Conventional Commits](https://www.conventionalcommits.org/):

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: Tính năng mới
- `fix`: Sửa bug
- `docs`: Thay đổi documentation
- `style`: Format code (không ảnh hưởng logic)
- `refactor`: Refactor code
- `test`: Thêm/sửa tests
- `chore`: Thay đổi build process, dependencies

### Examples

```bash
# Feature
git commit -m "feat(menu): thêm chức năng lọc món theo giá"

# Bug fix
git commit -m "fix(cart): sửa lỗi tính tổng tiền không đúng"

# Documentation
git commit -m "docs: cập nhật README với hướng dẫn deploy"

# Refactor
git commit -m "refactor(api): tối ưu hóa API calls với axios interceptors"
```

## 🔀 Pull Request Process

### Trước khi submit

- [ ] Code đã được test kỹ
- [ ] Không có console.log/debugger còn sót
- [ ] Code đã được format (Prettier/ESLint)
- [ ] Commit messages có ý nghĩa
- [ ] Branch đã được sync với main

```bash
git fetch origin
git rebase origin/main
```

### PR Template

```markdown
## Mô tả
Giải thích chi tiết về thay đổi

## Type of change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Checklist
- [ ] Code đã được test
- [ ] Đã cập nhật documentation
- [ ] Không có breaking changes
- [ ] Tuân thủ coding standards

## Screenshots (nếu có)
Thêm screenshots nếu có thay đổi UI

## Related Issues
Closes #123
```

### Review Process

1. Maintainers sẽ review trong vòng 2-3 ngày
2. Có thể yêu cầu thay đổi
3. Sau khi approved, PR sẽ được merge
4. Branch sẽ được xóa sau khi merge

## 🐛 Báo cáo Bug

### Trước khi báo cáo

- Tìm kiếm trong Issues xem bug đã được report chưa
- Đảm bảo bạn đang dùng version mới nhất

### Template Bug Report

```markdown
**Mô tả bug**
Mô tả ngắn gọn bug là gì

**Cách tái hiện**
Các bước để tái hiện bug:
1. Vào trang '...'
2. Click vào '...'
3. Scroll xuống '...'
4. Thấy lỗi

**Expected behavior**
Mô tả hành vi mong đợi

**Screenshots**
Thêm screenshots nếu có

**Environment:**
 - OS: [e.g. Windows 11]
 - Browser: [e.g. Chrome 120]
 - Node version: [e.g. 18.17.0]

**Additional context**
Thêm thông tin khác nếu cần
```

## 💡 Đề xuất tính năng

### Template Feature Request

```markdown
**Is your feature request related to a problem?**
Mô tả vấn đề. Ex: Tôi thấy khó chịu khi [...]

**Describe the solution you'd like**
Mô tả giải pháp bạn mong muốn

**Describe alternatives you've considered**
Các giải pháp khác bạn đã cân nhắc

**Additional context**
Thêm screenshots, mockups nếu có
```

## 🎯 Areas for Contribution

### High Priority

- [ ] Admin Dashboard (quản lý món ăn, đơn hàng)
- [ ] User Authentication (đăng nhập, đăng ký)
- [ ] Order Tracking (theo dõi đơn hàng)
- [ ] Payment Integration (VNPay, Momo)
- [ ] Email Notifications
- [ ] Search Enhancement (tìm kiếm nâng cao)

### Medium Priority

- [ ] Reviews & Ratings
- [ ] Wishlist/Favorites
- [ ] Discount Codes
- [ ] Multiple Addresses
- [ ] Order History

### Good First Issues

- [ ] UI improvements
- [ ] Documentation updates
- [ ] Add loading indicators
- [ ] Form validations
- [ ] Error messages i18n

## 📚 Resources

### Backend

- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [Mongoose Guide](https://mongoosejs.com/docs/guide.html)

### Frontend

- [React Docs](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/)

### Tools

- [Git](https://git-scm.com/doc)
- [VS Code](https://code.visualstudio.com/docs)
- [Postman](https://learning.postman.com/)

## 🆘 Cần giúp đỡ?

- 💬 [GitHub Discussions](https://github.com/your-username/henei-dimsum/discussions)
- 📧 Email: heneidimsum@gmail.com
- 📱 Facebook: [Henei Dimsum](https://www.facebook.com/profile.php?id=61580212877418)

## 🙏 Cảm ơn

Cảm ơn bạn đã dành thời gian đóng góp cho dự án! Mọi đóng góp, dù lớn hay nhỏ, đều được đánh giá cao.

---

Happy Coding! 🚀
