import { useCollaborativePresence } from '@/hooks/useCollaborativePresence';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

export const CollaborativePresence = () => {
  const { activeUsers, totalActive } = useCollaborativePresence();

  if (totalActive === 0) return null;

  return (
    <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2">
      <Users className="h-4 w-4 text-slate-400" />
      <span className="text-sm text-slate-300">{totalActive} online</span>
      <div className="flex -space-x-2">
        {activeUsers.slice(0, 5).map((user) => (
          <Avatar key={user.id} className="h-6 w-6 border-2 border-slate-800">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-xs bg-slate-700 text-slate-200">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        ))}
        {totalActive > 5 && (
          <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-slate-800 bg-slate-700 text-xs text-slate-200">
            +{totalActive - 5}
          </div>
        )}
      </div>
    </div>
  );
};

