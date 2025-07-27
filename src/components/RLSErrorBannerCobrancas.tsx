import React, { useState } from 'react';
import { AlertCircle, Copy, X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RLSErrorBannerCobrancasProps {
  error: string;
  onClearError: () => void;
}

export function RLSErrorBannerCobrancas({ error, onClearError }: RLSErrorBannerCobrancasProps) {
  const [showScripts, setShowScripts] = useState(false);

  const fixRLSScript = `-- Script para corrigir as políticas RLS da tabela cobrancas
-- Execute este script no SQL Editor do Supabase Dashboard

-- 1. Primeiro, vamos desabilitar temporariamente o RLS para limpar as políticas existentes
ALTER TABLE cobrancas DISABLE ROW LEVEL SECURITY;

-- 2. Remover políticas existentes (se houver)
DROP POLICY IF EXISTS "Cobrancas can view own data" ON cobrancas;
DROP POLICY IF EXISTS "Only admins can insert cobrancas" ON cobrancas;
DROP POLICY IF EXISTS "Cobrancas can update own data" ON cobrancas;
DROP POLICY IF EXISTS "Cobrancas can delete own data" ON cobrancas;

-- 3. Habilitar RLS novamente
ALTER TABLE cobrancas ENABLE ROW LEVEL SECURITY;

-- 4. Criar políticas mais permissivas para desenvolvimento
-- Política para SELECT - permitir leitura para todos os usuários autenticados
CREATE POLICY "Enable read access for authenticated users" ON cobrancas
  FOR SELECT USING (auth.role() = 'authenticated');

-- Política para INSERT - permitir inserção para usuários autenticados
CREATE POLICY "Enable insert access for authenticated users" ON cobrancas
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Política para UPDATE - permitir atualização para usuários autenticados
CREATE POLICY "Enable update access for authenticated users" ON cobrancas
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Política para DELETE - permitir exclusão para usuários autenticados
CREATE POLICY "Enable delete access for authenticated users" ON cobrancas
  FOR DELETE USING (auth.role() = 'authenticated');

-- 5. Verificar se as políticas foram criadas corretamente
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'cobrancas';`;

  const disableRLSScript = `-- Script para desabilitar completamente o RLS na tabela cobrancas
-- Execute este script no SQL Editor do Supabase Dashboard se quiser acesso total sem restrições

-- Desabilitar RLS completamente na tabela cobrancas
ALTER TABLE cobrancas DISABLE ROW LEVEL SECURITY;

-- Verificar se o RLS foi desabilitado
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'cobrancas';`;

  const copyToClipboard = (text: string, scriptName: string) => {
    navigator.clipboard.writeText(text);
    // Você pode adicionar um toast aqui se quiser
    alert(`Script ${scriptName} copiado para a área de transferência!`);
  };

  return (
    <div className="bg-red-900/40 border border-red-700 text-red-300 rounded-lg p-4 mb-4">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-red-200">Erro de Política RLS - Tabela Cobranças</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearError}
              className="text-red-400 hover:text-red-300 hover:bg-red-800/30"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <p className="text-sm text-red-300 mb-3">
            {error}
          </p>
          
          <div className="space-y-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowScripts(!showScripts)}
              className="border-red-600 text-red-300 hover:bg-red-800/30"
            >
              {showScripts ? 'Ocultar Scripts SQL' : 'Mostrar Scripts SQL'}
            </Button>
            
            {showScripts && (
              <div className="space-y-4 bg-red-950/50 rounded-lg p-4 border border-red-800">
                <div>
                  <h4 className="font-medium text-red-200 mb-2">Solução 1: Corrigir Políticas RLS</h4>
                  <div className="bg-gray-900 rounded p-3 text-xs font-mono text-gray-300 overflow-x-auto">
                    <pre className="whitespace-pre-wrap">{fixRLSScript}</pre>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(fixRLSScript, 'Correção RLS')}
                      className="border-blue-600 text-blue-300 hover:bg-blue-800/30"
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Copiar Script
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open('https://supabase.com/dashboard', '_blank')}
                      className="border-green-600 text-green-300 hover:bg-green-800/30"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Abrir Supabase
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-red-200 mb-2">Solução 2: Desabilitar RLS (Rápido)</h4>
                  <div className="bg-gray-900 rounded p-3 text-xs font-mono text-gray-300 overflow-x-auto">
                    <pre className="whitespace-pre-wrap">{disableRLSScript}</pre>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(disableRLSScript, 'Desabilitar RLS')}
                      className="border-blue-600 text-blue-300 hover:bg-blue-800/30"
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Copiar Script
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open('https://supabase.com/dashboard', '_blank')}
                      className="border-green-600 text-green-300 hover:bg-green-800/30"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Abrir Supabase
                    </Button>
                  </div>
                </div>
                
                <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-3">
                  <h5 className="font-medium text-blue-200 mb-2">📋 Instruções:</h5>
                  <ol className="text-sm text-blue-300 space-y-1 list-decimal list-inside">
                    <li>Acesse o <a href="https://supabase.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Supabase Dashboard</a></li>
                    <li>Selecione seu projeto</li>
                    <li>Vá para <strong>SQL Editor</strong> no menu lateral</li>
                    <li>Clique em <strong>"New query"</strong></li>
                    <li>Cole um dos scripts acima</li>
                    <li>Clique em <strong>"Run"</strong> para executar</li>
                    <li>Recarregue a página após executar o script</li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 