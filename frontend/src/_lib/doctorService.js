/* eslint-disable no-unused-vars */
import { careAPI } from './api.js';
import { useNotify } from '../_store/notifications.js';

/**
 * Service de gestion des médecins/docteurs
 * Interface entre l'API backend et le frontend
 */

/**
 * Récupère tous les médecins
 * @returns {Promise<Array>} Liste des médecins
 */
export async function fetchDoctors() {
  try {
    const response = await careAPI.getDoctors();
    return response.data || response.results || response;
  } catch (error) {
    console.error('Erreur lors de la récupération des médecins:', error);
    throw new Error('Impossible de charger les médecins. Vérifiez votre connexion.');
  }
}

/**
 * Récupère un médecin par son ID
 * @param {number|string} id - ID du médecin
 * @returns {Promise<Object>} Médecin trouvé
 */
export async function fetchDoctorById(id) {
  try {
    const response = await careAPI.getDoctor(id);
    return response.data || response;
  } catch (error) {
    console.error(`Erreur lors de la récupération du médecin ${id}:`, error);
    throw new Error('Impossible de charger les détails du médecin.');
  }
}

/**
 * Crée un nouveau médecin
 * @param {Object} doctorData - Données du médecin
 * @returns {Promise<Object>} Médecin créé
 */
