import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export interface Cobranca {
  id: number;
  cliente: string;
  email: string;
  descricao: string;
  valor: number;
  vencimento: string;
  status: string;
  tipo: string;
  gateway?: string;
  formaPagamento?: string;
  tentativas?: number;
  ultimaTentativa?: string;
  proximaTentativa?: string;
  observacoes?: string;
  tags?: string[];
}

export function useCobrancas() {
  const [cobrancas, setCobrancas] = useState<Cobranca[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchCobrancas() {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase.from('cobrancas').select('*');
      
      if (error) {
        console.error('Erro ao buscar cobranças:', error);
        
        // Verificar se é erro de RLS
        if (error.message.includes('row-level security policy')) {
          setError('Erro de permissão: As políticas de segurança estão bloqueando o acesso. Execute o script SQL para corrigir as políticas RLS.');
        } else {
          setError(`Erro ao buscar cobranças: ${error.message}`);
        }
        return;
      }
      
      setCobrancas(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(`Erro inesperado: ${errorMessage}`);
      console.error('Erro ao buscar cobranças:', err);
    } finally {
      setLoading(false);
    }
  }

  async function addCobranca(cobranca: Omit<Cobranca, 'id'>) {
    try {
      setError(null);
      
      const { data, error } = await supabase.from('cobrancas').insert([cobranca]).select();
      
      if (error) {
        console.error('Erro ao adicionar cobrança:', error);
        
        // Verificar se é erro de RLS
        if (error.message.includes('row-level security policy')) {
          setError('Erro de permissão: As políticas de segurança estão bloqueando a inserção. Execute o script SQL para corrigir as políticas RLS.');
        } else {
          setError(`Erro ao adicionar cobrança: ${error.message}`);
        }
        return false;
      }
      
      await fetchCobrancas();
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(`Erro inesperado ao adicionar cobrança: ${errorMessage}`);
      console.error('Erro ao adicionar cobrança:', err);
      return false;
    }
  }

  async function updateCobranca(id: number, updates: Partial<Cobranca>) {
    try {
      setError(null);
      
      const { data, error } = await supabase.from('cobrancas').update(updates).eq('id', id).select();
      
      if (error) {
        console.error('Erro ao atualizar cobrança:', error);
        
        // Verificar se é erro de RLS
        if (error.message.includes('row-level security policy')) {
          setError('Erro de permissão: As políticas de segurança estão bloqueando a atualização. Execute o script SQL para corrigir as políticas RLS.');
        } else {
          setError(`Erro ao atualizar cobrança: ${error.message}`);
        }
        return false;
      }
      
      await fetchCobrancas();
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(`Erro inesperado ao atualizar cobrança: ${errorMessage}`);
      console.error('Erro ao atualizar cobrança:', err);
      return false;
    }
  }

  async function deleteCobranca(id: number) {
    try {
      setError(null);
      
      const { error } = await supabase.from('cobrancas').delete().eq('id', id);
      
      if (error) {
        console.error('Erro ao deletar cobrança:', error);
        
        // Verificar se é erro de RLS
        if (error.message.includes('row-level security policy')) {
          setError('Erro de permissão: As políticas de segurança estão bloqueando a exclusão. Execute o script SQL para corrigir as políticas RLS.');
        } else {
          setError(`Erro ao deletar cobrança: ${error.message}`);
        }
        return false;
      }
      
      await fetchCobrancas();
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(`Erro inesperado ao deletar cobrança: ${errorMessage}`);
      console.error('Erro ao deletar cobrança:', err);
      return false;
    }
  }

  useEffect(() => { 
    fetchCobrancas(); 
  }, []);

  return { 
    cobrancas, 
    loading, 
    error, 
    addCobranca, 
    updateCobranca, 
    deleteCobranca, 
    fetchCobrancas,
    clearError: () => setError(null)
  };
} 