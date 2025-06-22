/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "motion/react";

export const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    date: '',
    heure: '',
    dispensaire: '',
    typeConsultation: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const dispensaires = [
    "Dispensaire Central Akwa",
    "Dispensaire Bonanjo",
    "Dispensaire Deido", 
    "Dispensaire Makepe",
    "Dispensaire New Bell"
  ];

  const typesConsultation = [
    "Consultation Générale",
    "Suivi Prénatal", 
    "Vaccination",
    "Urgence Mineure",
    "Contrôle de routine"
  ];

  // Validation des données
  const validateForm = () => {
    const newErrors = {};

    if (!formData.nom.trim()) {
      newErrors.nom = 'Le nom est requis';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (!formData.telephone.trim()) {
      newErrors.telephone = 'Le téléphone est requis';
    } else if (!/^(\+237|237)?[6-9][0-9]{8}$/.test(formData.telephone.replace(/\s/g, ''))) {
      newErrors.telephone = 'Format de téléphone invalide (ex: +237 6XX XXX XXX)';
    }

    if (!formData.date) {
      newErrors.date = 'La date est requise';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'La date doit être aujourd\'hui ou dans le futur';
      }
    }

    if (!formData.heure) {
      newErrors.heure = 'L\'heure est requise';
    }

    if (!formData.dispensaire) {
      newErrors.dispensaire = 'Veuillez choisir un dispensaire';
    }

    if (!formData.typeConsultation) {
      newErrors.typeConsultation = 'Veuillez choisir un type de consultation';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulation d'envoi de données
      console.log('Données du formulaire:', formData);
      
      // Ici, vous pourrez intégrer votre API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Réinitialiser le formulaire après succès
      setFormData({
        nom: '',
        email: '',
        telephone: '',
        date: '',
        heure: '',
        dispensaire: '',
        typeConsultation: ''
      });
      
      alert('Rendez-vous confirmé ! Vous recevrez une confirmation par email et SMS.');
      
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      alert('Une erreur s\'est produite. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Obtenir la date minimum (aujourd'hui)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <motion.div 
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0b9444] to-[#0a7c3a] px-6 py-6">
        <h3 className="text-white text-xl font-bold text-center">
          📅 Prendre Rendez-vous
        </h3>
        <p className="text-white/90 text-sm text-center mt-1">
          Remplissez le formulaire pour réserver votre créneau
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">        {/* Nom complet */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            👤 Nom complet *
          </label>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0b9444] focus:border-[#0b9444] transition-all duration-200 ${
              errors.nom ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Votre nom complet"
            required
          />
          {errors.nom && (
            <p className="text-red-500 text-xs mt-1">❌ {errors.nom}</p>
          )}
        </div>

        {/* Email et Téléphone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📧 Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0b9444] focus:border-[#0b9444] transition-all duration-200 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="votre@email.com"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">❌ {errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📱 Téléphone *
            </label>
            <input
              type="tel"
              name="telephone"
              value={formData.telephone}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0b9444] focus:border-[#0b9444] transition-all duration-200 ${
                errors.telephone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="+237 6XX XXX XXX"
              required
            />
            {errors.telephone && (
              <p className="text-red-500 text-xs mt-1">❌ {errors.telephone}</p>
            )}
          </div>
        </div>

        {/* Date et Heure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📅 Date *
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={getMinDate()}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0b9444] focus:border-[#0b9444] transition-all duration-200 ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            />
            {errors.date && (
              <p className="text-red-500 text-xs mt-1">❌ {errors.date}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ⏰ Heure *
            </label>
            <select
              name="heure"
              value={formData.heure}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0b9444] focus:border-[#0b9444] transition-all duration-200 ${
                errors.heure ? 'border-red-500' : 'border-gray-300'
              }`}
              required
            >
              <option value="">Choisir l&apos;heure</option>
              <option value="08:00">08:00 - 09:00</option>
              <option value="09:00">09:00 - 10:00</option>
              <option value="10:00">10:00 - 11:00</option>
              <option value="11:00">11:00 - 12:00</option>
              <option value="14:00">14:00 - 15:00</option>
              <option value="15:00">15:00 - 16:00</option>
              <option value="16:00">16:00 - 17:00</option>
              <option value="17:00">17:00 - 18:00</option>
            </select>
            {errors.heure && (
              <p className="text-red-500 text-xs mt-1">❌ {errors.heure}</p>
            )}
          </div>
        </div>

        {/* Dispensaire */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            🏥 Dispensaire *
          </label>
          <select
            name="dispensaire"
            value={formData.dispensaire}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0b9444] focus:border-[#0b9444] transition-all duration-200 ${
              errors.dispensaire ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          >
            <option value="">Choisir un dispensaire</option>
            {dispensaires.map((dispensaire) => (
              <option key={dispensaire} value={dispensaire}>
                {dispensaire}
              </option>
            ))}
          </select>
          {errors.dispensaire && (
            <p className="text-red-500 text-xs mt-1">❌ {errors.dispensaire}</p>
          )}
        </div>

        {/* Type de consultation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            💊 Type de consultation *
          </label>
          <select
            name="typeConsultation"
            value={formData.typeConsultation}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0b9444] focus:border-[#0b9444] transition-all duration-200 ${
              errors.typeConsultation ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          >
            <option value="">Choisir le type</option>
            {typesConsultation.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.typeConsultation && (
            <p className="text-red-500 text-xs mt-1">❌ {errors.typeConsultation}</p>
          )}
        </div>        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: isSubmitting ? 1 : 1.02, y: isSubmitting ? 0 : -1 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          className={`w-full font-semibold py-4 px-6 rounded-lg shadow-lg transition-all duration-300 mt-6 ${
            isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-gradient-to-r from-[#0b9444] to-[#0a7c3a] text-white hover:shadow-xl'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Envoi en cours...
            </span>
          ) : (
            '✅ Confirmer le Rendez-vous'
          )}
        </motion.button>

        {/* Urgence médicale */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
          <h4 className="text-red-700 font-semibold text-sm mb-2">
            🚨 Urgence médicale ?
          </h4>
          <p className="text-red-600 text-xs mb-2">
            Pour les urgences, appelez immédiatement :
          </p>
          <div className="flex flex-col space-y-1">
            <a href="tel:+237699000000" className="text-red-700 font-bold text-sm hover:underline">
              📞 +237 699 000 000 (24h/24)
            </a>
            <a href="tel:117" className="text-red-700 font-bold text-sm hover:underline">
              🚑 117 (Pompiers/SAMU)
            </a>
          </div>
        </div>

        {/* Info text */}
        <p className="text-xs text-gray-500 text-center mt-4">
          Vous recevrez une confirmation par email et SMS
        </p>
      </form>
    </motion.div>
  );
};
