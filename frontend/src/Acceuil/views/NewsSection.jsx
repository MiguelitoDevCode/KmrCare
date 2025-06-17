/* eslint-disable no-unused-vars */
import React from "react";
import { NewsSectionWrapper } from "../../components/Accueil/NewsSectionWrapper";

export const NewsSection = () => {
  return (
    <NewsSectionWrapper
      className="bg-[#0f425d]" // Couleur de fond principale pour la section
      title="ACTUALITÉS RÉCENTES" // Titre personnalisé pour cette instance
      subtitle="RESTEZ INFORMÉ AVEC KMRCARE" // Sous-titre personnalisé
      // Les données des articles sont actuellement en dur dans NewsSectionWrapper pour l'exemple.
      // Pour un cas réel, vous passeriez un tableau d'articles ici :
      // newsItems={myNewsDataArray}
    />
  );
};