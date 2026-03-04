@echo off
echo ========================================
echo   PreOnic Development - Frontend
echo ========================================
echo.
cd fe
echo [1/2] Checking dependencies...
if not exist "node_modules\" (
    echo Dependencies not found. Installing...
    call npm install
)
echo.
echo [2/2] Starting Frontend Server...
echo Frontend will run on http://localhost:3000
echo.
call npm start
