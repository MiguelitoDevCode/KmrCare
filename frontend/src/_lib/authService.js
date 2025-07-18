/* eslint-disable no-unused-vars */
import { authAPI } from './api.js';
import { useNotify } from '../_store/notifications.js';

/**
 * Service d'authentification
 * Gère les opérations de connexion, inscription et profil utilisateur
 */

/**
 * Connexion d'un utilisateur
 * @param {Object} credentials - Identifiants de connexion
 * @param {string} credentials.email - Email ou nom d'utilisateur
 * @param {string} credentials.password - Mot de passe
 * @returns {Promise<Object>} Données utilisateur et tokens
 */
export async function loginUser(credentials) {
  try {
    if (!credentials.email || !credentials.password) {
      throw new Error('Email et mot de passe requis.');
    }

    const response = await authAPI.login(credentials);
    
    // Le backend devrait retourner { user, access_token, refresh_token }
    const { user, access_token, refresh_token, access, refresh } = response;
    
    return {
      user,
      accessToken: access_token || access,
      refreshToken: refresh_token || refresh
    };
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    
    if (error.response?.status === 401) {
      throw new Error('Email ou mot de passe incorrect.');
    }
    if (error.response?.status === 403) {
      throw new Error('Compte désactivé. Contactez l\'administrateur.');
    }
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw new Error('Erreur de connexion. Vérifiez votre connexion.');
  }
}

/**
 * Inscription d'un nouvel utilisateur
 * @param {Object} userData - Données d'inscription
 * @returns {Promise<Object>} Données utilisateur créé
 */
export async function registerUser(userData) {
  try {
    // Validation côté frontend
    if (!userData.email || !userData.password) {
      throw new Error('Email et mot de passe requis.');
    }
    if (!userData.first_name || !userData.last_name) {
      throw new Error('Prénom et nom requis.');
    }
    if (userData.password.length < 8) {
      throw new Error('Le mot de passe doit contenir au moins 8 caractères.');
    }
    if (userData.password !== userData.confirmPassword) {
      throw new Error('Les mots de passe ne correspondent pas.');
    }

    // Suppression du champ de confirmation avant envoi
    const { confirmPassword, ...dataToSend } = userData;
    
    const response = await authAPI.register(dataToSend);
    
    // Le backend peut retourner directement l'utilisateur ou avec des tokens
    const { user, access_token, refresh_token, access, refresh } = response;
    
    return {
      user: user || response,
      accessToken: access_token || access,
      refreshToken: refresh_token || refresh
    };
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    
    if (error.response?.status === 400) {
      const errorData = error.response.data;
      if (errorData.email) {
        throw new Error('Cet email est déjà utilisé.');
      }
      if (errorData.message) {
        throw new Error(errorData.message);
      }
    }
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw new Error('Erreur lors de l\'inscription. Vérifiez vos données.');
  }
}

/**
 * Déconnexion de l'utilisateur
 * @returns {Promise<boolean>} Succès de la déconnexion
 */
export async function logoutUser() {
  try {
    await authAPI.logout();
    return true;
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    // On continue la déconnexion côté client même si l'API échoue
    return true;
  }
}

/**
 * Récupération du profil utilisateur actuel
 * @returns {Promise<Object>} Profil utilisateur
 */
export async function fetchUserProfile() {
  try {
    const response = await authAPI.getProfile();
    return response.data || response;
  } catch (error) {
    console.error('Erreur lors de la récupération du profil:', error);
    
    if (error.response?.status === 401) {
      throw new Error('Session expirée. Veuillez vous reconnecter.');
    }
    
    throw new Error('Impossible de charger le profil utilisateur.');
  }
}

/**
 * Mise à jour du profil utilisateur
 * @param {Object} profileData - Nouvelles données du profil
 * @returns {Promise<Object>} Profil mis à jour
 */
export async function updateUserProfile(profileData) {
  try {
    const response = await authAPI.updateProfile(profileData);
    return response.data || response;
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw new Error('Impossible de mettre à jour le profil.');
  }
}

