@echo off
echo.
echo ======================================================
echo   KmrCare - Demarrage Rapide Frontend
echo ======================================================
echo.

cd frontend

echo 📦 Installation des dependances...
call npm install

echo.
echo 🚀 Demarrage du serveur de developpement...
echo.
echo Frontend: http://localhost:5173
echo API Backend attendue: http://localhost:8000
echo.

call npm run dev

pause
