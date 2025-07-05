# 📚 Guide de Migration - Gestion d'État Globale

Ce guide explique comment migrer vos composants existants vers la nouvelle architecture de gestion d'état globale basée sur Zustand.

## 🎯 Vue d'Ensemble

Notre nouvelle architecture comprend 5 stores spécialisés :
- **Auth** : Authentification et gestion des utilisateurs
- **UI** : Interface utilisateur (modales, loading, filtres, pagination)
- **Notifications** : Système de notifications global
- **Data** : Cache et données partagées
- **Preferences** : Préférences utilisateur persistantes

## 🔄 Patterns de Migration

### 1. Migration des États Locaux vers UI Store

#### ❌ Avant (État Local)
```jsx
import { useState } from 'react';

const MyComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});

  return (
    <div>
      {isLoading && <div>Chargement...</div>}
      {/* Composant */}
    </div>
  );
};
```

#### ✅ Après (UI Store)
```jsx
import { useUI, useModal, useLoading, usePagination, useFilters } from '../_store';

const MyComponent = () => {
  const { toggleModal } = useModal();
  const { isLoading, setLoading } = useLoading();
  const { currentPage, setPage } = usePagination();
  const { filters, updateFilters } = useFilters();

  return (
    <div>
      {isLoading && <div>Chargement...</div>}
      {/* Composant */}
    </div>
  );
};
```

### 2. Migration des Notifications

#### ❌ Avant (Alert ou Toast Local)
```jsx
import { useState } from 'react';

const MyComponent = () => {
  const [alert, setAlert] = useState(null);

  const showSuccess = (message) => {
    setAlert({ type: 'success', message });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleSave = async () => {
    try {
      await saveData();
      showSuccess('Données sauvegardées !');
    } catch (error) {
      setAlert({ type: 'error', message: error.message });
    }
  };

  return (
    <div>
      {alert && (
        <div className={`alert alert-${alert.type}`}>
          {alert.message}
        </div>
      )}
      <button onClick={handleSave}>Sauvegarder</button>
    </div>
  );
};
```

#### ✅ Après (Notifications Store)
```jsx
import { useNotify } from '../_store';

const MyComponent = () => {
  const notify = useNotify();

  const handleSave = async () => {
    try {
      await saveData();
      notify({
        title: 'Succès',
        message: 'Données sauvegardées avec succès !',
        type: 'success'
      });
    } catch (error) {
      notify({
        title: 'Erreur',
        message: error.message,
        type: 'error'
      });
    }
  };

  return (
    <div>
      <button onClick={handleSave}>Sauvegarder</button>
    </div>
  );
};
```

### 3. Migration des Données vers Data Store

#### ❌ Avant (useEffect + useState)
```jsx
import { useState, useEffect } from 'react';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      {loading && <div>Chargement...</div>}
      {error && <div>Erreur: {error}</div>}
      {users.map(user => <div key={user.id}>{user.name}</div>)}
    </div>
  );
};
```

#### ✅ Après (Data Store)
```jsx
import { useUsers } from '../_store';

const UsersList = () => {
  const { users, loading, error, fetchUsers } = useUsers();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div>
      {loading && <div>Chargement...</div>}
      {error && <div>Erreur: {error}</div>}
      {users.map(user => <div key={user.id}>{user.name}</div>)}
    </div>
  );
};
```

### 4. Migration des Hooks Composés

#### ❌ Avant (Gestion Manuelle)
```jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../_store';

const AdminComponent = () => {
  const { user, isAuthenticated } = useAuth();
  const [canAccess, setCanAccess] = useState(false);

  useEffect(() => {
    setCanAccess(isAuthenticated && user?.role === 'admin');
  }, [isAuthenticated, user]);

  if (!canAccess) {
    return <div>Accès refusé</div>;
  }

  return <div>Interface Admin</div>;
};
```

#### ✅ Après (Hook Composé)
```jsx
import { useAdmin } from '../hooks/useComposedStores';

const AdminComponent = () => {
  const { canAccess, isLoading } = useAdmin();

  if (isLoading) return <div>Chargement...</div>;
  if (!canAccess) return <div>Accès refusé</div>;

  return <div>Interface Admin</div>;
};
```

## 🛠️ Étapes de Migration

### Étape 1 : Identifier les États à Migrer

1. **États UI** : modales, loading, filtres, pagination, sidebar
2. **Données** : listes d'utilisateurs, dispensaires, rendez-vous
3. **Notifications** : messages d'erreur, confirmations, toasts
4. **Préférences** : thème, langue, taille des tableaux

### Étape 2 : Mise à Jour des Imports

```jsx
// ❌ Anciens imports
import { useState, useEffect } from 'react';

// ✅ Nouveaux imports
import { 
  useUI, 
  useNotify, 
  useUsers, 
  usePreferences 
} from '../_store';
```

