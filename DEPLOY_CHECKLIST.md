# ✅ Vercel Deploy Checklist

## Pre-Deployment

- [ ] Code đã được push lên GitHub
- [ ] `.env` files KHÔNG được commit (check `.gitignore`)
- [ ] `vercel.json` đã tạo cho backend và frontend
- [ ] MongoDB Atlas đã setup và có connection string

## MongoDB Atlas Setup

- [ ] Tạo tài khoản MongoDB Atlas
- [ ] Tạo cluster (Free Tier M0)
- [ ] Tạo database user với username/password
- [ ] Whitelist IP: 0.0.0.0/0 (Allow from anywhere)
- [ ] Lấy connection string
- [ ] Test connection locally

## Backend Deployment

- [ ] Đăng nhập Vercel
- [ ] Import repository từ GitHub
- [ ] Set Root Directory = `backend`
- [ ] Environment Variables added:
  - [ ] `MONGO_URI` = MongoDB connection string
  - [ ] `NODE_ENV` = production
  - [ ] `JWT_SECRET` = random secure string
  - [ ] `PORT` = 5000
- [ ] Build & Deploy thành công
- [ ] Backend URL nhận được: `https://________.vercel.app`
- [ ] Test API endpoint: `/api/dishes` returns data

**Backend URL**: ___________________________________

## Frontend Deployment

- [ ] Import repository từ GitHub (project mới)
- [ ] Set Root Directory = `frontend`
- [ ] Set Framework = Create React App
- [ ] Environment Variables added:
  - [ ] `REACT_APP_API_URL` = `[Backend URL]/api`
- [ ] Build & Deploy thành công
- [ ] Frontend URL nhận được: `https://________.vercel.app`
- [ ] Website load thành công

**Frontend URL**: ___________________________________

## CORS Configuration

- [ ] Thêm `FRONTEND_URL` vào backend env vars
- [ ] Backend redeploy
- [ ] Test: Frontend có thể call backend API
- [ ] Không có lỗi CORS trong browser console

## Database Seeding

- [ ] Update local `.env` với production MongoDB URI
- [ ] Run `node importData.js` - Data imported
- [ ] Run `node scripts/seedAdmin.js` - Admin created
- [ ] Verify data trên MongoDB Atlas

**Admin Credentials**:
- Username: ___________________________________
- Password: ___________________________________

## Testing

### Backend Tests
- [ ] `GET /api/dishes` - Returns dishes
- [ ] `GET /api/promotions` - Returns promotions
- [ ] `POST /api/orders` - Creates order
- [ ] `POST /api/reservations` - Creates reservation
- [ ] `POST /api/preorders` - Creates pre-order

### Frontend Tests
- [ ] Home page loads
- [ ] Menu page shows dishes
- [ ] Can add items to cart
- [ ] Cart shows correct items and total
- [ ] Can place order
- [ ] Can make reservation
- [ ] Can make pre-order
- [ ] Promotions page shows data
- [ ] About page loads
- [ ] No console errors

### Cross-Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers

## Performance & Optimization

- [ ] Images optimized
- [ ] Lighthouse score checked
- [ ] Mobile responsive
- [ ] Fast load times

## Documentation

- [ ] README.md updated với production URLs
- [ ] Environment variables documented
- [ ] API documentation up to date

## Optional: Custom Domain

- [ ] Domain purchased
- [ ] DNS configured for frontend
- [ ] Subdomain configured for backend (api.domain.com)
- [ ] SSL certificate active
- [ ] `REACT_APP_API_URL` updated với custom domain

**Custom Domains**:
- Frontend: ___________________________________
- Backend: ___________________________________

## Post-Deployment

- [ ] All team members notified
- [ ] Production credentials secured
- [ ] Monitoring setup (optional)
- [ ] Analytics setup (optional)
- [ ] Backup plan in place

## Notes

_______________________________________________________
_______________________________________________________
_______________________________________________________
_______________________________________________________

## Common Issues

### Issue: CORS Error
**Solution**: 
1. Add FRONTEND_URL to backend env vars
2. Redeploy backend
3. Clear browser cache

### Issue: API not responding
**Solution**: 
1. Check backend logs on Vercel
2. Verify MONGO_URI is correct
3. Check serverless function timeout

### Issue: Build Failed
**Solution**: 
1. Verify Root Directory is correct
2. Check package.json for missing dependencies
3. Try building locally first

---

**Date Deployed**: ___________________________________
**Deployed By**: ___________________________________
**Status**: ⬜ In Progress | ⬜ Completed | ⬜ Issues

---

## 🎉 Deployment Complete!

**Production URLs**:
- Frontend: ___________________________________
- Backend: ___________________________________

**Next Steps**:
- [ ] Share URLs with team
- [ ] Monitor for issues
- [ ] Gather user feedback
- [ ] Plan next features
