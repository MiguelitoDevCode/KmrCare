// filepath: c:\Users\medjo\Desktop\kmrcare\src\pages\AdminDashboard.jsx
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { motion } from 'motion/react';
import PropTypes from 'prop-types';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Dr. Jean Kouam',
      email: 'jean.kouam@kmrcare.com',
      role: 'Médecin',
      status: 'Actif',
      lastLogin: '2025-06-20',
      phone: '+237 657 755 890'
    },
    {
      id: 2,
      name: 'Marie Nguema',
      email: 'marie.nguema@kmrcare.com',
      role: 'Infirmière',
      status: 'Actif',
      lastLogin: '2025-06-21',
      phone: '+237 657 755 891'
    },
    {
      id: 3,
      name: 'Paul Mballa',
      email: 'paul.mballa@kmrcare.com',
      role: 'Patient',
      status: 'Inactif',
      lastLogin: '2025-06-15',
      phone: '+237 657 755 892'
    },
    {
      id: 4,
      name: 'Dr. Claire Ateba',
      email: 'claire.ateba@kmrcare.com',
      role: 'Médecin',
      status: 'Actif',
      lastLogin: '2025-06-22',
      phone: '+237 657 755 893'
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEditUser = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleAddUser = () => {
    setCurrentUser(null);
    setShowModal(true);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    return status === 'Actif' ? 'text-[#37A936]' : 'text-red-500';
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Médecin': return 'bg-[#10425d] text-white';
      case 'Infirmière': return 'bg-[#37A936] text-white';
      case 'Patient': return 'bg-[#bfd2f8] text-[#10425d]';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const stats = [
    {
      title: 'Total Utilisateurs',
      value: users.length,
      icon: '👥',
      color: 'bg-[#10425d]'
    },
    {
      title: 'Médecins',
      value: users.filter(u => u.role === 'Médecin').length,
      icon: '👨‍⚕️',
      color: 'bg-[#37A936]'
    },
    {
      title: 'Patients',
      value: users.filter(u => u.role === 'Patient').length,
      icon: '🏥',
      color: 'bg-[#bfd2f8]'
    },
    {
      title: 'Utilisateurs Actifs',
      value: users.filter(u => u.status === 'Actif').length,
      icon: '✅',
      color: 'bg-[#37A936]'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">      {/* Header - Amélioré pour le responsive */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#10425d] truncate" style={{
                fontFamily: 'var(--title-font-family)',
                fontSize: 'clamp(18px, 4vw, var(--title-font-size))',
                fontWeight: 'var(--title-font-weight)'
              }}>
                <span className="hidden sm:inline">Dashboard Admin - </span>KmrCare
              </h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="hidden md:inline text-[#10425d] text-sm sm:text-base" style={{
                fontFamily: 'var(--body-font-family)',
                fontSize: 'var(--body-font-size)'
              }}>
                Bienvenue, Administrateur
              </span>
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#37A936] rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-base">
                A
              </div>
            </div>
          </div>
        </div>
      </header>      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Navigation Tabs - Amélioré pour le responsive */}
        <div className="border-b border-gray-200 mb-6 sm:mb-8">
          <nav className="-mb-px flex flex-col sm:flex-row sm:space-x-8 space-y-2 sm:space-y-0">
            {[
              { id: 'users', label: 'Gestion Utilisateurs', icon: '👥', shortLabel: 'Utilisateurs' },
              { id: 'stats', label: 'Statistiques', icon: '📊', shortLabel: 'Stats' },
              { id: 'settings', label: 'Paramètres', icon: '⚙️', shortLabel: 'Config' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm w-full sm:w-auto text-center sm:text-left ${
                  activeTab === tab.id
                    ? 'border-[#37A936] text-[#37A936] bg-green-50 sm:bg-transparent'
                    : 'border-transparent text-gray-500 hover:text-[#10425d] hover:border-gray-300'
                }`}
                style={{
                  fontFamily: 'var(--button-text-font-family)',
                  fontSize: 'var(--button-text-font-size)',
                  fontWeight: 'var(--button-text-font-weight)'
                }}
              >
                <span className="mr-1 sm:mr-2">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </button>
            ))}
          </nav>
        </div>        {/* Stats Cards - Amélioré pour le responsive */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow p-3 sm:p-4 lg:p-6"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start">
                <div className={`${stat.color} rounded-lg p-2 sm:p-3 mb-2 sm:mb-0 sm:mr-3 lg:mr-4`}>
                  <span className="text-lg sm:text-xl lg:text-2xl">{stat.icon}</span>
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1" style={{
                    fontFamily: 'var(--small-font-family)',
                    fontSize: 'clamp(10px, 2.5vw, var(--small-font-size))'
                  }}>
                    {stat.title}
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-[#10425d]" style={{
                    fontFamily: 'var(--display-2-font-family)',
                    fontSize: 'clamp(18px, 5vw, var(--display-2-font-size))'
                  }}>
                    {stat.value}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>        {/* Users Management Section - Amélioré pour le responsive */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Actions Bar */}
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex flex-col space-y-4">
                <h2 className="text-lg sm:text-xl font-semibold text-[#10425d]" style={{
                  fontFamily: 'var(--title-font-family)',
                  fontSize: 'clamp(16px, 4vw, 20px)',
                  fontWeight: 'var(--title-font-weight)'
                }}>
                  Gestion des Utilisateurs
                </h2>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-[#37A936] focus:border-[#37A936] text-sm"
                    style={{
                      fontFamily: 'var(--body-font-family)',
                      fontSize: 'var(--body-font-size)'
                    }}
                  />
                  <button
                    onClick={handleAddUser}
                    className="btn bg-[#37A936] hover:bg-[#2d8f2c] text-white px-4 py-2 rounded-md font-medium flex items-center justify-center text-sm whitespace-nowrap"
                    style={{
                      fontFamily: 'var(--button-text-font-family)',
                      fontSize: 'var(--button-text-font-size)',
                      fontWeight: 'var(--button-text-font-weight)'
                    }}
                  >
                    <span className="mr-1 sm:mr-2">+</span>
                    <span className="hidden sm:inline">Ajouter </span>Utilisateur
                  </button>
                </div>
              </div>
            </div>

            {/* Users Table - Responsive avec scroll horizontal */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {[
                      { key: 'name', label: 'Nom', mobile: true },
                      { key: 'email', label: 'Email', mobile: false },
                      { key: 'role', label: 'Rôle', mobile: true },
                      { key: 'status', label: 'Statut', mobile: false },
                      { key: 'lastLogin', label: 'Dernière Connexion', mobile: false },
                      { key: 'phone', label: 'Téléphone', mobile: false },
                      { key: 'actions', label: 'Actions', mobile: true }
                    ].map((header) => (
                      <th
                        key={header.key}
                        className={`px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                          !header.mobile ? 'hidden md:table-cell' : ''
                        }`}
                        style={{
                          fontFamily: 'var(--caption-font-family)',
                          fontSize: '11px',
                          fontWeight: 'var(--caption-font-weight)'
                        }}
                      >
                        {header.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#10425d] rounded-full flex items-center justify-center text-white font-bold mr-2 sm:mr-3 text-xs sm:text-sm">
                            {user.name.charAt(0)}
                          </div>
                          <div className="text-xs sm:text-sm font-medium text-gray-900 truncate max-w-[120px] sm:max-w-none" style={{
                            fontFamily: 'var(--body-font-family)',
                            fontSize: 'clamp(12px, 2.5vw, var(--body-font-size))'
                          }}>
                            {user.name}
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden md:table-cell" style={{
                        fontFamily: 'var(--body-font-family)',
                        fontSize: 'var(--body-font-size)'
                      }}>
                        {user.email}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                          <span className="hidden sm:inline">{user.role}</span>
                          <span className="sm:hidden">
                            {user.role === 'Médecin' ? 'Dr' : user.role === 'Infirmière' ? 'Inf' : 'Pat'}
                          </span>
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                        <span className={`text-xs sm:text-sm font-medium ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden md:table-cell" style={{
                        fontFamily: 'var(--body-font-family)',
                        fontSize: 'var(--body-font-size)'
                      }}>
                        {user.lastLogin}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 hidden md:table-cell" style={{
                        fontFamily: 'var(--body-font-family)',
                        fontSize: 'var(--body-font-size)'
                      }}>
                        {user.phone}
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium">
                        <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="text-[#37A936] hover:text-[#2d8f2c] font-medium text-xs sm:text-sm"
                          >
                            <span className="hidden sm:inline">Modifier</span>
                            <span className="sm:hidden">✏️</span>
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-900 font-medium text-xs sm:text-sm"
                          >
                            <span className="hidden sm:inline">Supprimer</span>
                            <span className="sm:hidden">🗑️</span>
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>            {filteredUsers.length === 0 && (
              <div className="text-center py-8 sm:py-12">
                <p className="text-gray-500 text-sm sm:text-base" style={{
                  fontFamily: 'var(--body-font-family)',
                  fontSize: 'var(--body-font-size)'
                }}>
                  Aucun utilisateur trouvé.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Statistics Section - Amélioré pour le responsive */}
        {activeTab === 'stats' && (
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-[#10425d] mb-4 sm:mb-6" style={{
              fontFamily: 'var(--title-font-family)',
              fontSize: 'clamp(16px, 4vw, 20px)',
              fontWeight: 'var(--title-font-weight)'
            }}>
              Statistiques Détaillées
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="p-3 sm:p-4 border rounded-lg">
                <h3 className="font-medium text-[#10425d] mb-2 text-sm sm:text-base">Répartition par Rôle</h3>
                <div className="space-y-2">
                  {['Médecin', 'Infirmière', 'Patient'].map((role) => {
                    const count = users.filter(u => u.role === role).length;
                    const percentage = users.length > 0 ? ((count / users.length) * 100).toFixed(1) : '0';
                    return (
                      <div key={role} className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm text-gray-600">{role}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs sm:text-sm font-medium">{count}</span>
                          <span className="text-xs text-gray-500">({percentage}%)</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="p-3 sm:p-4 border rounded-lg">
                <h3 className="font-medium text-[#10425d] mb-2 text-sm sm:text-base">Activité des Utilisateurs</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-gray-600">Utilisateurs Actifs</span>
                    <span className="text-xs sm:text-sm font-medium text-[#37A936]">
                      {users.filter(u => u.status === 'Actif').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-gray-600">Utilisateurs Inactifs</span>
                    <span className="text-xs sm:text-sm font-medium text-red-500">
                      {users.filter(u => u.status === 'Inactif').length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Section - Amélioré pour le responsive */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-[#10425d] mb-4 sm:mb-6" style={{
              fontFamily: 'var(--title-font-family)',
              fontSize: 'clamp(16px, 4vw, 20px)',
              fontWeight: 'var(--title-font-weight)'
            }}>
              Paramètres Système
            </h2>
            <div className="space-y-4 sm:space-y-6">
              <div className="border-b pb-4">
                <h3 className="font-medium text-[#10425d] mb-2 text-sm sm:text-base">Paramètres Généraux</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span className="text-xs sm:text-sm">Notifications par email</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-xs sm:text-sm">Mode maintenance</span>
                  </label>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-[#10425d] mb-2 text-sm sm:text-base">Sécurité</h3>
                <button className="btn bg-[#10425d] hover:bg-[#0d3548] text-white px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm w-full sm:w-auto">
                  Changer le mot de passe admin
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal pour Ajouter/Modifier un utilisateur */}
      {showModal && (
        <UserModal
          user={currentUser}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={(userData) => {
            if (currentUser) {
              // Modifier un utilisateur existant
              setUsers(users.map(u => u.id === currentUser.id ? { ...u, ...userData } : u));
            } else {
              // Ajouter un nouvel utilisateur
              const newUser = {
                id: Math.max(...users.map(u => u.id)) + 1,
                ...userData,
                lastLogin: new Date().toISOString().split('T')[0]
              };
              setUsers([...users, newUser]);
            }
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

// Composant Modal pour Ajouter/Modifier un utilisateur
const UserModal = ({ user, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'Patient',
    status: user?.status || 'Actif',
    phone: user?.phone || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-sm sm:max-w-md mx-4"
      >
        <h2 className="text-lg sm:text-xl font-semibold text-[#10425d] mb-4" style={{
          fontFamily: 'var(--title-font-family)',
          fontSize: 'clamp(16px, 4vw, 20px)',
          fontWeight: 'var(--title-font-weight)'
        }}>
          {user ? 'Modifier Utilisateur' : 'Ajouter Utilisateur'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#37A936] focus:border-[#37A936] text-sm"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#37A936] focus:border-[#37A936] text-sm"
              required
            />
          </div>
          
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#37A936] focus:border-[#37A936] text-sm"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Rôle</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#37A936] focus:border-[#37A936] text-sm"
              >
                <option value="Patient">Patient</option>
                <option value="Médecin">Médecin</option>
                <option value="Infirmière">Infirmière</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Statut</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#37A936] focus:border-[#37A936] text-sm"
              >
                <option value="Actif">Actif</option>
                <option value="Inactif">Inactif</option>
              </select>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="w-full sm:flex-1 btn bg-[#37A936] hover:bg-[#2d8f2c] text-white px-4 py-2 rounded-md text-sm"
            >
              {user ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// PropTypes pour UserModal
UserModal.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    status: PropTypes.string,
    phone: PropTypes.string,
    lastLogin: PropTypes.string
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default AdminDashboard;