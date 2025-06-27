/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";

const Authentification = () => {
  // États pour la gestion des pages et formulaires
  const [currentPage, setCurrentPage] = useState('landing');
  const [pageHistory, setPageHistory] = useState(['landing']);
  const [showPassword, setShowPassword] = useState({});
  const [formData, setFormData] = useState({});
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Données du carrousel médical
  const carouselData = [
    {
      img: '/assets/logo.png',
      text: 'KmrCare relie les patients aux meilleurs professionnels de santé du Cameroun, facilitant l\'accès aux soins où que vous soyez.',
      bgColor: '#0f425d'
    },
    {
      img: '/assets/doctor_consulting.png',
      text: 'Que ce soit pour une urgence ou un suivi régulier, trouvez rapidement un rendez-vous avec le dispensaire adapté à vos besoins.',
      bgColor: '#0b9444'
    },
    {
      img: '/assets/prenatal.svg',
      text: 'Optimisez la gestion de vos rendez-vous et améliorez l\'expérience de vos patients grâce à notre plateforme intuitive et sécurisée.',
      bgColor: '#a5c2f7',
      textColor: '#0f425d'
    }
  ];

  // Gestion du carrousel automatique
  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselData.length);
    }, 5000); // Plus lent pour éviter les changements trop fréquents
    return () => clearInterval(interval);
  }, [carouselData.length]);

  // Navigation entre les pages
  const navigateTo = (pageId, pushToHistory = true) => {
    setCurrentPage(pageId);
    if (pushToHistory) {
      if (pageId === 'landing') {
        setPageHistory(['landing']);
      } else if (pageId !== pageHistory[pageHistory.length - 1]) {
        setPageHistory(prev => [...prev, pageId]);
      }
    }
  };

  const goBack = () => {
    if (pageHistory.length > 1) {
      const newHistory = [...pageHistory];
      newHistory.pop();
      const prevPage = newHistory[newHistory.length - 1];
      setPageHistory(newHistory);
      setCurrentPage(prevPage);
    }
  };

  // Gestion des mots de passe
  const togglePassword = (fieldId) => {
    setShowPassword(prev => ({
      ...prev,
      [fieldId]: !prev[fieldId]
    }));
  };

  // Gestion des formulaires
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (formType) => {
    switch(formType) {
      case 'login':
        navigateTo('landing');
        break;
      case 'register-patient':
        navigateTo('landing');
        break;
      case 'register-dispensary':
        navigateTo('register-dispensary-confirm');
        break;
      case 'forgot-email':
        navigateTo('forgot-password-code');
        break;
      case 'forgot-code':
        navigateTo('forgot-password-reset');
        break;
      case 'forgot-reset':
        navigateTo('login');
        break;
      default:
        break;
    }
  };

  // Composant d'input avec gestion de mot de passe
  const PasswordInput = ({ id, placeholder, label, required = false }) => (
    <div className="form-group">
      {label && (
        <label htmlFor={id} className="block mb-2 text-sm font-medium text-[#0f425d]">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={showPassword[id] ? "text" : "password"}
          id={id}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#159eec] focus:border-[#159eec] transition-colors"
          placeholder={placeholder}
          required={required}
          onChange={(e) => handleInputChange(id, e.target.value)}
        />
        <button
          type="button"
          onClick={() => togglePassword(id)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-[#0b9444]"
        >
          {showPassword[id] ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L6.228 6.228" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );

  // Composant de bouton de retour
  const BackButton = () => (
    <motion.button
      onClick={goBack}
      className={`absolute top-4 left-4 z-20 w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-300 ${
        pageHistory.length <= 1 || currentPage === 'landing' || currentPage === 'register-dispensary-confirm' ? 'hidden' : 'flex'
      }`}
      whileHover={{ scale: 1.02, y: -0.5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <svg className="w-5 h-5 text-[#0f425d]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
      </svg>
    </motion.button>
  );

  // Panneau droit avec carrousel
  const RightPanel = () => (
    <div 
      className="hidden lg:flex lg:flex-1 flex-col justify-center items-center p-8 text-center"
      style={{ backgroundColor: carouselData[carouselIndex].bgColor }}
    >
      <div 
        className="transition-colors duration-1500 ease-in-out absolute inset-0"
        style={{ backgroundColor: carouselData[carouselIndex].bgColor }}
      />
      <div className="relative z-10 w-full max-w-md h-80 mb-8">
        <AnimatePresence mode="wait">
          <motion.img
            key={carouselIndex}
            src={carouselData[carouselIndex].img}
            alt="Illustration médicale"
            className="w-full h-full object-contain"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ 
              duration: 1.5,
              ease: "easeInOut",
              opacity: { duration: 1.0 }
            }}
          />
        </AnimatePresence>
      </div>
      <motion.p
        key={`text-${carouselIndex}`}
        className="relative z-10 text-lg leading-relaxed max-w-sm"
        style={{ color: carouselData[carouselIndex].textColor || '#ffffff' }}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1.2, 
          delay: 0.5,
          ease: "easeOut"
        }}
      >
        {carouselData[carouselIndex].text}
      </motion.p>
    </div>
  );

  // Page d'accueil / Landing
  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col justify-center items-center p-4 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop')` }}
      />
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1.2,
            ease: "easeOut",
            delay: 0.1
          }}
        >
          <Link to="/" className="inline-block mb-8">
            <img src="/assets/logo.png" alt="KmrCare Logo" className="h-20 w-auto mx-auto" />
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f425d] mb-12 leading-tight">
            BIENVENUE SUR KmrCare<br />
            <span className="text-[#0b9444]">LA PLUS GRANDE COMMUNAUTÉ DE SOINS AU CAMEROUN</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1.2, 
            delay: 0.4,
            ease: "easeOut"
          }}
          className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto"
        >
          <div className="bg-white/90 backdrop-blur rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.01]">
            <h3 className="text-2xl font-bold text-[#0b9444] mb-4">PATIENT</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Vous recherchez des soins au plus vite? Pas de panique, nous sommes là pour vous !
            </p>
            <button
              onClick={() => navigateTo('register-patient')}
              className="w-full py-3 bg-[#0b9444] text-white font-semibold rounded-lg hover:bg-[#0a7c3a] transition-colors duration-200"
            >
              Je m&apos;inscris
            </button>
          </div>

          <div className="bg-white/90 backdrop-blur rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.01]">
            <h3 className="text-2xl font-bold text-[#0f425d] mb-4">Dispensaires</h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Rejoignez l&apos;équipe KmrCare, et vous aussi, participez à sauver des vies plus efficacement
            </p>
            <button
              onClick={() => navigateTo('register-dispensary')}
              className="w-full py-3 bg-[#0f425d] text-white font-semibold rounded-lg hover:bg-[#0a2a3a] transition-colors duration-200"
            >
              Rejoignez-nous
            </button>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.7 }}
          className="text-gray-600 mt-12 text-sm"
        >
          © KmrCare@2025. Tous droits réservés
        </motion.p>
      </div>
    </div>
  );

  // Page de connexion
  const LoginPage = () => (
    <div className="min-h-screen flex">
      <BackButton />
      
      {/* Panel gauche - Formulaire */}
      <div className="flex-1 flex justify-center items-center p-4 lg:p-8 overflow-y-auto bg-white relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <Link to="/">
              <img src="/assets/logo.png" alt="KmrCare Logo" className="h-16 w-auto mx-auto mb-6" />
            </Link>
            <h2 className="text-2xl font-bold text-[#0f425d]">Se Connecter</h2>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSubmit('login'); }} className="space-y-6">
            <div>
              <label htmlFor="login-email" className="block mb-2 text-sm font-medium text-[#0f425d]">
                E-mail
              </label>
              <input
                type="email"
                id="login-email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#159eec] focus:border-[#159eec] transition-colors"
                placeholder="Votre adresse e-mail"
                required
              />
            </div>

            <PasswordInput
              id="login-password"
              label="Mot de passe"
              placeholder="••••••••"
              required
            />

            <div className="text-right">
              <button
                type="button"
                onClick={() => navigateTo('forgot-password-email')}
                className="text-[#0b9444] hover:text-[#0a7c3a] font-medium text-sm transition-colors"
              >
                Mot de passe oublié ?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#0b9444] text-white font-semibold rounded-lg hover:bg-[#0a7c3a] transition-all duration-300 hover:scale-[1.01]"
            >
              Se connecter
            </button>

            <p className="text-center text-gray-600">
              Vous n&apos;avez pas de compte ?{' '}
              <button
                type="button"
                onClick={() => navigateTo('landing')}
                className="text-[#0b9444] hover:text-[#0a7c3a] font-medium transition-colors"
              >
                Inscrivez-vous
              </button>
            </p>
          </form>

          <p className="text-center text-gray-500 text-sm mt-8">
            © KmrCare@2025. Tous droits réservés
          </p>
        </motion.div>
      </div>

      {/* Panel droit - Carrousel */}
      <RightPanel />
    </div>
  );

  // Page mot de passe oublié - Email
  const ForgotPasswordEmailPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex justify-center items-center p-4 relative">
      <BackButton />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8"
      >
        <div className="text-center mb-8">
          <Link to="/">
            <img src="/assets/logo.png" alt="KmrCare Logo" className="h-16 w-auto mx-auto mb-6" />
          </Link>
          <h2 className="text-2xl font-bold text-[#0f425d] mb-4">Réinitialiser votre mot de passe</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Veuillez entrer votre adresse e-mail afin que nous vous envoyons un code pour créer un nouveau mot de passe.
          </p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleSubmit('forgot-email'); }} className="space-y-6">
          <input
            type="email"
            placeholder="Votre adresse e-mail"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#159eec] focus:border-[#159eec] transition-colors"
            required
          />
          
          <button
            type="submit"
            className="w-full py-3 bg-[#0b9444] text-white font-semibold rounded-lg hover:bg-[#0a7c3a] transition-all duration-300 hover:scale-[1.01]"
          >
            Envoyer
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-8">
          © KmrCare@2025. Tous droits réservés
        </p>
      </motion.div>
    </div>
  );

  // Page mot de passe oublié - Code
  const ForgotPasswordCodePage = () => {
    const [codes, setCodes] = useState(['', '', '', '']);

    const handleCodeChange = (index, value) => {
      if (value.length <= 1) {
        const newCodes = [...codes];
        newCodes[index] = value;
        setCodes(newCodes);
        
        // Auto-focus next input
        if (value && index < 3) {
          const nextInput = document.getElementById(`code-${index + 1}`);
          if (nextInput) nextInput.focus();
        }
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex justify-center items-center p-4 relative">
        <BackButton />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md bg-white rounded-xl shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <Link to="/">
              <img src="/assets/logo.png" alt="KmrCare Logo" className="h-16 w-auto mx-auto mb-6" />
            </Link>
            <h2 className="text-2xl font-bold text-[#0f425d] mb-4">Réinitialiser votre mot de passe</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Veuillez entrer le code secret envoyé à votre adresse mail xxxx**@gmail.com
            </p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSubmit('forgot-code'); }} className="space-y-6">
            <div className="flex justify-center space-x-4 mb-6">
              {codes.map((code, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  value={code}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  className="w-12 h-14 text-2xl text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#159eec] focus:border-[#159eec] transition-colors"
                  maxLength="1"
                  required
                />
              ))}
            </div>

            <div className="text-center">
              <button
                type="button"
                className="text-[#0b9444] hover:text-[#0a7c3a] font-medium text-sm transition-colors"
              >
                Renvoyer le code
              </button>
            </div>
            
            <button
              type="submit"
              className="w-full py-3 bg-[#0b9444] text-white font-semibold rounded-lg hover:bg-[#0a7c3a] transition-all duration-300 hover:scale-[1.01]"
            >
              Envoyer
            </button>
          </form>

          <p className="text-center text-gray-500 text-sm mt-8">
            © KmrCare@2025. Tous droits réservés
          </p>
        </motion.div>
      </div>
    );
  };

  // Page mot de passe oublié - Reset
  const ForgotPasswordResetPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex justify-center items-center p-4 relative">
      <BackButton />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8"
      >
        <div className="text-center mb-8">
          <Link to="/">
            <img src="/assets/logo.png" alt="KmrCare Logo" className="h-16 w-auto mx-auto mb-6" />
          </Link>
          <h2 className="text-2xl font-bold text-[#0f425d] mb-4">Réinitialiser votre mot de passe</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Nous sommes prêts à enregistrer votre nouveau mot de passe.
          </p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleSubmit('forgot-reset'); }} className="space-y-6">
          <PasswordInput
            id="new-password"
            label="Nouveau mot de passe"
            placeholder="Nouveau mot de passe"
            required
          />

          <PasswordInput
            id="confirm-password"
            label="Confirmer votre mot de passe"
            placeholder="Confirmer votre mot de passe"
            required
          />
          
          <button
            type="submit"
            className="w-full py-3 bg-[#0b9444] text-white font-semibold rounded-lg hover:bg-[#0a7c3a] transition-all duration-300 hover:scale-[1.01]"
          >
            Confirmer
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-8">
          © KmrCare@2025. Tous droits réservés
        </p>
      </motion.div>
    </div>
  );

  // Page d'inscription patient
  const RegisterPatientPage = () => (
    <div className="min-h-screen flex">
      <BackButton />
      
      {/* Panel gauche - Formulaire */}
      <div className="flex-1 flex justify-center items-start p-4 lg:p-8 overflow-y-auto bg-white relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-2xl pt-8"
        >
          <div className="text-center mb-8">
            <Link to="/">
              <img src="/assets/logo.png" alt="KmrCare Logo" className="h-16 w-auto mx-auto mb-6" />
            </Link>
            <h1 className="text-3xl font-bold text-[#0f425d]">Votre profil en trois étapes</h1>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSubmit('register-patient'); }} className="space-y-8">
            {/* Étape 1 - Identification */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 bg-[#0f425d] text-white rounded-full flex items-center justify-center font-bold">1</span>
                <h2 className="text-xl font-bold text-[#0f425d]">Identification</h2>
              </div>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                Cette identification est obligatoire conformément à la réglementation de KmrCare. Vos données sont sécurisées.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#0f425d]">Noms*</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#159eec] focus:border-[#159eec] transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#0f425d]">Prénoms*</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#159eec] focus:border-[#159eec] transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#0f425d]">E-mail*</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#159eec] focus:border-[#159eec] transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#0f425d]">Numéro de téléphone*</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#159eec] focus:border-[#159eec] transition-colors"
                    required
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <PasswordInput
                  id="patient-password"
                  label="Créer un mot de passe*"
                  placeholder="Créer un mot de passe"
                  required
                />
              </div>
            </div>

            <hr className="border-gray-300" />

            {/* Étape 2 - Règlementation */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 bg-[#0f425d] text-white rounded-full flex items-center justify-center font-bold">2</span>
                <h2 className="text-xl font-bold text-[#0f425d]">Règlementation</h2>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Bienvenue sur KmrCare, votre plateforme de prise de rendez-vous en ligne... En utilisant nos services, vous acceptez les présentes conditions. Veuillez les lire attentivement.
              </p>
            </div>

            <hr className="border-gray-300" />

            {/* Étape 3 - Informations supplémentaires */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 bg-[#0f425d] text-white rounded-full flex items-center justify-center font-bold">3</span>
                <h2 className="text-xl font-bold text-[#0f425d]">Informations supplémentaires</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#0f425d]">Comment avez-vous connu KmrCare?</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#159eec] focus:border-[#159eec] transition-colors">
                    <option>TikTok</option>
                    <option>Facebook</option>
                    <option>Autre</option>
                  </select>
                </div>

                <div className="flex items-start gap-3">
                  <input type="checkbox" id="patient-cgu" required className="mt-1" />
                  <label htmlFor="patient-cgu" className="text-sm text-gray-700">
                    J&apos;ai lu et j&apos;accepte les{' '}
                    <button type="button" className="text-[#0b9444] hover:text-[#0a7c3a] font-medium transition-colors">
                      Conditions générales de KmrCare
                    </button>
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#0b9444] text-white font-semibold rounded-lg hover:bg-[#0a7c3a] transition-all duration-300 hover:scale-[1.01] text-lg"
            >
              Je m&apos;inscris
            </button>

            <p className="text-center text-gray-600">
              Vous avez déjà un compte ?{' '}
              <button
                type="button"
                onClick={() => navigateTo('login')}
                className="text-[#0b9444] hover:text-[#0a7c3a] font-medium transition-colors"
              >
                Connectez-vous
              </button>
            </p>
          </form>
        </motion.div>
      </div>

      {/* Panel droit - Carrousel */}
      <RightPanel />
    </div>
  );

  // Page d'inscription dispensaire
  const RegisterDispensaryPage = () => (
    <div className="min-h-screen flex">
      <BackButton />
      
      {/* Panel gauche - Formulaire */}
      <div className="flex-1 flex justify-center items-start p-4 lg:p-8 overflow-y-auto bg-white relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-2xl pt-8"
        >
          <div className="text-center mb-8">
            <Link to="/">
              <img src="/assets/logo.png" alt="KmrCare Logo" className="h-16 w-auto mx-auto mb-6" />
            </Link>
            <h1 className="text-3xl font-bold text-[#0f425d]">Votre profil en trois étapes</h1>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSubmit('register-dispensary'); }} className="space-y-8">
            {/* Étape 1 - Responsable */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 bg-[#0f425d] text-white rounded-full flex items-center justify-center font-bold">1</span>
                <h2 className="text-xl font-bold text-[#0f425d]">Informations du Responsable du Compte</h2>
              </div>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                Inscrivez votre dispensaire sur KmrCare pour offrir à vos patients un moyen simple et moderne de prendre rendez-vous.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#0f425d]">Noms*</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#159eec] focus:border-[#159eec] transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#0f425d]">Prénoms*</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#159eec] focus:border-[#159eec] transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#0f425d]">E-mail*</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#159eec] focus:border-[#159eec] transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#0f425d]">Numéro de téléphone*</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#159eec] focus:border-[#159eec] transition-colors"
                    required
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <PasswordInput
                  id="resp-password"
                  label="Créer un mot de passe*"
                  placeholder="Créer un mot de passe"
                  required
                />
                <PasswordInput
                  id="resp-password-confirm"
                  label="Confirmer votre mot de passe*"
                  placeholder="Confirmer votre mot de passe"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#0f425d]">Civilité du Responsable*</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#159eec] focus:border-[#159eec] transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#0f425d]">Fonction/Poste*</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#159eec] focus:border-[#159eec] transition-colors"
                    required
                  />
                </div>
              </div>
            </div>

            <hr className="border-gray-300" />

            {/* Étape 2 - Informations Dispensaire */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 bg-[#0f425d] text-white rounded-full flex items-center justify-center font-bold">2</span>
                <h2 className="text-xl font-bold text-[#0f425d]">Informations Générales du Dispensaire</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-[#0f425d]">Nom Officiel du Dispensaire*</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#159eec] focus:border-[#159eec] transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#0f425d]">Type de dispensaire*</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#159eec] focus:border-[#159eec] transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#0f425d]">Quartier*</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#159eec] focus:border-[#159eec] transition-colors"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block mb-2 text-sm font-medium text-[#0f425d]">Adresse Complète*</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#159eec] focus:border-[#159eec] transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#0f425d]">Téléphone du Dispensaire*</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#159eec] focus:border-[#159eec] transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#0f425d]">Email du Dispensaire*</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#159eec] focus:border-[#159eec] transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#0f425d]">Logo du Dispensaire*</label>
                  <input
                    type="file"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#159eec] focus:border-[#159eec] transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#0f425d]">Horaires d&apos;Ouverture*</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#159eec] focus:border-[#159eec] transition-colors"
                    required
                  />
                </div>
              </div>
            </div>

            <hr className="border-gray-300" />

            {/* Étape 3 - Services */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 bg-[#0f425d] text-white rounded-full flex items-center justify-center font-bold">3</span>
                <h2 className="text-xl font-bold text-[#0f425d]">Services et Spécialités Proposés</h2>
              </div>
              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                Lister les principaux types de consultations offertes pour faciliter la recherche par les patients.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#0f425d]">Services/Consultations Offerts</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#159eec] focus:border-[#159eec] transition-colors" required>
                    <option value="">Sélectionnez un service</option>
                    <option value="Consultation Générale">Consultation Générale</option>
                    <option value="Pédiatrie">Pédiatrie</option>
                    <option value="Gynécologie">Gynécologie</option>
                    <option value="Dermatologie">Dermatologie</option>
                    <option value="Cardiologie">Cardiologie</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-[#0f425d]">Spécialités Particulières</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#159eec] focus:border-[#159eec] transition-colors" required>
                    <option value="">Sélectionnez une spécialité</option>
                    <option value="Paludisme">Paludisme</option>
                    <option value="Diabète">Diabète</option>
                    <option value="Hypertension">Hypertension</option>
                    <option value="Vaccination">Vaccination</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4 mt-6">
                <div className="flex items-start gap-3">
                  <input type="checkbox" id="disp-certify" required className="mt-1" />
                  <label htmlFor="disp-certify" className="text-sm text-gray-700">
                    Je certifie que les informations fournies sont exactes et que je suis autorisé(e) à inscrire ce dispensaire.
                  </label>
                </div>
                <div className="flex items-start gap-3">
                  <input type="checkbox" id="disp-cgu" required className="mt-1" />
                  <label htmlFor="disp-cgu" className="text-sm text-gray-700">
                    J&apos;ai lu et j&apos;accepte les{' '}
                    <button type="button" className="text-[#0b9444] hover:text-[#0a7c3a] font-medium transition-colors">
                      Conditions générales de KmrCare
                    </button>
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#0b9444] text-white font-semibold rounded-lg hover:bg-[#0a7c3a] transition-all duration-300 hover:scale-[1.01] text-lg"
            >
              Soumettre ma demande d&apos;inscription
            </button>

            <p className="text-center text-gray-600">
              Vous avez déjà un compte ?{' '}
              <button
                type="button"
                onClick={() => navigateTo('login')}
                className="text-[#0b9444] hover:text-[#0a7c3a] font-medium transition-colors"
              >
                Connectez-vous
              </button>
            </p>
          </form>
        </motion.div>
      </div>

      {/* Panel droit - Carrousel */}
      <RightPanel />
    </div>
  );

  // Page de confirmation dispensaire
  const RegisterDispensaryConfirmPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex justify-center items-center p-4 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1551192422-6ea7bd54a7a8?q=80&w=2070&auto=format&fit=crop')` }}
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl bg-white/95 backdrop-blur rounded-xl shadow-xl p-8 text-center"
      >
        <Link to="/">
          <img src="/assets/logo.png" alt="KmrCare Logo" className="h-16 w-auto mx-auto mb-6" />
        </Link>
        
        <h2 className="text-3xl font-bold text-[#0b9444] mb-6">
          Merci d&apos;avoir soumis votre demande d&apos;inscription !
        </h2>
        
        <div className="text-gray-700 leading-relaxed mb-8 space-y-4">
          <p>
            Votre demande pour le dispensaire <strong>[Nom du Dispensaire]</strong> est en cours d&apos;examen. 
            Vous recevrez un email à <strong>[Email du Responsable]</strong> vous informant de l&apos;état de votre inscription 
            dans un délai de <strong>3-5 jours ouvrables</strong>.
          </p>
          <p className="font-semibold text-[#0f425d]">
            Veuillez vérifier votre dossier de courrier indésirable (spam).
          </p>
        </div>

        <button
          onClick={() => navigateTo('landing')}
          className="px-8 py-4 bg-[#0b9444] text-white font-semibold rounded-lg hover:bg-[#0a7c3a] transition-all duration-300 hover:scale-[1.01]"
        >
          Cliquer ici pour accéder à la page d&apos;accueil
        </button>
      </motion.div>
    </div>
  );

  // Rendu principal basé sur la page actuelle
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'login':
        return <LoginPage />;
      case 'forgot-password-email':
        return <ForgotPasswordEmailPage />;
      case 'forgot-password-code':
        return <ForgotPasswordCodePage />;
      case 'forgot-password-reset':
        return <ForgotPasswordResetPage />;
      case 'register-patient':
        return <RegisterPatientPage />;
      case 'register-dispensary':
        return <RegisterDispensaryPage />;
      case 'register-dispensary-confirm':
        return <RegisterDispensaryConfirmPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="font-poppins">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ 
            duration: 0.8, 
            ease: "easeInOut",
            opacity: { duration: 0.6 }
          }}
        >
          {renderCurrentPage()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Authentification;
