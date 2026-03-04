@echo off
echo ========================================
echo   PreOnic Development - Backend
echo ========================================
echo.
cd be
echo [1/3] Checking dependencies...
if not exist "node_modules\" (
    echo Dependencies not found. Installing...
    call npm install
)
echo.
echo [2/3] Checking MongoDB connection...
echo Make sure MongoDB is running!
echo.
echo [3/3] Starting Backend Server...
echo Backend will run on http://localhost:5000
echo.
call npm run dev
