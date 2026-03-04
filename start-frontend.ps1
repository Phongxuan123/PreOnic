# PreOnic Development - Frontend
Write-Host "========================================" -ForegroundColor Green
Write-Host "   PreOnic Development - Frontend" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

Set-Location fe

Write-Host "[1/2] Checking dependencies..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host "Dependencies not found. Installing..." -ForegroundColor Yellow
    npm install
}

Write-Host ""
Write-Host "[2/2] Starting Frontend Server..." -ForegroundColor Yellow
Write-Host "Frontend will run on http://localhost:3000" -ForegroundColor Cyan
Write-Host ""

npm start
