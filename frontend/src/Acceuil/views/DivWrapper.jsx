/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from 'prop-types'; // Importer PropTypes
import { motion } from "motion/react";

// Données pour les services pour faciliter le mappage
const services = [
  { name: "Neurology", icon: "https://c.animaapp.com/mbfwxdap4GBqLX/img/vector-2.svg" },
  { name: "Bones", icon: "https://c.animaapp.com/mbfwxdap4GBqLX/img/vector-2.svg" },
  { name: "Oncology", icon: "https://c.animaapp.com/mbfwxdap4GBqLX/img/vector-2.svg" },
  { name: "Otorhinolaryngology", icon: "https://c.animaapp.com/mbfwxdap4GBqLX/img/vector-2.svg" },
  { name: "Ophthalmology", icon: "https://c.animaapp.com/mbfwxdap4GBqLX/img/vector-2.svg" },
  { name: "Cardiovascular", icon: "https://c.animaapp.com/mbfwxdap4GBqLX/img/vector-2.svg" },
  { name: "Pulmonology", icon: "https://c.animaapp.com/mbfwxdap4GBqLX/img/vector-2.svg" },
  { name: "Renal Medicine", icon: "https://c.animaapp.com/mbfwxdap4GBqLX/img/vector-2.svg" },
  { name: "Urology", icon: "https://c.animaapp.com/mbfwxdap4GBqLX/img/vector-2.svg" },
  { name: "Gastroenterology", icon: "https://c.animaapp.com/mbfwxdap4GBqLX/img/vector-2.svg" },
  { name: "Dermatology", icon: "https://c.animaapp.com/mbfwxdap4GBqLX/img/vector-2.svg" },
  { name: "Gynaecology", icon: "https://c.animaapp.com/mbfwxdap4GBqLX/img/vector-2.svg" },
];

const ServiceCard = ({ name, icon, special }) => {
  const bgColor = "bg-white";
  const textColor = "text-black";
  const shadow = "shadow-md";


  return (
    <motion.div
    whileHover={{ color: "#ffffff",
       backgroundColor: "#10425d"}}
      className={`flex flex-col items-center justify-center p-4 md:p-6 rounded-lg ${bgColor} ${shadow} transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
    >
      <img
        className="w-12 h-12 md:w-14 md:h-14 mb-3 md:mb-4"
        alt={name}
        src={icon}
      />
      <div
        className={`font-sans font-medium text-sm md:text-base text-center ${textColor}`}
      >
        {name}
      </div>
    </motion.div>
  );
};

// Ajouter la validation des props pour ServiceCard
ServiceCard.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
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