import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Cobranca {
  id: number;
  cliente: string;
  email: string;
  descricao: string;
  valor: number;
  vencimento: string;
  status: 'Pendente' | 'Paga' | 'Vencida' | 'Cancelada';
  tipo: string;
  gateway?: string;
  forma_pagamento?: string;
  tentativas?: number;
  ultima_tentativa?: string;
  proxima_tentativa?: string;
  observacoes?: string;
  tags?: string[];
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export function useCobrancas() {
  const [cobrancas, setCobrancas] = useState<Cobranca[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchCobrancas() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cobrancas')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setCobrancas(data || []);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching cobrancas:', err);
    } finally {
      setLoading(false);
    }
  }

  async function addCobranca(cobranca: Omit<Cobranca, 'id'>) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('cobrancas')
        .insert([{ ...cobranca, created_by: user.id }]);
      
      if (error) throw error;
      await fetchCobrancas();
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  }

  async function updateCobranca(id: number, updates: Partial<Cobranca>) {
    try {
      const { error } = await supabase
        .from('cobrancas')
        .update(updates)
        .eq('id', id);
      
      if (error) throw error;
      await fetchCobrancas();
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  }

  async function deleteCobranca(id: number) {
    try {
      const { error } = await supabase
        .from('cobrancas')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      await fetchCobrancas();
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    }
  }

  useEffect(() => { 
    fetchCobrancas(); 
  }, []);

  return { cobrancas, loading, error, addCobranca, updateCobranca, deleteCobranca, fetchCobrancas };
}