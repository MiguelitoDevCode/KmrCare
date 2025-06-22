import { useGSAP } from "@gsap/react";
import Acceuil from "./pages/Accueil";
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
    <div>
      <Load/>
      <Acceuil/>
    </div>
  )
};

export default App;
