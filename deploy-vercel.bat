@echo off
REM Henei Dimsum - Vercel Deploy Script for Windows
REM Colors don't work well in Windows CMD, using simple output

echo ========================================
echo  Henei Dimsum - Vercel Deploy Script
echo ========================================
echo.

REM Check if vercel CLI is installed
where vercel >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Vercel CLI chua duoc cai dat
    echo [INFO] Dang cai dat Vercel CLI...
    call npm install -g vercel
)

echo [OK] Vercel CLI da san sang
echo.

REM Deploy Backend
echo ========================================
echo  Buoc 1: Deploy Backend
echo ========================================
cd backend

echo Dang deploy backend...
call vercel --prod

echo [OK] Backend da deploy xong!
echo.

REM Get backend URL
set /p BACKEND_URL="Vui long nhap URL backend vua deploy (vd: https://henei-dimsum-backend.vercel.app): "

cd ..\frontend

REM Deploy Frontend
echo ========================================
echo  Buoc 2: Deploy Frontend
echo ========================================

echo Dang thiet lap environment variables...
echo %BACKEND_URL%/api | vercel env add REACT_APP_API_URL production

echo Dang deploy frontend...
call vercel --prod

echo.
echo ========================================
echo  Deploy hoan tat!
echo ========================================
echo.
echo [NOTE] Ghi chu:
echo 1. Kiem tra ca 2 URLs de dam bao hoat dong
echo 2. Neu backend chua co du lieu, chay: cd backend ^&^& node importData.js
echo 3. Tao admin account: cd backend ^&^& node scripts/seedAdmin.js
echo.

pause
