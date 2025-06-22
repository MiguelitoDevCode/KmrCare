/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from 'prop-types'; // Importer PropTypes
import { motion } from "motion/react";

// Données pour les services avec icônes médicales plus spécifiques
const services = [
  { name: "Consultation Générale", icon: "/assets/consultation.svg", emoji: "🩺" },
  { name: "Suivi Prénatal", icon: "/assets/prenatal.svg", emoji: "🤱" },
  { name: "Vaccination", icon: "/assets/vaccin.svg", emoji: "💉" },
  { name: "Urgences Mineures", icon: "/assets/coeur-bip.svg", emoji: "🚨" },
  { name: "Cardiologie", icon: "/assets/coeur.svg", emoji: "❤️" },
  { name: "Pédiatrie", icon: "/assets/coeur-bip.svg", emoji: "👶" },
  { name: "Dermatologie", icon: "/assets/coeur-bip.svg", emoji: "🧴" },
  { name: "Gynécologie", icon: "/assets/coeur-bip.svg", emoji: "🌸" },
  { name: "Analyses Médicales", icon: "/assets/coeur-bip.svg", emoji: "🧪" },
  { name: "Ophtalmologie", icon: "/assets/coeur-bip.svg", emoji: "👁️" },
  { name: "Dentisterie", icon: "/assets/coeur-bip.svg", emoji: "🦷" },
  { name: "Physiothérapie", icon: "/assets/coeur-bip.svg", emoji: "🤸" },
];

const ServiceCard = ({ name, icon, emoji, special }) => {
  const bgColor = "bg-white";
  const textColor = "text-black";
  const shadow = "shadow-md";

  return (
    <motion.div
    whileHover={{ 
      color: "#ffffff",
      backgroundColor: "#10425d",
      scale: 1.05,
      y: -5
    }}
    transition={{ duration: 0.3 }}
      className={`group flex flex-col items-center justify-center p-4 md:p-6 rounded-xl ${bgColor} ${shadow} transition-all duration-300 hover:shadow-2xl cursor-pointer border border-gray-100`}
    >
      {/* Emoji + Icon */}
      <div className="relative mb-3">
        <span className="text-3xl md:text-4xl group-hover:scale-110 transition-transform duration-300">
          {emoji}
        </span>
        <img
          className="w-8 h-8 md:w-10 md:h-10 absolute -bottom-1 -right-1 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
          alt={name}
          src={icon}
        />
      </div>
      
      <div
        className={`font-sans font-medium text-sm md:text-base text-center ${textColor} group-hover:text-white transition-colors duration-300`}
      >
        {name}
      </div>
      
      {/* Petit indicateur de disponibilité */}
      <div className="mt-2 flex items-center space-x-1">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-xs text-gray-500 group-hover:text-gray-300">Disponible</span>
      </div>
    </motion.div>
  );
};

// Ajouter la validation des props pour ServiceCard
ServiceCard.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  emoji: PropTypes.string.isRequired,
  special: PropTypes.bool,
};

ServiceCard.defaultProps = {
  special: false,
};

export const DivWrapper = () => {
  return (
    <div className="w-full py-12 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      {/* Header Section */}
      <div className="text-center mb-10 md:mb-16 max-w-2xl mx-auto">
        <p className="font-caption font-bold text-[#0b9444] text-sm md:text-base tracking-wider uppercase mb-2">
          QUEL SERVICE MÉDICAL CHERCHEZ-VOUS ?
        </p>
        <h2 className="font-display-2 font-semibold text-[#0f425d] text-2xl sm:text-3xl md:text-4xl leading-tight">
          Nos Consultations
        </h2>
      </div>

      {/* Services Grid */}
      {/* L'image group-190.png est omise car elle est difficile à rendre responsive avec une grille dynamique */}
      {/* Si elle est nécessaire, elle pourrait être un fond décoratif pour la section sur les grands écrans */}
      <motion.div
      initial={{ 
        clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)", //Masquer a gauche...
        opacity: 0
       }}
      animate={{ 
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)", //Devoilement complet...
        opacity: 1
        }}
      transition={{ duration: 1.2,
        ease: [0.2, 0.8, 0.4, 1] }}
      className="max-w-6xl mx-auto bg-gray-100 p-4 sm:p-6 md:p-8 rounded-xl shadow-lg">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.name}
              name={service.name}
              icon={service.icon}
              special={service.special}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};