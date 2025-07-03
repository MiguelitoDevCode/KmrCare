import { useGSAP } from "@gsap/react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Catalogue from "./pages/Catalogue";
import EnSavoirPlus from "./Acceuil/views/EnSavoirPlus";
import Authentification from "./pages/Authentification";
import Reservations from "./pages/Reservations";
import Load from "./pages/Loader";
import Admin from "./pages/Admin";
import gsap from "gsap";
import { DivWrapper } from "./Acceuil/views/DivWrapper";

const AppContent = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

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
       duration: 0.5,
       repeat: 1,
       yoyo: true,
       delay: 0.5,
       stagger: {
         amount: 1.5,
         from: "end",
         //axis: "x",
         grid: [3, 3],
       }
      });
      
      //Animation de rotation
      tl.to(".contain", {
       rotate: "-405deg",
       scale: 0,
       duration: .5,
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
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/en-savoir-plus" element={<EnSavoirPlus />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/auth" element={<Authentification />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/services" element={<DivWrapper/>} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  )
};

export default App;
