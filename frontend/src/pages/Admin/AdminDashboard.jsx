/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserManagement from './UserManagement';
import AppointmentManagement from './AppointmentManagement';
import DispensariesManagement from './DispensariesManagement';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const notifications = 3;
  const navigate = useNavigate();

  // Données fictives pour le dashboard
  const dashboardStats = {
    totalUsers: 1247,
    totalAppointments: 856,
    totalDispensaries: 12,
    pendingAppointments: 45,
    activeUsers: 892,
    completedAppointments: 743,
    newUsersToday: 23,
    appointmentsToday: 67
  };

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: '📊' },
    { id: 'users', label: 'Utilisateurs', icon: '👥' },
    { id: 'appointments', label: 'Rendez-vous', icon: '📅' },
    { id: 'dispensaries', label: 'Dispensaires', icon: '🏥' },
    { id: 'reports', label: 'Rapports', icon: '📋' }
  ];

  const handleLogout = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      navigate('/');
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard stats={dashboardStats} />;
      case 'users':
        return <UserManagement />;
      case 'appointments':
        return <AppointmentManagement />;
      case 'dispensaries':
        return <DispensariesManagement />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard stats={dashboardStats} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <img src="/assets/logo.png" alt="KmrCare" className="h-8 w-8" />
            <span className="text-xl font-bold text-primary">KmrCare Admin</span>
          </div>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <span className="text-xl">✕</span>
          </button>
        </div>

        <nav className="mt-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center px-4 py-3 text-left transition-colors ${
                activeTab === item.id
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <span className="text-xl mr-3">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">👤</span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">Admin</div>
              <div className="text-xs text-gray-500">Administrateur</div>
            </div>
          </div>
          <div className="space-y-2">
            <button className="w-full flex items-center px-2 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md">
              <span className="text-sm mr-2">⚙️</span>
              Paramètres
            </button>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center px-2 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
            >
              <span className="text-sm mr-2">🚪</span>
              Se déconnecter
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
                >
                  <span className="text-xl">☰</span>
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="ml-2 lg:ml-0 flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
                >
                  <span className="text-sm mr-2">🏠</span>
                  Retour au site
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                    <span className="text-xl">🔔</span>
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {notifications}
                      </span>
                    )}
                  </button>
                </div>

                <div className="text-sm text-gray-500">
                  {new Date().toLocaleDateString('fr-FR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

// Composant Dashboard
const Dashboard = ({ stats }) => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tableau de bord</h1>
        <p className="text-gray-600">Vue d`ensemble de la plateforme KmrCare</p>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-full">
              <span className="text-2xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Utilisateurs</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
              <p className="text-xs text-green-600">+{stats.newUsersToday} aujourd`hui</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-full">
              <span className="text-2xl">📅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Rendez-vous</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalAppointments.toLocaleString()}</p>
              <p className="text-xs text-blue-600">{stats.appointmentsToday} aujourd`hui</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <span className="text-2xl">🏥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Dispensaires</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalDispensaries}</p>
              <p className="text-xs text-purple-600">Tous actifs</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-full">
              <span className="text-2xl">⏳</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">En attente</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingAppointments}</p>
              <p className="text-xs text-yellow-600">À traiter</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Graphiques et activités récentes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Activité récente</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600">📅</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Nouveau rendez-vous confirmé</p>
                <p className="text-xs text-gray-500">Il y a 5 minutes</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600">👥</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Nouvel utilisateur inscrit</p>
                <p className="text-xs text-gray-500">Il y a 12 minutes</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600">🏥</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Dispensaire mis à jour</p>
                <p className="text-xs text-gray-500">Il y a 1 heure</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistiques rapides</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Utilisateurs actifs</span>
                <span className="text-sm font-bold text-gray-900">{stats.activeUsers}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(stats.activeUsers / stats.totalUsers) * 100}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">RDV complétés</span>
                <span className="text-sm font-bold text-gray-900">{stats.completedAppointments}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(stats.completedAppointments / stats.totalAppointments) * 100}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">RDV en attente</span>
                <span className="text-sm font-bold text-gray-900">{stats.pendingAppointments}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(stats.pendingAppointments / stats.totalAppointments) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Composant Reports (placeholder)
const Reports = () => {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Rapports</h1>
        <p className="text-gray-600">Génération et consultation des rapports</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <div className="text-6xl text-gray-400 mb-4">📋</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Rapports en développement</h3>
        <p className="text-gray-600 mb-4">
          Cette section permettra de générer et consulter différents types de rapports :
        </p>
        <ul className="text-left text-gray-600 space-y-2 max-w-md mx-auto">
          <li>• Rapports d`activité mensuelle</li>
          <li>• Statistiques des dispensaires</li>
          <li>• Rapports financiers</li>
          <li>• Analyse des tendances</li>
          <li>• Rapports de performance</li>
        </ul>
      </div>
    </div>
  );
};
export default Admin;