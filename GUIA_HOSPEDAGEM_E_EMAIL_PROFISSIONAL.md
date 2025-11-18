# 🚀 Guia Completo: Hospedagem e Email Profissional

Este guia vai te ajudar a hospedar seu site BootFlow e criar um email profissional.

---

## 📦 PARTE 1: HOSPEDAGEM DO SITE

### 🎯 Opção Recomendada: Vercel (GRATUITA)

O projeto já está configurado para Vercel! É a melhor opção porque:
- ✅ **100% Gratuita** para projetos pessoais/pequenos
- ✅ **Deploy automático** via Git
- ✅ **SSL/HTTPS automático** (certificado gratuito)
- ✅ **CDN global** (site rápido no mundo todo)
- ✅ **Suporte a domínio personalizado**
- ✅ **Deploy em segundos**

### 📝 Passo a Passo: Deploy no Vercel

#### 1. Preparar o Código

```bash
# Certifique-se de que tudo está commitado
git add .
git commit -m "Preparando para deploy"
git push origin main
```

#### 2. Criar Conta no Vercel

1. Acesse: https://vercel.com
2. Clique em **Sign Up**
3. Escolha **Continue with GitHub** (recomendado)
4. Autorize o Vercel a acessar seus repositórios

#### 3. Fazer o Deploy

1. No dashboard do Vercel, clique em **Add New Project**
2. Selecione o repositório `bootflow`
3. Configure:
   - **Framework Preset:** Vite (já detectado automaticamente)
   - **Root Directory:** `./` (raiz)
   - **Build Command:** `npm run build` (já configurado)
   - **Output Directory:** `dist` (já configurado)
4. Clique em **Deploy**

#### 4. Configurar Variáveis de Ambiente

Após o primeiro deploy, configure as variáveis:

1. Vá em **Settings** → **Environment Variables**
2. Adicione estas variáveis:

```
VITE_SUPABASE_URL
Valor: https://mnjivyaztsgxaqihrqec.supabase.co

VITE_SUPABASE_ANON_KEY
Valor: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uaml2eWF6dHNneGFxaWhycWVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNzk1MzIsImV4cCI6MjA3Nzg1NTUzMn0.TDtX3vbrQXtECUqsyrUiGN81fUOYpAK7WRpOEk1acR8
```

3. Marque para **Production**, **Preview** e **Development**
4. Clique em **Save**
5. Faça um novo deploy (vai acontecer automaticamente)

#### 5. Configurar Domínio Personalizado (Opcional)

Se você tem um domínio (ex: `bootflow.com.br`):

1. No Vercel, vá em **Settings** → **Domains**
2. Clique em **Add Domain**
3. Digite seu domínio
4. Siga as instruções para configurar DNS
5. Aguarde a propagação (1-48 horas)

**📖 Guia completo de domínio:** Veja `GUIA_CONFIGURAR_DOMINIO_REGISTROBR_VERCEL.md`

---

## 📧 PARTE 2: EMAIL PROFISSIONAL

### 🎯 O que é Email Profissional?

Email profissional é um endereço usando seu próprio domínio, por exemplo:
- ✅ `contato@bootflow.com.br` (profissional)
- ❌ `bootflow@gmail.com` (não profissional)

### 💰 Opções de Email Profissional

#### 1. Google Workspace (Recomendado - Pago)

**Preço:** R$ 27,90/mês por usuário
**Inclui:**
- ✅ Gmail com seu domínio
- ✅ Google Drive (30GB)
- ✅ Google Meet
- ✅ Google Docs, Sheets, Slides
- ✅ Suporte 24/7

**Como contratar:**
1. Acesse: https://workspace.google.com
2. Clique em **Começar**
3. Escolha o plano **Business Starter**
4. Registre seu domínio ou use um existente
5. Configure os registros MX no seu provedor DNS
6. Aguarde a ativação (pode levar até 48 horas)

**Configuração DNS (Registro.br):**
```
Tipo: MX
Prioridade: 1
Valor: aspmx.l.google.com.

Tipo: MX
Prioridade: 5
Valor: alt1.aspmx.l.google.com.

Tipo: MX
Prioridade: 5
Valor: alt2.aspmx.l.google.com.

Tipo: MX
Prioridade: 10
Valor: alt3.aspmx.l.google.com.

Tipo: MX
Prioridade: 10
Valor: alt4.aspmx.l.google.com.
```

#### 2. Microsoft 365 (Pago)