/**
 * Changement de mot de passe
 * @param {Object} passwordData - Données de changement de mot de passe
 * @param {string} passwordData.currentPassword - Mot de passe actuel
 * @param {string} passwordData.newPassword - Nouveau mot de passe
 * @param {string} passwordData.confirmPassword - Confirmation du nouveau mot de passe
 * @returns {Promise<boolean>} Succès du changement
 */
export async function changePassword(passwordData) {
  try {
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      throw new Error('Mot de passe actuel et nouveau mot de passe requis.');
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      throw new Error('Les mots de passe ne correspondent pas.');
    }
    if (passwordData.newPassword.length < 8) {
      throw new Error('Le nouveau mot de passe doit contenir au moins 8 caractères.');
    }

    await authAPI.changePassword({
      current_password: passwordData.currentPassword,
      new_password: passwordData.newPassword
    });
    
    return true;
  } catch (error) {
    console.error('Erreur lors du changement de mot de passe:', error);
    
    if (error.response?.status === 400) {
      throw new Error('Mot de passe actuel incorrect.');
    }
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw new Error('Impossible de changer le mot de passe.');
  }
}

/**
 * Réinitialisation de mot de passe (demande)
 * @param {string} email - Email pour la réinitialisation
 * @returns {Promise<boolean>} Succès de l'envoi
 */
export async function requestPasswordReset(email) {
  try {
    if (!email) {
      throw new Error('Email requis.');
    }

    await authAPI.requestPasswordReset({ email });
    return true;
  } catch (error) {
    console.error('Erreur lors de la demande de réinitialisation:', error);
    
    if (error.response?.status === 404) {
      throw new Error('Aucun compte associé à cet email.');
    }
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    
    throw new Error('Impossible d\'envoyer l\'email de réinitialisation.');
  }
}

/**
 * Vérification du statut de l'utilisateur connecté
 * @returns {Promise<Object>} Statut et informations utilisateur
 */
export async function checkAuthStatus() {
  try {
    const response = await authAPI.getProfile();
    return {
      isAuthenticated: true,
      user: response.data || response
    };
  } catch (error) {
    return {
      isAuthenticated: false,
      user: null
    };
  }
}

/**
 * Hook personnalisé pour l'authentification avec API
 */
export function useAuthAPI() {
  const notify = useNotify();

  return {
    // Opérations d'authentification
    async login(credentials) {
      try {
        const result = await loginUser(credentials);
        notify.success('Connexion réussie !');
        return result;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    },

    async register(userData) {
      try {
        const result = await registerUser(userData);
        notify.success('Inscription réussie !');
        return result;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    },

    async logout() {
      try {
        await logoutUser();
        notify.success('Déconnexion réussie');
        return true;
      } catch (error) {
        // On continue même en cas d'erreur
        notify.success('Déconnexion réussie');
        return true;
      }
    },

    // Opérations de profil
    async loadProfile() {
      try {
        const profile = await fetchUserProfile();
        return profile;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    },

    async saveProfile(profileData) {
      try {
        const result = await updateUserProfile(profileData);
        notify.success('Profil mis à jour avec succès');
        return result;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    },

    async changePassword(passwordData) {
      try {
        await changePassword(passwordData);
        notify.success('Mot de passe modifié avec succès');
        return true;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    },

    async resetPassword(email) {
      try {
        await requestPasswordReset(email);
        notify.success('Email de réinitialisation envoyé');
        return true;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    },

    async checkStatus() {
      try {
        const status = await checkAuthStatus();
        return status;
      } catch (error) {
        console.error('Erreur lors de la vérification du statut:', error);
        return { isAuthenticated: false, user: null };
      }
    }
  };
}

export default {
  loginUser,
  registerUser,
  logoutUser,
  fetchUserProfile,
  updateUserProfile,
  changePassword,
  requestPasswordReset,
  checkAuthStatus,
  useAuthAPI
};
