import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../_store/auth';
import PropTypes from 'prop-types';

/**
 * Guard pour protéger les routes nécessitant une authentification
 * Redirige vers /auth si l'utilisateur n'est pas authentifié
 */
const AuthGuard = ({ children }) => {
  const isAuthenticated = useAuth((state) => state.isAuthenticated());
  const location = useLocation();

  if (!isAuthenticated) {
    // Sauvegarder la route tentée pour redirection après connexion
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  return children;
};

AuthGuard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthGuard;
