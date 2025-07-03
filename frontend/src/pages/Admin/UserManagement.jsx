/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "motion/react";

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Données d'exemple des utilisateurs
  const users = [
    {
      id: 1,
      name: "Jean Dupont",
      email: "jean.dupont@email.com",
      phone: "+237 690 123 456",
      role: "patient",
      status: "active",
      joinDate: "2024-12-15",
      lastLogin: "2025-01-02",
      avatar: "/assets/ico.png"
    },
    {
      id: 2,
      name: "Dr. Marie Nguema",
      email: "marie.nguema@dispensaire.cm",
      phone: "+237 691 234 567",
      role: "dispensary",
      status: "active",
      joinDate: "2024-11-20",
      lastLogin: "2025-01-03",
      avatar: "/assets/ico.png"
    },
    {
      id: 3,
      name: "Paul Ateba",
      email: "paul.ateba@email.com",
      phone: "+237 692 345 678",
      role: "patient",
      status: "inactive",
      joinDate: "2024-10-10",
      lastLogin: "2024-12-20",
      avatar: "/assets/ico.png"
    },
    {
      id: 4,
      name: "Dr. Francis Mballa",
      email: "francis.mballa@clinic.cm",
      phone: "+237 693 456 789",
      role: "dispensary",
      status: "pending",
      joinDate: "2025-01-01",
      lastLogin: "2025-01-02",
      avatar: "/assets/ico.png"
    },
    {
      id: 5,
      name: "Sophie Belinga",
      email: "sophie.belinga@email.com",
      phone: "+237 694 567 890",
      role: "patient",
      status: "active",
      joinDate: "2024-09-15",
      lastLogin: "2025-01-03",
      avatar: "/assets/ico.png"
    }
  ];

  const getRoleLabel = (role) => {
    switch (role) {
      case 'patient': return 'Patient';
      case 'dispensary': return 'Dispensaire';
      case 'admin': return 'Administrateur';
      default: return role;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'inactive': return 'Inactif';
      case 'pending': return 'En attente';
      default: return status;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const UserCard = ({ user }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-[#159eec] rounded-full flex items-center justify-center text-white font-medium">
            {user.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-500">{user.phone}</p>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
            {getStatusLabel(user.status)}
          </span>
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            {getRoleLabel(user.role)}
          </span>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-500">Inscription:</span>
          <p className="font-medium">{new Date(user.joinDate).toLocaleDateString('fr-FR')}</p>
        </div>
        <div>
          <span className="text-gray-500">Dernière connexion:</span>
          <p className="font-medium">{new Date(user.lastLogin).toLocaleDateString('fr-FR')}</p>
        </div>
      </div>
      
      <div className="mt-4 flex space-x-2">
        <button className="flex-1 px-3 py-2 bg-[#159eec] text-white rounded-lg hover:bg-[#1384c7] transition-colors text-sm font-medium">
          Modifier
        </button>
        <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
          Désactiver
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Utilisateurs</h2>
          <p className="text-gray-600">Gérez tous les utilisateurs de la plateforme</p>
        </div>
        <button className="px-4 py-2 bg-[#0b9444] text-white rounded-lg hover:bg-[#0a7c3a] transition-colors font-medium">
          + Ajouter un utilisateur
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rechercher
            </label>
            <input
              type="text"
              placeholder="Nom ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 text-secondary rounded-lg focus:ring-2 focus:ring-[#159eec] focus:border-[#159eec] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rôle
            </label>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 text-secondary rounded-lg focus:ring-2 focus:ring-[#159eec] focus:border-[#159eec] transition-colors"
            >
              <option value="all">Tous les rôles</option>
              <option value="patient">Patients</option>
              <option value="dispensary">Dispensaires</option>
              <option value="admin">Administrateurs</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
              Réinitialiser
            </button>
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {currentUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Affichage de {startIndex + 1} à {Math.min(startIndex + itemsPerPage, filteredUsers.length)} sur {filteredUsers.length} utilisateurs
          </p>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Précédent
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-2 rounded-lg ${
                  currentPage === i + 1
                    ? 'bg-[#159eec] text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Suivant
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
