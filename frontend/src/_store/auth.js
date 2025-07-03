import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

// Store Zustand équivalent au store Pinia
export const useAuth = create()(
  devtools(
    persist(
      (set, get) => ({
        // État
        user: null,

        // Actions équivalentes à votre store Pinia
        loadUser: () => {
          const userData = Cookies.get('auth');
          if (userData) {
            try {
              const user = JSON.parse(userData);
              set({ user }, false, 'loadUser');
            } catch (error) {
              console.error('Erreur lors du chargement de l\'utilisateur:', error);
              Cookies.remove('auth');
            }
          }
        },

        setUser: (userData) => {
          set({ user: userData }, false, 'setUser');
          Cookies.set('auth', JSON.stringify(userData), { 
            expires: 1, 
            secure: true,
            sameSite: 'strict'
          });
        },

        getUser: () => {
          return get().user;
        },

        clearUser: () => {
          set({ user: null }, false, 'clearUser');
          Cookies.remove('auth');
        },

        // Getters calculés (équivalents aux computed de Vue)
        isAuthenticated: () => {
          return get().user !== null;
        },

        getUserName: () => {
          return get().user?.name || '';
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
        }
      }),
      {
        name: 'auth-storage', // nom de la clé dans le localStorage
        // Optionnel: personnaliser ce qui est persisté
        partialize: (state) => ({ user: state.user }),
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

// Hooks utilitaires pour l'authentification
export const useAuthUser = () => useAuth((state) => state.user);
export const useIsAuthenticated = () => useAuth((state) => state.isAuthenticated());
export const useUserRole = () => useAuth((state) => state.getUserRole());

// Support HMR pour Vite (équivalent au HMR de Pinia)
if (import.meta.hot) {
  import.meta.hot.accept();
}