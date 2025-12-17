#!/bin/bash

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Henei Dimsum - Vercel Deploy Script${NC}\n"

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo -e "${RED}❌ Vercel CLI chưa được cài đặt${NC}"
    echo -e "${BLUE}📦 Đang cài đặt Vercel CLI...${NC}"
    npm install -g vercel
fi

echo -e "${GREEN}✅ Vercel CLI đã sẵn sàng${NC}\n"

# Deploy Backend
echo -e "${BLUE}📦 Bước 1: Deploy Backend${NC}"
cd backend

echo "Đang deploy backend..."
vercel --prod

echo -e "${GREEN}✅ Backend đã deploy xong!${NC}\n"

# Get backend URL
echo "Vui lòng nhập URL backend vừa deploy (vd: https://henei-dimsum-backend.vercel.app):"
read BACKEND_URL

cd ../frontend

# Deploy Frontend
echo -e "${BLUE}📦 Bước 2: Deploy Frontend${NC}"

# Set environment variable
echo "Đang thiết lập environment variables..."
vercel env add REACT_APP_API_URL production <<< "$BACKEND_URL/api"

echo "Đang deploy frontend..."
vercel --prod

echo -e "\n${GREEN}🎉 Deploy hoàn tất!${NC}"
echo -e "${BLUE}📝 Ghi chú:${NC}"
echo -e "1. Kiểm tra cả 2 URLs để đảm bảo hoạt động"
echo -e "2. Nếu backend chưa có dữ liệu, chạy: cd backend && node importData.js"
echo -e "3. Tạo admin account: cd backend && node scripts/seedAdmin.js"
