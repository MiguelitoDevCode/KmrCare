#!/bin/bash

echo "🔧 Test de l'application KmrCare..."

# Vérifier si les dépendances sont installées
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

# Démarrer l'application
echo "🚀 Démarrage de l'application..."
npm run dev

echo "✅ L'application est maintenant accessible sur http://localhost:5173"
echo "📱 Interface d'administration : http://localhost:5173/admin"
