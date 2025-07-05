/**
 * Configuration et services API pour l'intégration backend Django
 * Point d'entrée pour toutes les communications avec l'API
 */

// Configuration de base de l'API
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://will1285.pythonanywhere.com',
  API_VERSION: 'v1',
  TIMEOUT: 30000,
  
  // Endpoints principaux
  ENDPOINTS: {
    // Authentification
    AUTH: {
      LOGIN_USER: '/auth/login/user/',
      LOGIN_DOCTOR: '/auth/login/doctor/',
      LOGIN_ADMIN: '/auth/login/admin/',
      REGISTER_USER: '/auth/register/user/',
      REGISTER_OWNER: '/auth/register/owner/',
      REGISTER_ADMIN: '/auth/register/admin/',
      PROFILE: '/auth/profile',
      REQUESTS: '/auth/request/list/',
      APPROVE_REQUEST: '/auth/request/approve',
      REJECT_REQUEST: '/auth/request/reject'
    },
    
    // Soins et dispensaires
    CARE: {
      DISPENSARIES: '/care/dispensary/list/',
      DISPENSARY_DETAIL: '/care/dispensary/details',
      DISPENSARY_UPDATE: '/care/dispensary/update',
      DISPENSARY_DELETE: '/care/dispensary/delete',
      DOCTORS: '/care/doctor/list/',
      DOCTOR_CREATE: '/care/doctor/create',
      DOCTOR_DETAIL: '/care/doctor/details',
      DOCTOR_DELETE: '/care/doctor/delete'
    }
  }
};

