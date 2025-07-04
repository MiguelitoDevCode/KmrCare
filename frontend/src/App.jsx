import { useGSAP } from "@gsap/react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Catalogue from "./pages/Catalogue";
import EnSavoirPlus from "./Acceuil/views/EnSavoirPlus";
import Authentification from "./pages/Authentification";
import Reservations from "./pages/Reservations";
import Load from "./pages/Loader";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import gsap from "gsap";
import { DivWrapper } from "./Acceuil/views/DivWrapper";
import Medecins from "./pages/DocDashboard";
import UserPreferences from "./pages/UserPreferences";

// Import des guards et composants d'authentification
import { AuthGuard, AdminGuard, DoctorGuard, GuestGuard } from "./guards";
import AuthProvider from "./components/AuthProvider";
import RouteRedirect from "./components/RouteRedirect";

// Import du système de notifications global
import NotificationCenter from "./components/ui/NotificationCenter";

// Import de l'Error Boundary global
import ErrorBoundary from "./components/ErrorBoundary";

// Import des utilitaires de store pour l'initialisation
import { initializeStores } from "./_store";
import { useEffect } from "react";

const AppContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Initialiser les stores au démarrage de l'application
  useEffect(() => {
    initializeStores();
  }, []);

  useGSAP(() => {
    if (isHomePage) {
      // Masquer la scrollbar verticale au début de l'animation (horizontale reste masquée par CSS)
      document.body.style.overflowY = 'hidden';
      
      let tl = gsap.timeline();
      //Animation de defragmentation
      tl.to(".box", {
       scale: 0,
       y: 60,
       rotate: 400,
       duration: 0.4,
       yoyo: true,
       delay: 0.4,
       stagger: {
         amount: 1.5,
         from: "end",
         //axis: "x",
         grid: [3, 3],
       }
      });
      
      // Animation de disparition du wrapper et restauration de la scrollbar verticale
      tl.to(".wrapper", {
       opacity: 0,
       display: "none",
       onComplete: () => {
         // Restaurer seulement la scrollbar verticale (horizontale reste masquée)
         document.body.style.overflowY = 'auto';
       }
      });
    }
  }, [isHomePage]);

  return (
    <div>
      {isHomePage && <Load/>}        
      <RouteRedirect />
      
      {/* Centre de notifications global */}
      <NotificationCenter />
      
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<Accueil />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/en-savoir-plus" element={<EnSavoirPlus />} />
        <Route path="/services" element={<DivWrapper/>} />
        
        {/* Route d'authentification - seulement pour les non-connectés */}
        <Route 
          path="/auth" 
          element={
            <GuestGuard>
              <Authentification />
            </GuestGuard>
          } 
        />
        
        {/* Routes protégées - nécessitent une authentification */}
        <Route 
          path="/reservations" 
          element={
            <AuthGuard>
              <Reservations />
            </AuthGuard>
          } 
        />
        
        {/* Routes administrateur - nécessitent le rôle admin */}
        <Route 
          path="/admin" 
          element={
            <AdminGuard>
              <Admin />
            </AdminGuard>
          } 
        />
        
        {/* Routes médecin - nécessitent le rôle doctor */}
        <Route 
          path="/doctors" 
          element={
            <DoctorGuard>
              <Medecins />
            </DoctorGuard>
          } 
        />
        
        {/* Route de préférences - nécessite une authentification */}
        <Route 
          path="/preferences" 
          element={
            <AuthGuard>
              <UserPreferences />
            </AuthGuard>
          } 
        />
        
        {/* Route 404 - doit être en dernier */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  )
};

export default App;
