import { useGSAP } from "@gsap/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from "./pages/Accueil";
import Catalogue from "./pages/Catalogue";
import EnSavoirPlus from "./Acceuil/views/EnSavoirPlus";
import Authentification from "./pages/Authentification";
import Load from "./pages/Loader";
import gsap from "gsap";

const App = () => {
  useGSAP(() => {
     // Masquer la scrollbar verticale au début de l'animation (horizontale reste masquée par CSS)
     document.body.style.overflowY = 'hidden';
     
     let tl = gsap.timeline();
     //Animation de defragmentation
     tl.to(".box", {
      scale: 0,
      y: 60,
      rotate: 400,
      duration: 1,
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
      duration: 1,
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
  });
  
  return (
    <Router>
      <div>
        <Load/>        <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/en-savoir-plus" element={<EnSavoirPlus />} />
          <Route path="/auth" element={<Authentification />} />
        </Routes>
      </div>
    </Router>
  )
};

export default App;
