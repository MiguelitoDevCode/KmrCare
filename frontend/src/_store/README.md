# 🏪 Gestion d'État Globale - KmrCare

## 🎯 Vue d'Ensemble

Cette architecture de gestion d'état globale offre une solution complète, performante et maintissable pour l'application KmrCare. Basée sur **Zustand**, elle remplace la gestion d'état locale dispersée par un système centralisé et cohérent.

## 🚀 Démarrage Rapide

### Installation
```bash
# Les dépendances sont déjà installées
npm install zustand
```

### Utilisation de Base
```jsx
import { useAuth, useNotify, useUI } from './_store';

const MyComponent = () => {
  const { user, isAuthenticated } = useAuth();
  const notify = useNotify();
  const { setLoading } = useUI();

  const handleAction = async () => {
    setLoading('myAction', true);
    try {
      // Action...
      notify({
        title: 'Succès',
        message: 'Action réalisée avec succès',
        type: 'success'
      });
    } catch (error) {
      notify({
        title: 'Erreur',
        message: error.message,
        type: 'error'
      });
    } finally {
      setLoading('myAction', false);
    }
  };

  return (
    <div>
      {isAuthenticated ? `Bonjour ${user.name}` : 'Non connecté'}
      <button onClick={handleAction}>Action</button>
    </div>
  );
};
```

## 📁 Structure

```
src/_store/
├── 📄 index.js                 # Point d'entrée centralisé
├── 🔐 auth.js                  # Authentification et utilisateurs
├── 🎨 ui.js                    # Interface utilisateur (modales, loading, etc.)
├── 🔔 notifications.js         # Système de notifications globales
├── 📊 data.js                  # Cache et données partagées
├── ⚙️ preferences.js           # Préférences utilisateur persistantes
├── 🔧 middleware.js            # Middlewares (logging, performance, etc.)
└── 🧪 validation.js            # Tests et validation
```

## 🎛️ Stores Disponibles

### 🔐 Auth Store
Gestion de l'authentification et des utilisateurs.
```jsx
const { user, isAuthenticated, login, logout, loadUser } = useAuth();
```

### 🎨 UI Store
Gestion de l'interface utilisateur.
```jsx
const { setLoading, openModal, closeModal } = useUI();
const { isLoading } = useLoading();
const { isOpen, open, close } = useModal();
```

### 🔔 Notifications Store
Système de notifications globales.
```jsx
const notify = useNotify();

notify({
  title: 'Titre',
  message: 'Message',
  type: 'success|error|warning|info|loading|confirm|progress',
  duration: 3000, // ms ou 0 pour persistant
  actions: [{ label: 'Action', action: () => {} }]
});
```

### 📊 Data Store
Cache et gestion des données.
```jsx
const { users, dispensaires, appointments } = useData();
const { users, loading, fetchUsers } = useUsers();
```

### ⚙️ Preferences Store
Préférences utilisateur persistantes.
```jsx
const { theme, setTheme } = usePreferences();
const { toggleTheme } = useTheme();
```

## 🔗 Hooks Composés

Pour des cas d'usage avancés :

```jsx
import { useAdmin, useDoctor, useApiErrorHandler } from '../hooks/useComposedStores';

// Pour les administrateurs
const { canAccess, adminData, isLoading } = useAdmin();

// Pour les docteurs
const { canAccess, doctorData, isLoading } = useDoctor();

// Gestion d'erreurs API
const { handleApiError } = useApiErrorHandler();
```

## 🧪 Tests et Validation

### Console du Navigateur
```javascript
// Tester tous les stores
await validateGlobalState();

// Nettoyer après tests
await cleanupTests();

// Voir l'état global complet
const state = await getGlobalState();
```

### Page de Démonstration
Visitez `/preferences` (après connexion) pour une interface complète de test et de configuration.

## 🛠️ Développement

### Debugging
Le logging automatique est activé en mode développement. Regardez la console pour voir tous les changements d'état.

### Performance
Les middlewares de performance alertent automatiquement si une action prend plus de 10ms.

### Error Boundary
Un système global de gestion d'erreurs est intégré et connecté aux notifications.

## 📚 Documentation Complète

- **[Guide de Migration](./GUIDE_MIGRATION_GESTION_ETAT.md)** - Comment migrer vos composants
- **[Rapport d'Analyse](./GESTION_ETAT_GLOBALE_ANALYSE.md)** - Analyse initiale du projet
- **[Rapport Final](./GESTION_ETAT_GLOBALE_RAPPORT_FINAL.md)** - Documentation technique complète
- **[Implémentation Complète](./GESTION_ETAT_GLOBALE_IMPLEMENTATION_COMPLETE.md)** - Résumé final

## 🎨 Exemples Concrets

### Formulaire avec Validation
```jsx
const UserForm = () => {
  const notify = useNotify();
  const { setLoading } = useLoading();

  const handleSubmit = async (data) => {
    setLoading('userForm', true);
    try {
      await saveUser(data);
      notify({
        title: 'Utilisateur sauvegardé',
        message: 'Les données ont été mises à jour',
        type: 'success'
      });
    } catch (error) {
      notify({
        title: 'Erreur de sauvegarde',
        message: error.message,
        type: 'error'
      });
    } finally {
      setLoading('userForm', false);
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
};
```

### Liste avec Filtres et Pagination
```jsx
const UsersList = () => {
  const { users, loading } = useUsers();
  const { filters, updateFilters } = useFilters();
  const { currentPage, setPage } = usePagination();

  return (
    <div>
      <input
        value={filters.search || ''}
        onChange={(e) => updateFilters({ search: e.target.value })}
        placeholder="Rechercher..."
      />
      {/* Liste avec pagination */}
    </div>
  );
};
```

### Gestion d'Erreurs Avancée
```jsx
const AdminComponent = () => {
  const { canAccess } = useAdmin();
  const { handleApiError } = useApiErrorHandler();

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      // Succès géré automatiquement
    } catch (error) {
      handleApiError(error, 'Erreur lors de la suppression');
    }
  };

  if (!canAccess) return <AccessDenied />;
  return <AdminInterface onDelete={handleDelete} />;
};
```

## 🔄 Migration

Pour migrer vos composants existants :

1. **Remplacez** les `useState` par les hooks appropriés
2. **Supprimez** les `useEffect` redondants
3. **Utilisez** les notifications globales
4. **Testez** avec les outils de validation

Consultez le [Guide de Migration](./GUIDE_MIGRATION_GESTION_ETAT.md) pour des exemples détaillés.

## 🎉 Avantages

- **🚀 Performance** : Cache intelligent, optimisations automatiques
- **🛡️ Robustesse** : Gestion d'erreurs, fallbacks, récupération
- **🧩 Modularité** : Stores spécialisés, code réutilisable
- **📱 Réactivité** : Mises à jour en temps réel
- **🔧 Maintenabilité** : Code propre, documentation complète
- **🎨 UX Cohérente** : Design system unifié

---

**🎯 Prêt pour la production** - Utilisez immédiatement ou migrez progressivement !

Pour toute question : consultez la documentation ou testez dans la page `/preferences`.