export async function createDoctor(doctorData) {
  try {
    // Validation basique côté frontend
    if (!doctorData.first_name || !doctorData.last_name) {
      throw new Error('Le prénom et le nom sont obligatoires.');
    }
    if (!doctorData.email) {
      throw new Error('L\'email est obligatoire.');
    }
    if (!doctorData.specialization) {
      throw new Error('La spécialisation est obligatoire.');
    }

    const response = await careAPI.createDoctor(doctorData);
    return response.data || response;
  } catch (error) {
    console.error('Erreur lors de la création du médecin:', error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Impossible de créer le médecin. Vérifiez les données.');
  }
}

/**
 * Met à jour un médecin existant
 * @param {number|string} id - ID du médecin
 * @param {Object} updateData - Données à mettre à jour
 * @returns {Promise<Object>} Médecin mis à jour
 */
export async function updateDoctor(id, updateData) {
  try {
    const response = await careAPI.updateDoctor(id, updateData);
    return response.data || response;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du médecin ${id}:`, error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Impossible de mettre à jour le médecin.');
  }
}

/**
 * Supprime un médecin
 * @param {number|string} id - ID du médecin
 * @returns {Promise<boolean>} Succès de la suppression
 */
export async function deleteDoctor(id) {
  try {
    await careAPI.deleteDoctor(id);
    return true;
  } catch (error) {
    console.error(`Erreur lors de la suppression du médecin ${id}:`, error);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Impossible de supprimer le médecin.');
  }
}

/**
 * Recherche des médecins avec filtres
 * @param {Object} filters - Filtres de recherche
 * @returns {Promise<Array>} Médecins filtrés
 */
export async function searchDoctors(filters = {}) {
  try {
    const params = new URLSearchParams();
    
    if (filters.search) {
      params.append('search', filters.search);
    }
    if (filters.specialization) {
      params.append('specialization', filters.specialization);
    }
    if (filters.dispensary) {
      params.append('dispensary', filters.dispensary);
    }
    if (filters.status) {
      params.append('status', filters.status);
    }

    const response = await careAPI.getDoctors(params.toString());
    return response.data || response.results || response;
  } catch (error) {
    console.error('Erreur lors de la recherche de médecins:', error);
    throw new Error('Impossible d\'effectuer la recherche.');
  }
}

/**
 * Récupère les médecins d'un dispensaire spécifique
 * @param {number|string} dispensaryId - ID du dispensaire
 * @returns {Promise<Array>} Médecins du dispensaire
 */
export async function fetchDoctorsByDispensary(dispensaryId) {
  try {
    const filters = { dispensary: dispensaryId };
    return await searchDoctors(filters);
  } catch (error) {
    console.error(`Erreur lors de la récupération des médecins du dispensaire ${dispensaryId}:`, error);
    throw new Error('Impossible de charger les médecins de ce dispensaire.');
  }
}

/**
 * Met à jour le statut d'un médecin (actif/inactif)
 * @param {number|string} id - ID du médecin
 * @param {string} status - Nouveau statut
 * @returns {Promise<Object>} Médecin mis à jour
 */
export async function updateDoctorStatus(id, status) {
  try {
    return await updateDoctor(id, { status });
  } catch (error) {
    throw new Error('Impossible de modifier le statut du médecin.');
  }
}

/**
 * Assigne un médecin à un dispensaire
 * @param {number|string} doctorId - ID du médecin
 * @param {number|string} dispensaryId - ID du dispensaire
 * @returns {Promise<Object>} Médecin mis à jour
 */
export async function assignDoctorToDispensary(doctorId, dispensaryId) {
  try {
    return await updateDoctor(doctorId, { dispensary: dispensaryId });
  } catch (error) {
    throw new Error('Impossible d\'assigner le médecin au dispensaire.');
  }
}

/**
 * Exporte les médecins en format CSV
 * @param {Array} doctors - Liste des médecins à exporter
 * @returns {Blob} Fichier CSV
 */
export async function exportDoctors(doctors) {
  try {
    const headers = [
      'ID',
      'Prénom',
      'Nom',
      'Email',
      'Téléphone',
      'Spécialisation',
      'Dispensaire',
      'Statut',
      'Expérience (années)',
      'Date d\'embauche',
      'Dernière connexion'
    ];

    const rows = doctors.map(d => [
      d.id,
      d.first_name || d.firstName || '',
      d.last_name || d.lastName || '',
      d.email,
      d.phone || d.contact_phone || '',
      d.specialization || d.specialty || '',
      d.dispensary_name || d.dispensary?.name || '',
      d.status,
      d.experience_years || d.experience || '',
      d.hire_date || d.hireDate || '',
      d.last_login || d.lastLogin || ''
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');

    return new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  } catch (error) {
    console.error('Erreur lors de l\'export:', error);
    throw new Error('Impossible d\'exporter les données.');
  }
}

/**
 * Hook personnalisé pour la gestion des médecins avec API
 */
export function useDoctorAPI() {
  const notify = useNotify();

  return {
    // Opérations CRUD
    async loadDoctors() {
      try {
        const doctors = await fetchDoctors();
        return doctors;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    },

    async loadDoctor(id) {
      try {
        const doctor = await fetchDoctorById(id);
        return doctor;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    },

    async saveDoctor(data, isUpdate = false) {
      try {
        let result;
        if (isUpdate && data.id) {
          result = await updateDoctor(data.id, data);
          notify.success('Médecin mis à jour avec succès');
        } else {
          result = await createDoctor(data);
          notify.success('Médecin créé avec succès');
        }
        return result;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    },

    async deleteDoctor(id) {
      try {
        await deleteDoctor(id);
        notify.success('Médecin supprimé avec succès');
        return true;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    },

    async searchDoctors(filters) {
      try {
        const results = await searchDoctors(filters);
        return results;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    },

    async loadDoctorsByDispensary(dispensaryId) {
      try {
        const doctors = await fetchDoctorsByDispensary(dispensaryId);
        return doctors;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    },

    async updateStatus(id, status) {
      try {
        const result = await updateDoctorStatus(id, status);
        notify.success('Statut mis à jour avec succès');
        return result;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    },

    async assignToDispensary(doctorId, dispensaryId) {
      try {
        const result = await assignDoctorToDispensary(doctorId, dispensaryId);
        notify.success('Médecin assigné avec succès');
        return result;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    },

    async exportDoctors(doctors) {
      try {
        const file = await exportDoctors(doctors);
        
        // Téléchargement automatique
        const url = window.URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = url;
        link.download = `medecins_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        notify.success('Export réalisé avec succès');
        return true;
      } catch (error) {
        notify.error(error.message);
        throw error;
      }
    }
  };
}

export default {
  fetchDoctors,
  fetchDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  searchDoctors,
  fetchDoctorsByDispensary,
  updateDoctorStatus,
  assignDoctorToDispensary,
  exportDoctors,
  useDoctorAPI
};
