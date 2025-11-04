# 🔧 Solução para Erro de Conexão com Supabase

## ❌ Erro Encontrado

```
ERR_NAME_NOT_RESOLVED
Failed to fetch
AuthRetryableFetchError
```

Este erro indica que o navegador não consegue resolver o domínio do Supabase (`tgffflpfilsxikqhnkuj.supabase.co`).

## 🔍 Diagnóstico Automático

O código agora inclui diagnóstico automático que executa ao iniciar o aplicativo em modo de desenvolvimento. Verifique o console do navegador para ver:

- ✅ Se as variáveis de ambiente estão configuradas
- 🔗 A URL do Supabase sendo usada
- ❌ Detalhes sobre erros de conexão

## ✅ Solução Passo a Passo

### 1. Verificar se o Projeto Supabase Está Ativo

1. Acesse https://app.supabase.com
2. Faça login na sua conta
3. Verifique se o projeto `tgffflpfilsxikqhnkuj` existe e está **ativo** (não pausado)
4. Se o projeto estiver pausado, clique em "Restore" para reativá-lo
5. Se o projeto não existir mais, você precisará criar um novo projeto

### 2. Obter as Credenciais Corretas

1. No dashboard do Supabase, vá em **Settings** → **API**
2. Copie a **Project URL** (exemplo: `https://xxxxx.supabase.co`)
3. Copie a **anon/public key** (chave longa que começa com `eyJ...`)

### 3. Criar Arquivo .env

Crie um arquivo chamado `.env` na **raiz do projeto** (mesmo nível do `package.json`) com o seguinte conteúdo:

```env
VITE_SUPABASE_URL=https://sua-url-aqui.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-key-aqui
```

**⚠️ IMPORTANTE:**
- Substitua `https://sua-url-aqui.supabase.co` pela URL real do seu projeto
- Substitua `sua-chave-anon-key-aqui` pela chave real do seu projeto
- Não adicione espaços ao redor do `=`
- Não use aspas nas variáveis

### 4. Reiniciar o Servidor

Após criar o arquivo `.env`, você **DEVE** reiniciar o servidor de desenvolvimento:

1. Pare o servidor (Ctrl+C no terminal)
2. Inicie novamente:
   ```bash
   npm run dev
   ```

### 5. Verificar se Funcionou

Abra o console do navegador (F12) e verifique:

- ✅ Deve aparecer: "Variáveis de ambiente do Supabase carregadas do arquivo .env"
- ✅ Deve aparecer: "Conexão com Supabase bem-sucedida!"
- ❌ Se ainda aparecer erro, veja as mensagens de diagnóstico no console

## 🧪 Teste Manual de Conexão

Você pode testar a conexão manualmente no console do navegador:

```javascript
// No console do navegador (F12)
import { testSupabaseConnection } from './src/lib/supabase.ts';
await testSupabaseConnection();
```

## 🚨 Possíveis Causas do Erro

### 1. Projeto Supabase Pausado ou Deletado
- **Solução:** Reative o projeto ou crie um novo no dashboard do Supabase

### 2. URL Incorreta
- **Solução:** Verifique e copie a URL correta em Settings > API > Project URL

### 3. Arquivo .env Não Criado
- **Solução:** Crie o arquivo `.env` na raiz do projeto com as variáveis corretas

### 4. Servidor Não Reiniciado
- **Solução:** Sempre reinicie o servidor após criar ou modificar o arquivo `.env`

### 5. Problemas de Rede/DNS
- **Solução:** 
  - Verifique sua conexão com a internet
  - Tente usar outro navegador ou modo anônimo
  - Verifique se há firewall ou proxy bloqueando

### 6. CORS (Cross-Origin Resource Sharing)
- **Solução:** Adicione `localhost:3000` (ou a porta que você está usando) nas configurações do projeto Supabase em Settings > API > Allowed Origins

## 📝 Exemplo de Arquivo .env

```env
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODk2Nzg5MCwiZXhwIjoxOTU0NTQzODkwfQ.exemplo123456789
```

## 🔄 Se Nada Funcionar

1. Verifique se você tem acesso ao projeto Supabase
2. Crie um novo projeto Supabase se necessário
3. Atualize o arquivo `.env` com as novas credenciais
4. Reinicie o servidor
5. Limpe o cache do navegador (Ctrl+Shift+Delete)

## 📞 Suporte Adicional

Se o problema persistir após seguir todos os passos:

1. Verifique o console do navegador para mensagens de erro detalhadas
2. Verifique o terminal onde o servidor está rodando para erros
3. Verifique o dashboard do Supabase para logs de erro
4. Verifique se o projeto tem créditos disponíveis (projetos gratuitos podem ter limites)

