/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { SmallNews } from "./SmallNews"; // Assurez-vous que SmallNews est également responsif ou adaptez-le

// Données d'exemple pour les articles, à remplacer par des props ou un état si dynamique
const newsItemsData = [
  {
    id: 1,
    date: "Mardi 05, Septembre 2025 | Par Djamila",
    title: "Titre de l'article 1", // Ajoutez des titres pour un meilleur contexte
    image: "https://c.animaapp.com/mbfwxdap4GBqLX/img/rectangle-34.png",
    groupIcon: "https://c.animaapp.com/mbfwxdap4GBqLX/img/group-198.png",
    hovered: true, // Pour l'exemple, le premier est survolé
  },
  {
    id: 2,
    date: "Mardi 05, Septembre 2025 | Par Djamila",
    title: "Titre de l'article 2",
    image: "https://c.animaapp.com/mbfwxdap4GBqLX/img/rectangle-34-1.png",
    groupIcon: "https://c.animaapp.com/mbfwxdap4GBqLX/img/group-198-1.png",
  },
  {
    id: 3,
    date: "Mardi 05, Septembre 2025 | Par Djamila",
    title: "Titre de l'article 3",
    image: "https://c.animaapp.com/mbfwxdap4GBqLX/img/rectangle-34-2.png",
    groupIcon: "https://c.animaapp.com/mbfwxdap4GBqLX/img/group-198-2.png",
  },
  {
    id: 4,
    date: "Mardi 05, Septembre 2025 | Par Djamila",
    title: "Titre de l'article 4",
    image: "https://c.animaapp.com/mbfwxdap4GBqLX/img/rectangle-34-3.png",
    groupIcon: "https://c.animaapp.com/mbfwxdap4GBqLX/img/group-198-3.png",
  },
];

export const NewsSectionWrapper = ({
  className, // Sera utilisé pour la couleur de fond principale et le padding
  title = "ACTUALITES ( COMMENTAIRES )", // Titre principal de la section
  subtitle = "UN RENDEZ-VOUS, UNE SOLUTION", // Sous-titre
  // Les autres props spécifiques de style sont supprimées au profit de classes directes
  // ou gérées dans ce composant ou dans SmallNews
}) => {
  return (
    <div className={`w-full py-12 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 ${className || 'bg-[#0f425d]'}`}>
      {/* Header Section */}
      <div className="text-center mb-10 md:mb-16 max-w-xl mx-auto">
        <p className="font-caption font-bold text-[#0b9444] text-sm md:text-base tracking-wider uppercase mb-2">
          {subtitle}
        </p>
        <h2 className="font-display-2 font-semibold text-white text-2xl sm:text-3xl md:text-4xl leading-tight">
          {title} {/* Utilise la prop title, couleur blanche par défaut car bg est sombre */}
        </h2>
      </div>

      {/* News Grid */} 
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        
      </div>

      {/* Pagination Dots (simplifié) */}
      <div className="flex justify-center items-center mt-10 md:mt-16 space-x-2">
        <div className="w-3 h-3 md:w-4 md:h-4 bg-white rounded-full cursor-pointer"></div>
        <div className="w-3 h-3 md:w-4 md:h-4 bg-[#0b9444] rounded-full cursor-pointer"></div> {/* Actif */} 
        <div className="w-3 h-3 md:w-4 md:h-4 bg-white rounded-full cursor-pointer"></div>
      </div>

    </div>
  );
};