// Configuration des headers par défaut
const getDefaultHeaders = () => {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  
  // Ajouter le token d'authentification si disponible
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Token ${token}`;
  }
  
  return headers;
};

// Récupération du token d'authentification
const getAuthToken = () => {
  try {
    const authData = localStorage.getItem('kmrcare_auth');
    if (authData) {
      const parsed = JSON.parse(authData);
      return parsed.token?.key;
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du token:', error);
  }
  return null;
};

// Vérification de la validité du token
const isTokenValid = () => {
  try {
    const authData = localStorage.getItem('kmrcare_auth');
    if (authData) {
      const parsed = JSON.parse(authData);
      const expiration = parsed.token?.token_exp;
      if (expiration) {
        return Date.now() < expiration;
      }
    }
  } catch (error) {
    console.error('Erreur lors de la vérification du token:', error);
  }
  return false;
};

// Classe principale pour les requêtes API
class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
  }

  // Méthode générique pour les requêtes
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      method: 'GET',
      headers: getDefaultHeaders(),
      timeout: this.timeout,
      ...options
    };

    try {
      console.log(`🌐 API Request: ${config.method} ${url}`);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);
      
      const response = await fetch(url, {
        ...config,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      // Vérifier si la réponse est ok
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      // Essayer de parser en JSON
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }
      
      console.log(`✅ API Response: ${config.method} ${url}`, data);
      return data;
      
    } catch (error) {
      console.error(`❌ API Error: ${config.method} ${url}`, error);
      
      if (error.name === 'AbortError') {
        throw new Error('Timeout: La requête a pris trop de temps');
      }
      
      if (error.message.includes('401')) {
        // Token expiré ou invalide
        this.clearAuth();
        throw new Error('Session expirée, veuillez vous reconnecter');
      }
      
      throw error;
    }
  }

  // Méthodes HTTP spécifiques
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.request(url, { method: 'GET' });
  }

  async post(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  async uploadFile(endpoint, formData) {
    const headers = getDefaultHeaders();
    delete headers['Content-Type']; // Laisser le navigateur définir le Content-Type pour FormData
    
    return this.request(endpoint, {
      method: 'POST',
      headers,
      body: formData
    });
  }

  // Gestion de l'authentification
  setAuthToken(tokenData) {
    try {
      localStorage.setItem('kmrcare_auth', JSON.stringify(tokenData));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du token:', error);
    }
  }

  clearAuth() {
    try {
      localStorage.removeItem('kmrcare_auth');
    } catch (error) {
      console.error('Erreur lors de la suppression du token:', error);
    }
  }

  isAuthenticated() {
    return getAuthToken() && isTokenValid();
  }

  getCurrentUser() {
    try {
      const authData = localStorage.getItem('kmrcare_auth');
      if (authData) {
        const parsed = JSON.parse(authData);
        return parsed.user;
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    }
    return null;
  }
}

// Instance singleton du service API
const apiService = new ApiService();

// Services spécialisés pour chaque domaine
export const authAPI = {
  // Connexion utilisateur
  loginUser: async (credentials) => {
    const response = await apiService.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN_USER, credentials);
    if (response.token) {
      apiService.setAuthToken(response);
    }
    return response;
  },

  // Connexion médecin
  loginDoctor: async (credentials) => {
    const response = await apiService.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN_DOCTOR, credentials);
    if (response.token) {
      apiService.setAuthToken(response);
    }
    return response;
  },

  // Connexion admin
  loginAdmin: async (credentials) => {
    const response = await apiService.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN_ADMIN, credentials);
    if (response.token) {
      apiService.setAuthToken(response);
    }
    return response;
  },

  // Inscription utilisateur
  registerUser: async (userData) => {
    return apiService.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER_USER, userData);
  },

  // Inscription propriétaire de dispensaire
  registerOwner: async (ownerData) => {
    return apiService.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER_OWNER, ownerData);
  },

  // Déconnexion
  logout: () => {
    apiService.clearAuth();
  },

  // Profil utilisateur
  getProfile: async (token) => {
    return apiService.get(`${API_CONFIG.ENDPOINTS.AUTH.PROFILE}/${token}/`);
  },

  // Demandes d'inscription
  getRegistrationRequests: async () => {
    return apiService.get(API_CONFIG.ENDPOINTS.AUTH.REQUESTS);
  },

  // Approuver une demande
  approveRequest: async (token) => {
    return apiService.post(`${API_CONFIG.ENDPOINTS.AUTH.APPROVE_REQUEST}/${token}/`);
  },

  // Rejeter une demande
  rejectRequest: async (token) => {
    return apiService.post(`${API_CONFIG.ENDPOINTS.AUTH.REJECT_REQUEST}/${token}/`);
  }
};

export const careAPI = {
  // Dispensaires
  getDispensaries: async (params = {}) => {
    return apiService.get(API_CONFIG.ENDPOINTS.CARE.DISPENSARIES, params);
  },

  getDispensaryDetail: async (token) => {
    return apiService.get(`${API_CONFIG.ENDPOINTS.CARE.DISPENSARY_DETAIL}/${token}/`);
  },

  updateDispensary: async (token, data) => {
    return apiService.put(`${API_CONFIG.ENDPOINTS.CARE.DISPENSARY_UPDATE}/${token}/`, data);
  },

  deleteDispensary: async (token) => {
    return apiService.delete(`${API_CONFIG.ENDPOINTS.CARE.DISPENSARY_DELETE}/${token}/`);
  },

  // Médecins
  getDoctors: async (params = {}) => {
    return apiService.get(API_CONFIG.ENDPOINTS.CARE.DOCTORS, params);
  },

  createDoctor: async (token, doctorData) => {
    return apiService.post(`${API_CONFIG.ENDPOINTS.CARE.DOCTOR_CREATE}/${token}/`, doctorData);
  },

  getDoctorDetail: async (token) => {
    return apiService.get(`${API_CONFIG.ENDPOINTS.CARE.DOCTOR_DETAIL}/${token}/`);
  },

  deleteDoctor: async (token) => {
    return apiService.delete(`${API_CONFIG.ENDPOINTS.CARE.DOCTOR_DELETE}/${token}/`);
  }
};

// Utilitaires pour les erreurs API
export const handleApiError = (error, defaultMessage = 'Une erreur est survenue') => {
  console.error('API Error:', error);
  
  if (error.message.includes('Session expirée')) {
    return {
      type: 'auth_error',
      message: 'Votre session a expiré. Veuillez vous reconnecter.',
      shouldRedirect: true
    };
  }
  
  if (error.message.includes('Timeout')) {
    return {
      type: 'timeout_error',
      message: 'La requête a pris trop de temps. Vérifiez votre connexion.',
      shouldRetry: true
    };
  }
  
  if (error.message.includes('400')) {
    return {
      type: 'validation_error',
      message: 'Données invalides. Vérifiez vos informations.',
      shouldRetry: false
    };
  }
  
  if (error.message.includes('500')) {
    return {
      type: 'server_error',
      message: 'Erreur du serveur. Veuillez réessayer plus tard.',
      shouldRetry: true
    };
  }
  
  return {
    type: 'unknown_error',
    message: defaultMessage,
    shouldRetry: false
  };
};

// Export du service principal
export default apiService;

// Export des utilitaires
export { getAuthToken, isTokenValid };
