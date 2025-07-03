Write-Host "🔧 Test de l'application KmrCare..." -ForegroundColor Cyan

# Vérifier si les dépendances sont installées
if (!(Test-Path "node_modules")) {
    Write-Host "📦 Installation des dépendances..." -ForegroundColor Yellow
    npm install
}

# Démarrer l'application
Write-Host "🚀 Démarrage de l'application..." -ForegroundColor Green
npm run dev

Write-Host "✅ L'application est maintenant accessible sur http://localhost:5173" -ForegroundColor Green
Write-Host "📱 Interface d'administration : http://localhost:5173/admin" -ForegroundColor Green
