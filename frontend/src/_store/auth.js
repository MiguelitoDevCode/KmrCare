import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { loginUser, registerUser, logoutUser, fetchUserProfile, updateUserProfile } from '../_lib/authService.js';

// Store Zustand équivalent au store Pinia avec intégration API
export const useAuth = create()(
  devtools(
    persist(
      (set, get) => ({
        // État
        user: null,
        isLoading: false,
        accessToken: null,
        refreshToken: null,

        // Actions équivalentes à votre store Pinia + API
        loadUser: () => {
          const userData = Cookies.get('auth');
          const accessToken = Cookies.get('access_token');
          const refreshToken = Cookies.get('refresh_token');
          
          if (userData && accessToken) {
            try {
              const user = JSON.parse(userData);
              set({ 
                user,
                accessToken,
                refreshToken
              }, false, 'loadUser');
            } catch (error) {
              console.error('Erreur lors du chargement de l\'utilisateur:', error);
              get().clearUser();
            }
          }
        },

        setUser: (userData, tokens = {}) => {
          const { accessToken, refreshToken } = tokens;
          
          set({ 
            user: userData,
            accessToken,
            refreshToken
          }, false, 'setUser');
          
          // Stockage sécurisé
          Cookies.set('auth', JSON.stringify(userData), { 
            expires: 1, 
            secure: true,
            sameSite: 'strict'
          });
          
          if (accessToken) {
            Cookies.set('access_token', accessToken, {
              expires: 1,
              secure: true,
              sameSite: 'strict'
            });
          }
          
          if (refreshToken) {
            Cookies.set('refresh_token', refreshToken, {
              expires: 7, // Refresh token plus long
              secure: true,
              sameSite: 'strict'
            });
          }
        },

        getUser: () => {
          return get().user;
        },

        clearUser: () => {
          set({ 
            user: null,
            accessToken: null,
            refreshToken: null
          }, false, 'clearUser');
          
          Cookies.remove('auth');
          Cookies.remove('access_token');
          Cookies.remove('refresh_token');
        },

        setLoading: (loading) => {
          set({ isLoading: loading }, false, 'setLoading');
        },

        // Nouvelles actions avec intégration API
        login: async (credentials) => {
          try {
            set({ isLoading: true }, false, 'login-start');
            
            const { user, accessToken, refreshToken } = await loginUser(credentials);
            
            get().setUser(user, { accessToken, refreshToken });
            
            return user;
          } finally {
            set({ isLoading: false }, false, 'login-end');
          }
        },

        register: async (userData) => {
          try {
            set({ isLoading: true }, false, 'register-start');
            
            const { user, accessToken, refreshToken } = await registerUser(userData);
            
            get().setUser(user, { accessToken, refreshToken });
            
            return user;
          } finally {
            set({ isLoading: false }, false, 'register-end');
          }
        },

        logout: async () => {
          try {
            set({ isLoading: true }, false, 'logout-start');
            
            await logoutUser();
            
          } catch (error) {
            // On continue même en cas d'erreur
            console.error('Erreur lors de la déconnexion API:', error);
          } finally {
            get().clearUser();
            set({ isLoading: false }, false, 'logout-end');
          }
        },

        updateProfile: async (profileData) => {
          try {
            set({ isLoading: true }, false, 'update-profile-start');
            
            const updatedUser = await updateUserProfile(profileData);
            
            // Mise à jour locale
            set(state => ({
              user: { ...state.user, ...updatedUser }
            }), false, 'update-profile');
            
            // Mise à jour des cookies
            const newUserData = { ...get().user, ...updatedUser };
            Cookies.set('auth', JSON.stringify(newUserData), { 
              expires: 1, 
              secure: true,
              sameSite: 'strict'
            });
            
            return updatedUser;
          } finally {
            set({ isLoading: false }, false, 'update-profile-end');
          }
        },

        refreshProfile: async () => {
          try {
            const profile = await fetchUserProfile();
            
            set({ user: profile }, false, 'refresh-profile');
            
            Cookies.set('auth', JSON.stringify(profile), { 
              expires: 1, 
              secure: true,
              sameSite: 'strict'
            });
            
            return profile;
          } catch (error) {
            // Si le profil ne peut pas être chargé, déconnecter
            get().clearUser();
            throw error;
          }
        },

        // Getters calculés (équivalents aux computed de Vue)
        isAuthenticated: () => {
          return get().user !== null && get().accessToken !== null;
        },

        getUserName: () => {
          const user = get().user;
          return user ? `${user.first_name || ''} ${user.last_name || ''}`.trim() : '';
        },

        getUserEmail: () => {
          return get().user?.email || '';
        },

        getUserRole: () => {
          return get().user?.role || null;
        },

        isAdmin: () => {
          return get().user?.role === 'admin';
        },

        isDoctor: () => {
          return get().user?.role === 'doctor';
        },

        isPatient: () => {
          return get().user?.role === 'patient';
        },

        getAccessToken: () => {
          return get().accessToken;
        },

        getRefreshToken: () => {
          return get().refreshToken;
        }
      }),
      {
        name: 'auth-storage', // nom de la clé dans le localStorage
        // Optionnel: personnaliser ce qui est persisté
        partialize: (state) => ({ 
          user: state.user,
          accessToken: state.accessToken,
          refreshToken: state.refreshToken
        }),
        // Callback quand l'état est restauré depuis le localStorage
        onRehydrateStorage: () => (state) => {
          // Charger aussi depuis les cookies au cas où
          if (state) {
            state.loadUser();
          }
        },
      }
    ),
    {
      name: 'auth-store', // nom pour les DevTools
    }
  )
);

// Hook personnalisé pour l'initialisation (équivalent à l'auto-chargement de Pinia)
export const useAuthInit = () => {
  const loadUser = useAuth((state) => state.loadUser);
  
  // Charger l'utilisateur au premier rendu
  useEffect(() => {
    loadUser();
  }, [loadUser]);
};

// Hook personnalisé pour récupérer seulement les actions d'auth
export const useAuthActions = () => {
  const login = useAuth((state) => state.login);
  const register = useAuth((state) => state.register);
  const logout = useAuth((state) => state.logout);
  const updateProfile = useAuth((state) => state.updateProfile);
  const refreshProfile = useAuth((state) => state.refreshProfile);
  
  return {
    login,
    register,
    logout,
    updateProfile,
    refreshProfile
  };
};

// Hook personnalisé pour récupérer seulement l'état d'auth
export const useAuthState = () => {
  const user = useAuth((state) => state.user);
  const isLoading = useAuth((state) => state.isLoading);
  const isAuthenticated = useAuth((state) => state.isAuthenticated());
  const getUserName = useAuth((state) => state.getUserName);
  const getUserEmail = useAuth((state) => state.getUserEmail);
  const getUserRole = useAuth((state) => state.getUserRole);
  const isAdmin = useAuth((state) => state.isAdmin);
  const isDoctor = useAuth((state) => state.isDoctor);
  const isPatient = useAuth((state) => state.isPatient);
  
  return {
    user,
    isLoading,
    isAuthenticated,
    userName: getUserName(),
    userEmail: getUserEmail(),
    userRole: getUserRole(),
    isAdmin: isAdmin(),
    isDoctor: isDoctor(),
    isPatient: isPatient()
  };
};
export const useAuthUser = () => useAuth((state) => state.user);
export const useIsAuthenticated = () => useAuth((state) => state.isAuthenticated());
export const useUserRole = () => useAuth((state) => state.getUserRole());

// Support HMR pour Vite (équivalent au HMR de Pinia)
if (import.meta.hot) {
  import.meta.hot.accept();
}