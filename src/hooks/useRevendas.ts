import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Revenda {
  id: number;
  username: string;
  email: string;
  permission?: string;
  credits?: number;
  personal_name?: string;
  status?: string; // Changed to string to match database
  created_at?: string;
  updated_at?: string;
  force_password_change?: string;
  servers?: string;
  master_reseller?: string;
  disable_login_days?: number;
  monthly_reseller?: boolean;
  telegram?: string;
  whatsapp?: string;
  observations?: string;
  created_by?: string;
}

export function useRevendas() {
  const [revendas, setRevendas] = useState<Revenda[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchRevendas() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('resellers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setRevendas(data || []);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching revendas:', err);
    } finally {
      setLoading(false);
    }
  }

  async function addRevenda(revenda: Omit<Revenda, 'id'>) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('resellers')
        .insert([{ ...revenda, created_by: user.id }]);
      
      if (error) throw error;
      await fetchRevendas();
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  }

  async function updateRevenda(id: number, updates: Partial<Omit<Revenda, 'id'>>) {
    try {
      const { error } = await supabase
        .from('resellers')
        .update(updates)
        .eq('id', id);
      
      if (error) throw error;
      await fetchRevendas();
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  }

  async function deleteRevenda(id: number) {
    try {
      const { error } = await supabase
        .from('resellers')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      await fetchRevendas();
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  }

  useEffect(() => { 
    fetchRevendas(); 
  }, []);

  return { revendas, loading, error, addRevenda, updateRevenda, deleteRevenda, fetchRevendas };
}