### Étape 3 : Remplacement du Code

1. Identifier les `useState` concernés
2. Les remplacer par les hooks appropriés
3. Supprimer les `useEffect` redondants
4. Utiliser les notifications globales

### Étape 4 : Tests et Validation

1. Vérifier que les fonctionnalités marchent
2. Tester la persistance des données
3. Valider les notifications
4. Contrôler les performances

## 📋 Checklist de Migration

### Pour chaque composant :

- [ ] **États UI migres vers useUI**
  - [ ] Modales → `useModal()`
  - [ ] Loading → `useLoading()`
  - [ ] Filtres → `useFilters()`
  - [ ] Pagination → `usePagination()`

- [ ] **Notifications migrées**
  - [ ] Alerts → `useNotify()`
  - [ ] Toasts → `useNotify()`
  - [ ] Confirmations → `useNotify()` avec actions

- [ ] **Données migrées vers useData**
  - [ ] API calls → hooks spécialisés
  - [ ] Cache local → store global
  - [ ] États de chargement → stores

- [ ] **Gestion d'erreurs**
  - [ ] Try/catch → `useApiErrorHandler()`
  - [ ] Notifications d'erreur → store notifications

## 🎨 Exemples d'Utilisation

### Formulaire avec Validation et Notifications

```jsx
import { useNotify, useLoading } from '../_store';
import { useApiErrorHandler } from '../hooks/useComposedStores';

const UserForm = ({ userId }) => {
  const notify = useNotify();
  const { setLoading } = useLoading();
  const { handleApiError } = useApiErrorHandler();

  const handleSubmit = async (formData) => {
    setLoading('userForm', true);
    
    try {
      await saveUser(formData);
      notify({
        title: 'Utilisateur sauvegardé',
        message: 'Les informations ont été mises à jour avec succès',
        type: 'success'
      });
    } catch (error) {
      handleApiError(error, 'Erreur lors de la sauvegarde');
    } finally {
      setLoading('userForm', false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Champs du formulaire */}
    </form>
  );
};
```

### Liste avec Filtres et Pagination

```jsx
import { useUsers, useFilters, usePagination } from '../_store';

const UsersList = () => {
  const { users, loading } = useUsers();
  const { filters, updateFilters } = useFilters();
  const { currentPage, setPage, pageSize } = usePagination();

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(filters.search?.toLowerCase() || '')
  );

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher..."
        value={filters.search || ''}
        onChange={(e) => updateFilters({ search: e.target.value })}
      />
      
      {loading ? (
        <div>Chargement...</div>
      ) : (
        <div>
          {paginatedUsers.map(user => (
            <div key={user.id}>{user.name}</div>
          ))}
        </div>
      )}
    </div>
  );
};
```

## 🚀 Bonnes Pratiques

### 1. Utiliser les Hooks Spécialisés
```jsx
// ✅ Bon
const { users, loading, error, fetchUsers } = useUsers();

// ❌ Éviter
const { users, loading, error, actions } = useData();
const { fetchUsers } = actions;
```

### 2. Gérer les Erreurs de Façon Centralisée
```jsx
import { useApiErrorHandler } from '../hooks/useComposedStores';

const { handleApiError } = useApiErrorHandler();

try {
  await apiCall();
} catch (error) {
  handleApiError(error, 'Message contexte');
}
```

### 3. Utiliser la Composition de Hooks
```jsx
import { useAdmin, useDoctor } from '../hooks/useComposedStores';

// Pour les admins
const { canAccess, adminData } = useAdmin();

// Pour les docteurs
const { canAccess, doctorData } = useDoctor();
```

### 4. Optimiser les Re-renders
```jsx
// ✅ Bon - sélection précise
const userName = useAuth(state => state.user?.name);

// ❌ Éviter - trop large
const { user } = useAuth();
const userName = user?.name;
```

## 🔧 Utilitaires Disponibles

### Debugging
```jsx
import { getGlobalState } from '../_store';

// Voir l'état complet
const state = await getGlobalState();
console.log(state);
```

### Réinitialisation
```jsx
import { clearAllStores } from '../_store';

// Nettoyer tous les stores
await clearAllStores();
```

### Middleware de Logging
Les stores sont automatiquement équipés du logging en développement.

## 📞 Support

Si vous rencontrez des difficultés lors de la migration :

1. **Consultez les exemples** dans `src/pages/DemoGestionEtatGlobale.jsx`
2. **Regardez les tests** existants
3. **Vérifiez la console** pour les logs automatiques
4. **Utilisez les outils de debug** dans la page de préférences

---

**Note** : Cette migration peut être faite progressivement, composant par composant, sans casser l'existant.
