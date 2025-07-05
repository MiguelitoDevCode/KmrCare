/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Authentification = () => {
  // États pour la gestion des pages et formulaires
  const [currentPage, setCurrentPage] = useState('login');
  const [pageHistory, setPageHistory] = useState(['login']);
  const [formData, setFormData] = useState({});
  const [carouselIndex, setCarouselIndex] = useState(0);
   

  //Gestion des Input de mot de passe
  const PasswordInput = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div style={{ position: 'relative' }}>
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Entrez votre mot de passe"
          style={{ paddingRight: '40px' }}
          className="w-full px-4 py-3 text-[#0f425d] border rounded-lg focus:border-[#4356614d] transition-colors"
        />
        <button
        type="button"
        onClick={togglePasswordVisibility}
        style={{
            position: 'absolute',
            right: '10px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.2rem',
            color: '#666',
          }}
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>
    );
  };

  // Données du carrousel médical
  const carouselData = [
    {
      img: '/ico.png',
      text: 'KmrCare relie les patients aux meilleurs professionnels de santé du Cameroun, facilitant l\'accès aux soins où que vous soyez.',
      bgColor: '#0f425d'
    }
  ];

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
  
  //Retour page precedente
  const goBack = () => {
    if (pageHistory.length > 1) {
      const newHistory = [...pageHistory];
      newHistory.pop();
      const prevPage = newHistory[newHistory.length - 1];
      setPageHistory(newHistory);
      setCurrentPage(prevPage);
    }
  };

  // Gestion simple des formulaires (frontend uniquement)
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (formType) => {
    // Navigation simple sans validation backend
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

  // Composant de bouton de retour
  const BackButton = () => (
    <motion.button
      onClick={goBack}
      className={`absolute top-4 left-4 z-20 w-10 h-10 bg-white border  rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-300 ${
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

  // Page d'accueil / Landing
  const LandingPage = () => (
    <div className="min-h-screen bg-gray-300 flex flex-col justify-center items-center p-4 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url('/assets/login.jpeg')` }}
      />
      <div
      className="relative z-10 text-center max-w-4xl mx-auto">
        <div>
          <Link to="/" className="inline-block mb-8">
            <img src="/assets/logo.png" alt="KmrCare Logo" className="h-20 w-auto mx-auto" />
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0f425d] mb-12 leading-tight">
            BIENVENUE SUR KmrCare<br />
            <span className="text-[#0b9444]">LA PLUS GRANDE COMMUNAUTÉ DE SOINS AU CAMEROUN</span>
          </h1>
        </div>

        <motion.div
        initial={{ y: -5, opacity: 0}}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.3 }}
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex justify-center items-center p-4 relative">
      <BackButton />
      
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <Link to="/">
            <img src="/assets/logo.png" alt="KmrCare Logo" className="h-16 w-auto mx-auto mb-6" />
          </Link>
          <h2 className="text-2xl font-bold text-[#0f425d]">Se Connecter</h2>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleSubmit('login'); }} className="space-y-6">
          <div>
            <label htmlFor="login-email" className="block mb-2 text-sm font-medium text-[#0f425d]">
              Nom d`utilisateur
            </label>
            <input
              type="text"
              id="login-name"
              className="w-full px-4 py-3 text-[#0f425d] border rounded-lg focus:border-[#4356614d] transition-colors"
              placeholder="Votre nom d'utilisateur"
              required
            />
          </div>

          <div>
            <label htmlFor="login-password" className="block mb-2 text-sm font-medium text-[#0f425d]">
              Mot de passe
            </label>
            <PasswordInput/>
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={() => navigateTo('forgot-password-email')}
              className="text-[#0b9444] hover:text-[#0a7c3a] font-medium text-sm transition-colors cursor-pointer"
            >
              Mot de passe oublié ?
            </button>
          </div>

          <div className="flex col-2 gap-4">
            <button
            type="submit"
            className="w-full py-3 bg-[#0b9444] text-white font-semibold rounded-lg hover:bg-[#0a7c47] transition-all duration-300 hover:scale-[1.01]"
          >
            Connexion Patient
          </button>
          <button
            type="submit"
            className="w-full py-3 bg-secondary text-white font-semibold rounded-lg hover:bg-blue-800 transition-all duration-300 hover:scale-[1.01]"
          >
            Connexion Medecin
          </button>
          </div>

          <p className="text-center text-gray-600">
            Vous n&apos;avez pas de compte ?{' '}
            <button
              type="button"
              onClick={() => navigateTo('landing')}
              className="text-[#0b9444] hover:text-[#0a7c3a] font-medium transition-colors cursor-pointer"
            >
              Inscrivez-vous
            </button>
          </p>
        </form>

        <p className="text-center text-gray-500 text-sm mt-8">
          © KmrCare@2025. Tous droits réservés
        </p>
      </div>
    </div>
  );

  // Page mot de passe oublié - Email
  const ForgotPasswordEmailPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex justify-center items-center p-4 relative">
      <BackButton />
      
      <div
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
            className="w-full px-4 py-3 border text-[#0f425d] rounded-lg focus:border-[#4356614d] transition-colors"
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
      </div>
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
        
        <div
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
                  className="w-12 h-14 text-[#0f425d] text-2xl text-center border  rounded-lg focus:border-[#4356614d] transition-colors"
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
        </div>
      </div>
    );
  };

  // Page mot de passe oublié - Reset
  const ForgotPasswordResetPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex justify-center items-center p-4 relative">
      <BackButton />
      
      <div
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
          <div>
            <label className="block mb-2 text-sm font-medium text-[#0f425d]">Nouveau mot de passe</label>
            <PasswordInput/>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-[#0f425d]">Confirmer votre mot de passe</label>
            <PasswordInput/>
          </div>
          
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
      </div>
    </div>
  );

  // Page d'inscription patient
  const RegisterPatientPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex justify-center items-center p-4 relative">
      <BackButton />
      
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 overflow-y-auto max-h-[90vh]">
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
                  className="w-full px-4 py-3 text-[#0f425d] border rounded-lg focus:border-[#4356614d] transition-colors"
                  value={formData['patient-nom'] || ''}
                  onChange={(e) => handleInputChange('patient-nom', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-[#0f425d]">Prénoms*</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 text-[#0f425d] border rounded-lg focus:border-[#4356614d] transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-[#0f425d]">E-mail*</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 text-[#0f425d] border rounded-lg focus:border-[#4356614d] transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-[#0f425d]">Numéro de téléphone*</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 text-[#0f425d] border rounded-lg focus:border-[#4356614d] transition-colors"
                  required
                />
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-[#0f425d]">Créer un mot de passe*</label>
              <PasswordInput/>
            </div>
          </div>

          <hr className="" />

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

          <hr className="" />

          {/* Étape 3 - Informations supplémentaires */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 bg-[#0f425d] text-white rounded-full flex items-center justify-center font-bold">3</span>
              <h2 className="text-xl font-bold text-[#0f425d]">Informations supplémentaires</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-[#0f425d]">Comment avez-vous connu KmrCare?</label>
                <select 
                  className="w-full px-4 py-3 text-[#0f425d] border rounded-lg focus:ring-[#159eec] focus:border-[#159eec] transition-colors"
                >
                  <option value="">Sélectionnez une option</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Autre">Autre</option>
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

        <p className="text-center text-gray-500 text-sm mt-8">
          © KmrCare@2025. Tous droits réservés
        </p>
      </div>
    </div>
  );

  // Page d'inscription dispensaire
  const RegisterDispensaryPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex justify-center items-center p-4 relative">
      <BackButton />
      
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-8 overflow-y-auto max-h-[90vh]">
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
                  className="w-full px-4 py-3 text-[#0f425d] border rounded-lg focus:border-[#4356614d] transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-[#0f425d]">Prénoms*</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 text-[#0f425d] border rounded-lg focus:border-[#4356614d] transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-[#0f425d]">E-mail*</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 text-[#0f425d] border rounded-lg focus:border-[#4356614d] transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-[#0f425d]">Numéro de téléphone*</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 text-[#0f425d] border rounded-lg focus:border-[#4356614d] transition-colors"
                  required
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-[#0f425d]">Créer un mot de passe*</label>
                <PasswordInput/>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-[#0f425d]">Confirmer votre mot de passe*</label>
                <PasswordInput/>
              </div>
            </div>
          </div>

          <hr className="" />

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
                  className="w-full px-4 py-3 text-[#0f425d] border rounded-lg focus:border-[#4356614d] transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-[#0f425d]">Type de dispensaire*</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 text-[#0f425d] border rounded-lg focus:border-[#4356614d] transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-[#0f425d]">Quartier*</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 text-[#0f425d] border rounded-lg focus:border-[#4356614d] transition-colors"
                  value={formData['disp-quartier'] || ''}
                  onChange={(e) => handleInputChange('disp-quartier', e.target.value)}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm font-medium text-[#0f425d]">Adresse Complète*</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 text-[#0f425d] border rounded-lg focus:border-[#4356614d] transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-[#0f425d]">Téléphone du Dispensaire*</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 text-[#0f425d] border rounded-lg focus:border-[#4356614d] transition-colors"
                  value={formData['disp-phone'] || ''}
                  onChange={(e) => handleInputChange('disp-phone', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-[#0f425d]">Email du Dispensaire*</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 text-[#0f425d] border rounded-lg focus:border-[#4356614d] transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-[#0f425d]">Logo du Dispensaire*</label>
                <input
                  type="file"
                  className="w-full px-4 py-3 bg-[#4356617e] rounded-lg focus:border-[#4356614d] transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-[#0f425d]">Horaires d&apos;Ouverture*</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 text-[#0f425d] border rounded-lg focus:border-[#4356614d] transition-colors"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-[#0f425d]">Horaires de Fermeture*</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 text-[#0f425d] border rounded-lg focus:border-[#4356614d] transition-colors"
                  required
                />
              </div>
            </div>
          </div>

          <hr className="" />

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
                <select 
                  className="w-full px-4 py-3 text-[#0f425d] border rounded-lg focus:ring-[#159eec] focus:border-[#159eec] transition-colors"
                  required
                >
                  <option value="">Sélectionnez un service</option>
                  <option value="Consultation Générale">Consultation Générale</option>
                  <option value="Pédiatrie">Pédiatrie</option>
                  <option value="Gynécologie">Gynécologie</option>
                  <option value="Dermatologie">Dermatologie</option>
                  <option value="Cardiologie">Cardiologie</option>
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

        <p className="text-center text-gray-500 text-sm mt-8">
          © KmrCare@2025. Tous droits réservés
        </p>
      </div>
    </div>
  );

  // Page de confirmation dispensaire
  const RegisterDispensaryConfirmPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex justify-center items-center p-4 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1551192422-6ea7bd54a7a8?q=80&w=2070&auto=format&fit=crop')` }}
      />
      
      <div
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
      </div>
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
        <div
        >
          {renderCurrentPage()}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default Authentification;
