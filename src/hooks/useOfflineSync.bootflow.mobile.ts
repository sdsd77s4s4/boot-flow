import { useState, useEffect, useCallback } from 'react';
import localforage from 'localforage';
import { supabase } from '@/lib/supabase';
import { agentLogger } from '@/lib/logger.agent';

const logger = agentLogger;

export interface OfflineAction {
  id?: number;
  type: 'create' | 'update' | 'delete';
  table: string;
  data: Record<string, unknown>;
  timestamp: string;
  synced?: boolean;
}

export const useOfflineSync = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingActions, setPendingActions] = useState<OfflineAction[]>([]);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncPendingActions();
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    loadPendingActions();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const loadPendingActions = async () => {
    try {
      const actions = await localforage.getItem<OfflineAction[]>('offlineActions') || [];
      setPendingActions(actions.filter((a) => !a.synced));
    } catch (error) {
      logger.error('Erro ao carregar ações offline', { error: (error as Error).message });
    }
  };

  const addOfflineAction = useCallback(async (action: Omit<OfflineAction, 'id' | 'timestamp' | 'synced'>) => {
    const fullAction: OfflineAction = {
      ...action,
      timestamp: new Date().toISOString(),
      synced: false,
    };

    try {
      const existing = await localforage.getItem<OfflineAction[]>('offlineActions') || [];
      const updated = [...existing, fullAction];
      await localforage.setItem('offlineActions', updated);
      setPendingActions(updated.filter((a) => !a.synced));

      if (isOnline) {
        await syncAction(fullAction);
      } else {
        // Registrar para background sync
        if ('serviceWorker' in navigator && 'sync' in ServiceWorkerRegistration.prototype) {
          const registration = await navigator.serviceWorker.ready;
          await registration.sync.register('sync-actions');
        }
      }
    } catch (error) {
      logger.error('Erro ao adicionar ação offline', { error: (error as Error).message });
    }
  }, [isOnline]);

  const syncAction = async (action: OfflineAction) => {
    try {
      let result;
      switch (action.type) {
        case 'create':
          result = await supabase.from(action.table).insert(action.data);
          break;
        case 'update':
          result = await supabase.from(action.table).update(action.data).eq('id', (action.data as any).id);
          break;
        case 'delete':
          result = await supabase.from(action.table).delete().eq('id', (action.data as any).id);
          break;
      }

      if (result?.error) throw result.error;

      // Marcar como sincronizado
      const existing = await localforage.getItem<OfflineAction[]>('offlineActions') || [];
      const updated = existing.map((a) => (a === action ? { ...a, synced: true } : a));
      await localforage.setItem('offlineActions', updated);
      setPendingActions(updated.filter((a) => !a.synced));

      logger.info('Ação sincronizada', { type: action.type, table: action.table });
    } catch (error) {
      logger.error('Erro ao sincronizar ação', { error: (error as Error).message, action });
      throw error;
    }
  };

  const syncPendingActions = async () => {
    if (syncing || !isOnline) return;
    setSyncing(true);

    try {
      const actions = await localforage.getItem<OfflineAction[]>('offlineActions') || [];
      const unsynced = actions.filter((a) => !a.synced);

      for (const action of unsynced) {
        try {
          await syncAction(action);
        } catch (error) {
          logger.warn('Falha ao sincronizar ação, tentará novamente', { action, error });
        }
      }
    } catch (error) {
      logger.error('Erro ao sincronizar ações pendentes', { error: (error as Error).message });
    } finally {
      setSyncing(false);
    }
  };

  const clearSyncedActions = async () => {
    try {
      const actions = await localforage.getItem<OfflineAction[]>('offlineActions') || [];
      const unsynced = actions.filter((a) => !a.synced);
      await localforage.setItem('offlineActions', unsynced);
      setPendingActions(unsynced);
    } catch (error) {
      logger.error('Erro ao limpar ações sincronizadas', { error: (error as Error).message });
    }
  };

  return {
    isOnline,
    pendingActions,
    syncing,
    addOfflineAction,
    syncPendingActions,
    clearSyncedActions,
  };
};

