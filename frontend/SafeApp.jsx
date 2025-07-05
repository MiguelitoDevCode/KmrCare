/**
 * Version simplifiée de App.jsx pour tester les stores
 * À utiliser temporairement si l'app principale a des problèmes
 */

import { useEffect, useState } from 'react';

// Import des stores en mode sécurisé
const SafeApp = () => {
  const [storeStatus, setStoreStatus] = useState({
    auth: '🔄 Test en cours...',
    ui: '🔄 Test en cours...',
    notifications: '🔄 Test en cours...',
    data: '🔄 Test en cours...',
    preferences: '🔄 Test en cours...',
    index: '🔄 Test en cours...'
  });

  useEffect(() => {
    const testStores = async () => {
      const newStatus = { ...storeStatus };

      // Test Auth Store
      try {
        await import('./src/_store/auth.js');
        newStatus.auth = '✅ Auth Store OK';
      } catch (error) {
        newStatus.auth = `❌ Auth Store Erreur: ${error.message}`;
      }

      // Test UI Store
      try {
        await import('./src/_store/ui.js');
        newStatus.ui = '✅ UI Store OK';
      } catch (error) {
        newStatus.ui = `❌ UI Store Erreur: ${error.message}`;
      }

      // Test Notifications Store
      try {
        await import('./src/_store/notifications.js');
        newStatus.notifications = '✅ Notifications Store OK';
      } catch (error) {
        newStatus.notifications = `❌ Notifications Store Erreur: ${error.message}`;
      }

      // Test Data Store
      try {
        await import('./src/_store/data.js');
        newStatus.data = '✅ Data Store OK';
      } catch (error) {
        newStatus.data = `❌ Data Store Erreur: ${error.message}`;
      }

      // Test Preferences Store
      try {
        await import('./src/_store/preferences.js');
        newStatus.preferences = '✅ Preferences Store OK';
      } catch (error) {
        newStatus.preferences = `❌ Preferences Store Erreur: ${error.message}`;
      }

      // Test Index Store
      try {
        await import('./src/_store/index.js');
        newStatus.index = '✅ Index Store OK';
      } catch (error) {
        newStatus.index = `❌ Index Store Erreur: ${error.message}`;
      }

      setStoreStatus(newStatus);
    };

    testStores();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#333', textAlign: 'center' }}>
        🏥 KmrCare - Test de Démarrage
      </h1>
      
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2>📊 Status des Stores</h2>
        
        {Object.entries(storeStatus).map(([storeName, status]) => (
          <div key={storeName} style={{
            margin: '10px 0',
            padding: '10px',
            backgroundColor: status.includes('✅') ? '#d4edda' : 
                           status.includes('❌') ? '#f8d7da' : '#fff3cd',
            border: '1px solid',
            borderColor: status.includes('✅') ? '#c3e6cb' : 
                        status.includes('❌') ? '#f5c6cb' : '#ffeaa7',
            borderRadius: '4px'
          }}>
            <strong>{storeName.toUpperCase()}:</strong> {status}
          </div>
        ))}
        
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            🔄 Recharger les Tests
          </button>
        </div>
      </div>
    </div>
  );
};

export default SafeApp;
