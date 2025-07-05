# Script de démarrage automatisé pour KmrCare
# Frontend + Backend Development Setup

Write-Host "🚀 Démarrage de l'environnement de développement KmrCare" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Cyan

# Vérification des prérequis
Write-Host "`n📋 Vérification des prérequis..." -ForegroundColor Yellow

# Vérifier Node.js
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = node --version
    Write-Host "✅ Node.js détecté: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js non trouvé. Veuillez l'installer depuis https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Vérifier Python
if (Get-Command python -ErrorAction SilentlyContinue) {
    $pythonVersion = python --version
    Write-Host "✅ Python détecté: $pythonVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Python non trouvé. Veuillez l'installer depuis https://python.org/" -ForegroundColor Red
    exit 1
}

# Configuration des variables
$PROJECT_ROOT = Get-Location
$FRONTEND_DIR = Join-Path $PROJECT_ROOT "frontend"
$BACKEND_DIR = Join-Path $PROJECT_ROOT "backend/core"

Write-Host "`n📁 Répertoire du projet: $PROJECT_ROOT" -ForegroundColor Cyan

# Installation des dépendances frontend
Write-Host "`n📦 Installation des dépendances frontend..." -ForegroundColor Yellow
if (Test-Path $FRONTEND_DIR) {
    Set-Location $FRONTEND_DIR
    
    if (Test-Path "package.json") {
        Write-Host "Installation des packages npm..." -ForegroundColor Gray
        npm install
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Dépendances frontend installées avec succès" -ForegroundColor Green
        } else {
            Write-Host "❌ Erreur lors de l'installation des dépendances frontend" -ForegroundColor Red
        }
    } else {
        Write-Host "❌ package.json non trouvé dans $FRONTEND_DIR" -ForegroundColor Red
    }
} else {
    Write-Host "❌ Dossier frontend non trouvé: $FRONTEND_DIR" -ForegroundColor Red
}

# Vérification de la configuration
Write-Host "`n⚙️ Vérification de la configuration..." -ForegroundColor Yellow

# Vérifier le fichier .env
$envPath = Join-Path $FRONTEND_DIR ".env"
if (Test-Path $envPath) {
    Write-Host "✅ Fichier .env trouvé" -ForegroundColor Green
} else {
    Write-Host "⚠️ Fichier .env non trouvé, copie depuis .env.example..." -ForegroundColor Orange
    $envExamplePath = Join-Path $FRONTEND_DIR ".env.example"
    if (Test-Path $envExamplePath) {
        Copy-Item $envExamplePath $envPath
        Write-Host "✅ Fichier .env créé depuis .env.example" -ForegroundColor Green
    } else {
        Write-Host "❌ .env.example non trouvé" -ForegroundColor Red
    }
}

# Installation des dépendances backend (si disponible)
Write-Host "`n📦 Vérification du backend..." -ForegroundColor Yellow
if (Test-Path $BACKEND_DIR) {
    Set-Location $BACKEND_DIR
    
    if (Test-Path "requirements.txt") {
        Write-Host "⚠️ Backend détecté mais ignoré (non versionné)" -ForegroundColor Orange
        Write-Host "Pour installer le backend manuellement:" -ForegroundColor Gray
        Write-Host "  cd backend/core" -ForegroundColor Gray
        Write-Host "  pip install -r requirements.txt" -ForegroundColor Gray
        Write-Host "  python manage.py migrate" -ForegroundColor Gray
        Write-Host "  python manage.py runserver" -ForegroundColor Gray
    }
} else {
    Write-Host "ℹ️ Dossier backend non accessible (normal si exclu du versioning)" -ForegroundColor Blue
}

# Retour au répertoire du projet
Set-Location $PROJECT_ROOT

# Fonction de démarrage
function Start-Development {
    Write-Host "`n🚀 Démarrage des services de développement..." -ForegroundColor Green
    
    # Démarrage du frontend
    Write-Host "`n🎨 Démarrage du frontend React..." -ForegroundColor Cyan
    Set-Location $FRONTEND_DIR
    
    # Vérifier si le port 5173 est libre
    $port5173 = Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue
    if ($port5173) {
        Write-Host "⚠️ Le port 5173 est déjà utilisé" -ForegroundColor Orange
    }
    
    Write-Host "Commande: npm run dev" -ForegroundColor Gray
    Write-Host "URL: http://localhost:5173" -ForegroundColor Cyan
    Write-Host "API attendue: http://localhost:8000" -ForegroundColor Cyan
    
    # Lancement du serveur de développement
    npm run dev
}

# Fonction d'aide
function Show-Help {
    Write-Host "`n📖 Commandes disponibles:" -ForegroundColor Cyan
    Write-Host "  npm run dev          - Démarrer le frontend (Vite)" -ForegroundColor White
    Write-Host "  npm run build        - Build de production" -ForegroundColor White
    Write-Host "  npm run preview      - Prévisualiser le build" -ForegroundColor White
    Write-Host "  npm run lint         - Vérifier le code (ESLint)" -ForegroundColor White
    Write-Host "`n🔧 Backend (si disponible):" -ForegroundColor Cyan
    Write-Host "  python manage.py runserver    - Démarrer Django" -ForegroundColor White
    Write-Host "  python manage.py migrate      - Migrations DB" -ForegroundColor White
    Write-Host "`n🌐 URLs importantes:" -ForegroundColor Cyan
    Write-Host "  Frontend: http://localhost:5173" -ForegroundColor Green
    Write-Host "  Backend:  http://localhost:8000" -ForegroundColor Green
    Write-Host "  API Doc:  http://localhost:8000/admin" -ForegroundColor Green
}

# Affichage du statut final
Write-Host "`n✅ Configuration terminée!" -ForegroundColor Green
Write-Host "=================================================" -ForegroundColor Cyan

# Proposer les options
Write-Host "`n🎯 Que souhaitez-vous faire?" -ForegroundColor Yellow
Write-Host "1. Démarrer le serveur de développement frontend" -ForegroundColor White
Write-Host "2. Afficher l'aide et les commandes" -ForegroundColor White
Write-Host "3. Quitter" -ForegroundColor White

$choice = Read-Host "`nVotre choix (1-3)"

switch ($choice) {
    "1" { Start-Development }
    "2" { Show-Help }
    "3" { 
        Write-Host "`n👋 À bientôt! Pour redémarrer, exécutez: .\start-dev.ps1" -ForegroundColor Cyan
        exit 0 
    }
    default { 
        Write-Host "`n⚠️ Choix invalide. Affichage de l'aide..." -ForegroundColor Orange
        Show-Help 
    }
}

Write-Host "`n📚 Pour plus d'informations, consultez RAPPORT_INTEGRATION_BACKEND_FRONTEND.md" -ForegroundColor Blue
