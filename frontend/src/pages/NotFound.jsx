import { Link } from 'react-router-dom';
import { useAuth } from '../_store/auth';

const NotFound = () => {
  const isAuthenticated = useAuth((state) => state.isAuthenticated());
  const userRole = useAuth((state) => state.getUserRole());

  const getHomeRoute = () => {
    if (!isAuthenticated) return '/';
    
    switch (userRole) {
      case 'admin':
        return '/admin';
      case 'doctor':
        return '/doctors';
      default:
        return '/';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-[#159eec] mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page non trouvée</h2>
          <p className="text-gray-600 mb-8">
            Désolé, la page que vous recherchez n&apos;existe pas ou a été déplacée.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to={getHomeRoute()}
            className="inline-block w-full px-6 py-3 bg-[#159eec] text-white font-medium rounded-lg hover:bg-[#1384c7] transition-colors duration-200"
          >
            Retour à l&apos;accueil
          </Link>
          
          <Link
            to="/catalogue"
            className="inline-block w-full px-6 py-3 border border-[#159eec] text-[#159eec] font-medium rounded-lg hover:bg-[#159eec] hover:text-white transition-colors duration-200"
          >
            Voir nos services
          </Link>
        </div>
        
        <div className="mt-12">
          <img 
            src="/assets/logo.png" 
            alt="KmrCare" 
            className="h-12 mx-auto opacity-60"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
