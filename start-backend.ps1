# PreOnic Development - Backend
Write-Host "========================================" -ForegroundColor Green
Write-Host "   PreOnic Development - Backend" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Set-Location be

Write-Host "[1/3] Checking dependencies..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host "Dependencies not found. Installing..." -ForegroundColor Yellow
    npm install
}

Write-Host ""
Write-Host "[2/3] Checking MongoDB connection..." -ForegroundColor Yellow
Write-Host "Make sure MongoDB is running!" -ForegroundColor Cyan
Write-Host ""

Write-Host "[3/3] Starting Backend Server..." -ForegroundColor Yellow
Write-Host "Backend will run on http://localhost:5000" -ForegroundColor Cyan
Write-Host ""

npm run dev
