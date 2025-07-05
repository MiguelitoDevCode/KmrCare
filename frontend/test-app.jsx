/* eslint-disable no-unused-vars */
// Test simple de l'application
import React from 'react';

// Test d'import des stores
try {
  console.log('🧪 Test des imports des stores...');
  
  // Import des stores principaux
  import('./src/_store/auth.js').then(() => {
    console.log('✅ Store Auth importé avec succès');
  }).catch(err => {
    console.error('❌ Erreur import Auth:', err);
  });

  import('./src/_store/ui.js').then(() => {
    console.log('✅ Store UI importé avec succès');
  }).catch(err => {
    console.error('❌ Erreur import UI:', err);
  });

  import('./src/_store/notifications.js').then(() => {
    console.log('✅ Store Notifications importé avec succès');
  }).catch(err => {
    console.error('❌ Erreur import Notifications:', err);
  });

  import('./src/_store/data.js').then(() => {
    console.log('✅ Store Data importé avec succès');
  }).catch(err => {
    console.error('❌ Erreur import Data:', err);
  });

  import('./src/_store/preferences.js').then(() => {
    console.log('✅ Store Preferences importé avec succès');
  }).catch(err => {
    console.error('❌ Erreur import Preferences:', err);
  });

  // Test de l'index principal
  import('./src/_store/index.js').then(() => {
    console.log('✅ Index des stores importé avec succès');
  }).catch(err => {
    console.error('❌ Erreur import Index:', err);
  });

} catch (error) {
  console.error('❌ Erreur générale lors des tests:', error);
}

export default function TestApp() {
  return (
    <div style={{
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f0f0',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#333' }}>🧪 Test de l`Application KmrCare</h1>
      <p>Consultez la console pour voir les résultats des tests d`import.</p>
      
      <div style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #ddd'
      }}>
        <h2>✅ Status</h2>
        <p>Si vous voyez cette page, React fonctionne correctement.</p>
        <p>Les tests d`import des stores sont en cours dans la console.</p>
      </div>
    </div>
  );
}
