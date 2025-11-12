import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BarChart3, MessageSquare, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useDeviceDetect } from '@/hooks/useDeviceDetect.bootflow.mobile';

export const MobileNavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile } = useDeviceDetect();

  if (!isMobile) return null;

  const navItems = [
    { icon: Home, label: 'Home', path: '/admin' },
    { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
    { icon: MessageSquare, label: 'Chat', path: '/admin/chat' },
    { icon: User, label: 'Perfil', path: '/configuracoes' },
  ];

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-800 bg-slate-950/95 backdrop-blur-sm safe-area-inset-bottom"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 rounded-lg px-4 py-2 transition-colors ${
                active
                  ? 'bg-violet-600/20 text-violet-400'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
};

