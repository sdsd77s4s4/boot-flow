import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Cliente {
  id: number;
  name: string;
  email: string;
  m3u_url?: string;
  bouquets?: string;
  expiration_date?: string;
  observations?: string;
  created_at?: string;
  updated_at?: string;
  phone?: string;
  telegram?: string;
  whatsapp?: string;
  devices?: number;
  credits?: number;
  renewalDate?: string;
  notes?: string;
  real_name?: string;
  plan?: string;
  status?: string; // Changed to string to match database
  created_by?: string;
}

export function useClientes() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchClientes() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setClientes(data || []);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching clientes:', err);
    } finally {
      setLoading(false);
    }
  }

  async function addCliente(cliente: Omit<Cliente, 'id'>) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('users')
        .insert([{ ...cliente, created_by: user.id }]);
      
      if (error) throw error;
      await fetchClientes();
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  }

  async function updateCliente(id: number, updates: Partial<Omit<Cliente, 'id'>>) {
    try {
      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', id);
      
      if (error) throw error;
      await fetchClientes();
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  }

  async function deleteCliente(id: number) {
    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      await fetchClientes();
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  }

  useEffect(() => { 
    fetchClientes(); 
  }, []);

  return { clientes, loading, error, addCliente, updateCliente, deleteCliente, fetchClientes };
}