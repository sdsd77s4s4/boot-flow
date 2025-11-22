import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  allowedRoles: Array<'admin' | 'reseller' | 'client'>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { userRole, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-2 text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Salva a rota que o usuário tentou acessar para redirecioná-lo após o login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Verifica se a role do usuário está na lista de roles permitidas
  const isAuthorized = userRole && allowedRoles.includes(userRole);

  return isAuthorized ? <Outlet /> : <Navigate to="/unauthorized" replace />;
};

export default ProtectedRoute;
