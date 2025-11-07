# SavingsTracker Installation Script
# Run this in PowerShell from the project directory

Write-Host "╔═══════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║         SavingsTracker - Automated Installation              ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: package.json not found!" -ForegroundColor Red
    Write-Host "Please run this script from the SavingsTracker directory" -ForegroundColor Yellow
    exit 1
}

Write-Host "📦 Installing Expo dependencies..." -ForegroundColor Green
Write-Host ""

# Expo core packages
Write-Host "→ Installing Expo core..." -ForegroundColor Yellow
npx expo install expo expo-status-bar react react-native

# Navigation packages
Write-Host "→ Installing navigation..." -ForegroundColor Yellow
npx expo install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context

# UI packages
Write-Host "→ Installing UI components..." -ForegroundColor Yellow
npx expo install react-native-paper react-native-vector-icons

# Chart packages
Write-Host "→ Installing charts..." -ForegroundColor Yellow
npx expo install react-native-chart-kit react-native-svg

# Storage
Write-Host "→ Installing storage..." -ForegroundColor Yellow
npx expo install @react-native-async-storage/async-storage

# Utilities
Write-Host "→ Installing utilities..." -ForegroundColor Yellow
npx expo install date-fns

Write-Host ""
Write-Host "📦 Installing npm packages..." -ForegroundColor Green
Write-Host ""

# Form packages
npm install formik yup

# Dev dependencies
Write-Host "→ Installing dev dependencies..." -ForegroundColor Yellow
npm install --save-dev typescript @types/react @types/react-native @types/jest jest babel-jest

Write-Host ""
Write-Host "✅ Installation complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Next steps:" -ForegroundColor Cyan
Write-Host "  1. Run: npx expo start" -ForegroundColor White
Write-Host "  2. Scan QR code with Expo Go app" -ForegroundColor White
Write-Host "  3. Start building your savings tracker!" -ForegroundColor White
Write-Host ""
Write-Host "📚 Documentation:" -ForegroundColor Cyan
Write-Host "  - README.md for full guide" -ForegroundColor White
Write-Host "  - PROJECT_SUMMARY.md for detailed explanations" -ForegroundColor White
Write-Host "  - QUICKSTART.txt for quick reference" -ForegroundColor White
Write-Host ""
