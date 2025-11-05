# 🚀 Guia de Deploy no Vercel

Este guia vai te ajudar a fazer o deploy da aplicação BootFlow no Vercel.

## 📋 Pré-requisitos

1. ✅ Conta no Vercel (crie em https://vercel.com)
2. ✅ Conta no GitHub/GitLab/Bitbucket (para conectar o repositório)
3. ✅ Repositório do projeto no Git
4. ✅ Variáveis de ambiente do Supabase configuradas

## 🔧 Passo 1: Preparar o Repositório

Certifique-se de que seu código está commitado no Git:

```bash
git add .
git commit -m "Preparando para deploy no Vercel"
git push origin main
```

## 📝 Passo 2: Configurar Variáveis de Ambiente

Antes de fazer o deploy, você precisa configurar as variáveis de ambiente na Vercel. Você pode fazer isso depois, mas é melhor fazer antes.

### Variáveis Necessárias:

1. **VITE_SUPABASE_URL**
   - Valor: `https://mnjivyaztsgxaqihrqec.supabase.co`

2. **VITE_SUPABASE_ANON_KEY**
   - Valor: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uaml2eWF6dHNneGFxaWhycWVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNzk1MzIsImV4cCI6MjA3Nzg1NTUzMn0.TDtX3vbrQXtECUqsyrUiGN81fUOYpAK7WRpOEk1acR8`

3. **VITE_DEMO_MODE**
   - Valor: `false` (para produção)

4. **VITE_APIBRASIL_TOKEN** (opcional, se usar WhatsApp)
   - Valor: Seu token da API Brasil

5. **VITE_APIBRASIL_URL** (opcional, se usar WhatsApp)
   - Valor: `https://gateway.apibrasil.io/api/v2/whatsapp/qrcode`

## 🚀 Passo 3: Deploy no Vercel

### Opção A: Via Interface Web (Recomendado)

1. **Acesse o Vercel:**
   - Vá para https://vercel.com
   - Faça login com sua conta

2. **Importe o Projeto:**
   - Clique em "Add New..." → "Project"
   - Conecte seu repositório (GitHub/GitLab/Bitbucket)
   - Selecione o repositório `bootflow`

3. **Configure o Projeto:**
   - **Framework Preset:** Vite
   - **Root Directory:** `./` (raiz do projeto)
   - **Build Command:** `npm run build` (já configurado)
   - **Output Directory:** `dist` (já configurado)
   - **Install Command:** `npm install` (já configurado)

4. **Configure Variáveis de Ambiente:**
   - Na seção "Environment Variables", adicione todas as variáveis listadas acima
   - Certifique-se de marcar para "Production", "Preview" e "Development"

5. **Deploy:**
   - Clique em "Deploy"
   - Aguarde o processo terminar (pode levar alguns minutos)

### Opção B: Via CLI do Vercel

1. **Instale o Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Faça login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Configure variáveis de ambiente:**
   ```bash
   vercel env add VITE_SUPABASE_URL
   vercel env add VITE_SUPABASE_ANON_KEY
   vercel env add VITE_DEMO_MODE
   ```

5. **Deploy para produção:**
   ```bash
   vercel --prod
   ```

## ✅ Passo 4: Verificar o Deploy

Após o deploy, você receberá uma URL como:
- `https://seu-projeto.vercel.app`

1. **Teste a aplicação:**
   - Acesse a URL fornecida
   - Verifique se a página carrega corretamente
   - Teste o login
   - Verifique se os dados do Supabase estão sendo carregados

2. **Verifique os logs:**
   - No dashboard do Vercel, vá para "Deployments"
   - Clique no deployment mais recente
   - Veja os logs para verificar se há erros

## 🔧 Passo 5: Configurar Domínio Personalizado (Opcional)

Se quiser usar seu próprio domínio:

1. No dashboard do Vercel, vá para **Settings** → **Domains**
2. Adicione seu domínio
3. Configure os registros DNS conforme as instruções
4. Aguarde a propagação DNS (pode levar até 24 horas)

## 🐛 Troubleshooting

### Erro: "Build failed"

**Solução:**
- Verifique se todas as variáveis de ambiente estão configuradas
- Verifique os logs do build no Vercel
- Certifique-se de que o `package.json` está correto

### Erro: "Cannot find module"

**Solução:**
- Verifique se todas as dependências estão no `package.json`
- Execute `npm install` localmente para verificar
- Limpe o cache: `npm cache clean --force`

### Erro: "Environment variables not found"

**Solução:**
- Verifique se todas as variáveis foram adicionadas no Vercel
- Certifique-se de que as variáveis começam com `VITE_`
- Verifique se marcou para "Production", "Preview" e "Development"

### Erro de conexão com Supabase

**Solução:**
- Verifique se `VITE_SUPABASE_URL` está correto
- Verifique se `VITE_SUPABASE_ANON_KEY` está correto
- Verifique se as políticas RLS no Supabase estão configuradas corretamente

### Página em branco após o deploy

**Solução:**
- Verifique se o arquivo `vercel.json` está configurado corretamente
- Verifique se o `outputDirectory` está como `dist`
- Verifique os logs do build para erros de compilação

## 📚 Recursos Úteis

- [Documentação do Vercel](https://vercel.com/docs)
- [Documentação do Vite](https://vitejs.dev/)
- [Guia de Variáveis de Ambiente no Vercel](https://vercel.com/docs/environment-variables)

## 🔄 Atualizações Futuras

Após o primeiro deploy, qualquer push para o branch `main` (ou o branch configurado) irá automaticamente:
1. Disparar um novo build
2. Criar um novo deployment
3. Atualizar a aplicação em produção

Você também pode criar branches de preview para testar antes de fazer merge.

## 📝 Checklist Final

- [ ] Código commitado no Git
- [ ] Repositório conectado ao Vercel
- [ ] Variáveis de ambiente configuradas
- [ ] Build executado com sucesso
- [ ] Aplicação funcionando na URL fornecida
- [ ] Login testado e funcionando
- [ ] Dados do Supabase sendo carregados corretamente

---

**Pronto!** Sua aplicação está no ar! 🎉

Se tiver algum problema, verifique os logs no dashboard do Vercel ou entre em contato com o suporte.

