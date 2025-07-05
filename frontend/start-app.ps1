#!/usr/bin/env pwsh

# Script de test de démarrage de l'application KmrCare
Write-Host "🧪 Test de démarrage de l'application KmrCare..." -ForegroundColor Cyan

# Vérifier que nous sommes dans le bon répertoire
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Erreur: package.json non trouvé. Assurez-vous d'être dans le répertoire frontend." -ForegroundColor Red
    exit 1
}

Write-Host "📦 Vérification des dépendances..." -ForegroundColor Yellow

# Vérifier si node_modules existe
if (-not (Test-Path "node_modules")) {
    Write-Host "📥 Installation des dépendances..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Erreur lors de l'installation des dépendances" -ForegroundColor Red
        exit 1
    }
}

Write-Host "🔍 Vérification de la syntaxe..." -ForegroundColor Yellow

# Test de build pour vérifier la syntaxe
Write-Host "🔨 Test de compilation..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erreur de compilation détectée" -ForegroundColor Red
    Write-Host "🔧 Tentative avec l'application de test..." -ForegroundColor Yellow
    
    # Sauvegarder main.jsx et utiliser main-safe.jsx
    if (Test-Path "src/main.jsx") {
        Copy-Item "src/main.jsx" "src/main.backup.jsx" -Force
        Write-Host "💾 Sauvegarde de main.jsx créée" -ForegroundColor Green
    }
    
    if (Test-Path "src/main-safe.jsx") {
        Copy-Item "src/main-safe.jsx" "src/main.jsx" -Force
        Write-Host "🔄 Utilisation de main-safe.jsx" -ForegroundColor Green
        
        # Retenter la compilation
        npm run build
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ Même l'application de test échoue" -ForegroundColor Red
            
            # Restaurer main.jsx
            if (Test-Path "src/main.backup.jsx") {
                Copy-Item "src/main.backup.jsx" "src/main.jsx" -Force
                Remove-Item "src/main.backup.jsx" -Force
            }
            exit 1
        }
    }
} else {
    Write-Host "✅ Compilation réussie !" -ForegroundColor Green
}

Write-Host "🚀 Lancement de l'application en mode développement..." -ForegroundColor Green
Write-Host "📍 L'application sera disponible sur http://localhost:5173" -ForegroundColor Cyan
Write-Host "⏹️  Appuyez sur Ctrl+C pour arrêter l'application" -ForegroundColor Yellow

# Lancer l'application
npm run dev