**Preço:** R$ 25,00/mês por usuário
**Inclui:**
- ✅ Outlook com seu domínio
- ✅ OneDrive (1TB)
- ✅ Teams
- ✅ Office Online

**Como contratar:**
1. Acesse: https://www.microsoft.com/pt-br/microsoft-365
2. Escolha o plano **Microsoft 365 Business Basic**
3. Registre seu domínio
4. Configure os registros MX

#### 3. Zoho Mail (Gratuito - Limitado)

**Preço:** GRATUITO (até 5 usuários)
**Limitações:**
- ⚠️ 5GB de armazenamento por usuário
- ⚠️ Apenas webmail (sem app desktop)
- ⚠️ Sem suporte técnico

**Como configurar:**
1. Acesse: https://www.zoho.com/mail/
2. Clique em **Sign Up Now**
3. Escolha **Free Plan**
4. Registre seu domínio
5. Configure os registros MX:

```
Tipo: MX
Prioridade: 10
Valor: mx.zoho.com

Tipo: MX
Prioridade: 20
Valor: mx2.zoho.com

Tipo: TXT
Nome: @
Valor: v=spf1 include:zoho.com ~all
```

#### 4. Registro.br Email (Gratuito - Limitado)

**Preço:** GRATUITO (com domínio .br)
**Limitações:**
- ⚠️ Apenas 3 contas de email
- ⚠️ 1GB por conta
- ⚠️ Apenas webmail

**Como configurar:**
1. Acesse: https://registro.br
2. Faça login
3. Vá em **Email** → **Criar Conta**
4. Siga as instruções
5. Configure automaticamente no painel

---

## 🔧 PARTE 3: CONFIGURAÇÃO PASSO A PASSO

### Cenário 1: Domínio no Registro.br + Google Workspace

#### Passo 1: Contratar Google Workspace
1. Acesse: https://workspace.google.com
2. Escolha o plano
3. Digite seu domínio (ex: `bootflow.com.br`)
4. Complete o cadastro

#### Passo 2: Verificar Domínio
1. No painel do Google Workspace, vá em **Domínios**
2. Copie o código de verificação (TXT record)
3. No Registro.br:
   - Vá em **DNS** → **Zona DNS**
   - Adicione registro **TXT**
   - Cole o código de verificação
   - Salve

#### Passo 3: Configurar MX Records
1. No Google Workspace, copie os registros MX
2. No Registro.br:
   - Vá em **DNS** → **Zona DNS**
   - Remova registros MX antigos (se houver)
   - Adicione os 5 registros MX do Google
   - Salve

#### Passo 4: Aguardar Propagação
- Pode levar de 1 a 48 horas
- Normalmente leva 1-2 horas no Brasil
- Verifique em: https://mxtoolbox.com

#### Passo 5: Criar Contas de Email
1. No Google Workspace, vá em **Usuários**
2. Clique em **Adicionar usuário**
3. Crie contas como:
   - `contato@bootflow.com.br`
   - `suporte@bootflow.com.br`
   - `vendas@bootflow.com.br`

### Cenário 2: Domínio no Registro.br + Zoho Mail (Gratuito)

#### Passo 1: Criar Conta Zoho
1. Acesse: https://www.zoho.com/mail/
2. Clique em **Sign Up Now**
3. Escolha **Free Plan**
4. Digite seu domínio

#### Passo 2: Verificar Domínio
1. No Zoho, copie o código TXT
2. No Registro.br, adicione registro TXT
3. Salve

#### Passo 3: Configurar MX
1. No Zoho, copie os registros MX
2. No Registro.br, adicione os registros MX
3. Salve

#### Passo 4: Criar Contas
1. No Zoho, vá em **Users**
2. Crie até 5 contas gratuitas

---

## 📱 PARTE 4: CONFIGURAR EMAIL NO APLICATIVO

### Gmail/Google Workspace

**Android/iOS:**
1. Abra o app Gmail
2. Toque no menu (3 linhas)
3. Toque em **Adicionar conta**
4. Escolha **Google**
5. Faça login com `seu-email@bootflow.com.br`

**Outlook/Thunderbird:**
```
Servidor IMAP: imap.gmail.com
Porta: 993 (SSL)
Servidor SMTP: smtp.gmail.com
Porta: 587 (TLS)
Usuário: seu-email@bootflow.com.br
Senha: sua-senha
```

### Zoho Mail

**Android/iOS:**
1. Baixe o app Zoho Mail
2. Faça login com `seu-email@bootflow.com.br`

