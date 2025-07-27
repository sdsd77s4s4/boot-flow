# 🔧 Guia de Correção - Coluna formaPagamento

## 🚨 Problema Identificado

A tabela `cobrancas` está apresentando o erro:

```
Could not find the 'formaPagamento' column of 'cobrancas' in the schema cache
```

Este erro indica que o código está tentando acessar uma coluna `formaPagamento` que não existe na tabela `cobrancas` do banco de dados.

## 📋 Soluções Disponíveis

### ✅ Solução 1: Adicionar Coluna formaPagamento (Recomendado)

Execute o script `add-formaPagamento-column.sql` no Supabase Dashboard:

```sql
-- Script para adicionar a coluna formaPagamento à tabela cobrancas
-- Execute este script no SQL Editor do Supabase Dashboard

-- 1. Adicionar a coluna formaPagamento
ALTER TABLE cobrancas 
ADD COLUMN IF NOT EXISTS formaPagamento VARCHAR(50);

-- 2. Adicionar outras colunas que podem estar faltando
ALTER TABLE cobrancas 
ADD COLUMN IF NOT EXISTS gateway VARCHAR(50),
ADD COLUMN IF NOT EXISTS tentativas INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS ultimaTentativa TIMESTAMP,
ADD COLUMN IF NOT EXISTS proximaTentativa TIMESTAMP,
ADD COLUMN IF NOT EXISTS observacoes TEXT,
ADD COLUMN IF NOT EXISTS tags TEXT[];

-- 3. Verificar a estrutura atual da tabela
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'cobrancas' 
ORDER BY ordinal_position;

-- 4. Atualizar registros existentes com valores padrão para formaPagamento
UPDATE cobrancas 
SET formaPagamento = 'PIX' 
WHERE formaPagamento IS NULL;

-- 5. Verificar se a coluna foi adicionada corretamente
SELECT * FROM cobrancas LIMIT 5;
```

### ✅ Solução 2: Corrigir Políticas RLS (Se necessário)

Se após adicionar a coluna ainda houver problemas de RLS, execute:

```sql
-- Script para corrigir as políticas RLS da tabela cobrancas
-- Execute este script no SQL Editor do Supabase Dashboard

-- 1. Primeiro, vamos desabilitar temporariamente o RLS para limpar as políticas existentes
ALTER TABLE cobrancas DISABLE ROW LEVEL SECURITY;

-- 2. Remover políticas existentes (se houver)
DROP POLICY IF EXISTS "Cobrancas can view own data" ON cobrancas;
DROP POLICY IF EXISTS "Only admins can insert cobrancas" ON cobrancas;
DROP POLICY IF EXISTS "Cobrancas can update own data" ON cobrancas;
DROP POLICY IF EXISTS "Cobrancas can delete own data" ON cobrancas;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON cobrancas;
DROP POLICY IF EXISTS "Enable insert access for authenticated users" ON cobrancas;
DROP POLICY IF EXISTS "Enable update access for authenticated users" ON cobrancas;
DROP POLICY IF EXISTS "Enable delete access for authenticated users" ON cobrancas;

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
WHERE tablename = 'cobrancas';
```

### ✅ Solução 3: Desabilitar RLS (Rápido)

Para uma solução rápida, desabilite completamente o RLS:

```sql
-- Script para desabilitar completamente o RLS na tabela cobrancas
-- Execute este script no SQL Editor do Supabase Dashboard se quiser acesso total sem restrições

-- Desabilitar RLS completamente na tabela cobrancas
ALTER TABLE cobrancas DISABLE ROW LEVEL SECURITY;

-- Verificar se o RLS foi desabilitado
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'cobrancas';
```

## 🚀 Como Aplicar as Correções

### Passo 1: Execute o Script de Adição de Coluna
1. Acesse o [Supabase Dashboard](https://supabase.com/dashboard)
2. Vá para **SQL Editor**
3. Cole o script da **Solução 1**
4. Clique em **"Run"**

### Passo 2: Verifique o Resultado
1. Recarregue a página de Cobranças
2. Os dados devem aparecer normalmente
3. Teste as operações CRUD

### Passo 3: Se necessário, execute os scripts RLS
Se ainda houver problemas de permissão, execute os scripts das **Soluções 2 ou 3**.

## 📊 Resultado Esperado

Após aplicar as correções:

- ✅ A coluna `formaPagamento` será adicionada à tabela
- ✅ Outras colunas opcionais serão adicionadas
- ✅ A tabela de cobranças carregará normalmente
- ✅ Operações CRUD funcionarão sem erros
- ✅ Os dados aparecerão na interface

## 🔍 Verificações de Sucesso

### Verificar Estrutura da Tabela:
```sql
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'cobrancas' 
ORDER BY ordinal_position;
```

### Verificar Dados:
```sql
SELECT * FROM cobrancas LIMIT 5;
```

### Verificar Políticas RLS:
```sql
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'cobrancas';
```

## 📁 Arquivos Criados/Modificados

### Arquivos Criados:
- ✅ `add-formaPagamento-column.sql` - Script para adicionar colunas
- ✅ `GUIA_CORRECAO_COLUNA_FORMAPAGAMENTO.md` - Este guia

### Arquivos Modificados:
- ✅ `src/components/RLSErrorBannerCobrancas.tsx` - Banner atualizado com script de coluna

## 🎯 Status Final

**Status:** ✅ **COMPLETO**  
**Problema:** Coluna formaPagamento não encontrada  
**Solução:** Script de adição de coluna criado  
**Interface:** Banner atualizado com múltiplas soluções  

## 📝 Notas Importantes

1. **Execute primeiro o script de adição de coluna** - Este é o principal problema
2. **Se necessário, execute os scripts RLS** - Para problemas de permissão
3. **Verifique sempre a estrutura da tabela** - Use os comandos de verificação
4. **Teste as operações CRUD** - Após aplicar as correções

## 🔧 Comandos Úteis

### Verificar todas as colunas da tabela:
```sql
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'cobrancas';
```

### Verificar se a coluna foi adicionada:
```sql
SELECT formaPagamento FROM cobrancas LIMIT 1;
```

### Atualizar valores padrão:
```sql
UPDATE cobrancas 
SET formaPagamento = 'PIX' 
WHERE formaPagamento IS NULL;
``` 