**Outlook/Thunderbird:**
```
Servidor IMAP: imap.zoho.com
Porta: 993 (SSL)
Servidor SMTP: smtp.zoho.com
Porta: 587 (TLS)
Usuário: seu-email@bootflow.com.br
Senha: sua-senha
```

---

## 💡 RECOMENDAÇÕES FINAIS

### Para Começar (Orçamento Baixo)
1. ✅ Hospedagem: **Vercel** (GRATUITA)
2. ✅ Email: **Zoho Mail** (GRATUITO - 5 contas)
3. ✅ Domínio: **Registro.br** (R$ 40/ano)

**Custo Total:** R$ 40/ano (apenas o domínio)

### Para Crescer (Orçamento Médio)
1. ✅ Hospedagem: **Vercel** (GRATUITA)
2. ✅ Email: **Google Workspace** (R$ 27,90/mês)
3. ✅ Domínio: **Registro.br** (R$ 40/ano)

**Custo Total:** R$ 27,90/mês + R$ 40/ano

### Para Empresa (Orçamento Alto)
1. ✅ Hospedagem: **Vercel Pro** (R$ 20/mês) ou **AWS**
2. ✅ Email: **Google Workspace** (R$ 27,90/mês por usuário)
3. ✅ Domínio: **Registro.br** (R$ 40/ano)
4. ✅ Backup: **Google Drive** (incluído)

**Custo Total:** Variável conforme número de usuários

---

## 📋 CHECKLIST COMPLETO

### Hospedagem
- [ ] Conta criada no Vercel
- [ ] Repositório conectado
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy realizado com sucesso
- [ ] Site acessível na URL fornecida
- [ ] Domínio personalizado configurado (opcional)

### Email Profissional
- [ ] Domínio registrado
- [ ] Provedor de email escolhido
- [ ] Conta criada no provedor
- [ ] Domínio verificado
- [ ] Registros MX configurados
- [ ] Aguardado propagação DNS
- [ ] Contas de email criadas
- [ ] Email testado (enviar/receber)
- [ ] Configurado no app mobile/desktop

---

## 🐛 TROUBLESHOOTING

### Email não está chegando

**Solução:**
1. Verifique se os registros MX estão corretos
2. Aguarde até 48 horas para propagação completa
3. Verifique spam/lixo eletrônico
4. Teste em: https://mxtoolbox.com

### Domínio não verifica

**Solução:**
1. Verifique se o registro TXT está correto
2. Aguarde algumas horas
3. Remova e adicione novamente
4. Verifique em: https://dnschecker.org

### Site não carrega após deploy

**Solução:**
1. Verifique variáveis de ambiente no Vercel
2. Veja os logs do build
3. Teste localmente: `npm run build`
4. Verifique se o `vercel.json` está correto

---

## 📚 RECURSOS ÚTEIS

### Hospedagem
- [Documentação Vercel](https://vercel.com/docs)
- [Guia Deploy Vercel](./GUIA_DEPLOY_VERCEL.md)
- [Configurar Domínio](./GUIA_CONFIGURAR_DOMINIO_REGISTROBR_VERCEL.md)

### Email
- [Google Workspace](https://workspace.google.com)
- [Zoho Mail](https://www.zoho.com/mail/)
- [Microsoft 365](https://www.microsoft.com/pt-br/microsoft-365)
- [Registro.br Email](https://registro.br/email/)

### DNS
- [MXToolbox](https://mxtoolbox.com) - Verificar MX records
- [DNS Checker](https://dnschecker.org) - Verificar propagação
- [WhatsMyDNS](https://www.whatsmydns.net) - Verificar DNS

---

## ✅ PRÓXIMOS PASSOS

1. **Hospedar o site:**
   - Siga a Parte 1 deste guia
   - Deploy no Vercel em 5 minutos

2. **Registrar domínio:**
   - Acesse: https://registro.br
   - Registre seu domínio .br
   - Custa apenas R$ 40/ano

3. **Configurar email:**
   - Escolha um provedor (recomendo Zoho para começar)
   - Configure os registros MX
   - Crie suas contas de email

4. **Atualizar o site:**
   - Substitua emails genéricos por profissionais
   - Exemplo: `suporte@bootflow.com.br` no lugar de `suporte@exemplo.com`

---

**Pronto!** Agora você tem um site hospedado e email profissional! 🎉

Se precisar de ajuda, consulte os outros guias na pasta raiz do projeto.

