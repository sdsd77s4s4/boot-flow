# 🔐 Guia de Configuração de Autenticação no Supabase

## 📋 Índice
1. [Configurações no Dashboard do Supabase](#configurações-no-dashboard)
2. [Script SQL para Executar](#script-sql)
3. [Criar Primeiro Usuário Admin](#criar-admin)
4. [Configurações de Email](#configurações-de-email)
5. [Políticas RLS](#políticas-rls)

---

## 🎯 Configurações no Dashboard do Supabase

### 1. Acesse Authentication > Providers

1. Acesse: https://app.supabase.com → Seu Projeto → **Authentication** → **Providers**

2. **Email Provider** (Padrão):
   - ✅ **Enable Email Provider**: Ativado
   - ✅ **Enable Email Confirmations**: Opcional (recomendado para produção)
   - ✅ **Enable Email Change Confirmations**: Opcional

3. **Configurações de Senha**:
   - **Minimum Password Length**: 8 caracteres
   - **Enable Password Reset**: Ativado

### 2. URL de Redirecionamento

1. Vá em **Authentication** → **URL Configuration**

2. Adicione suas URLs:
   ```
   http://localhost:3000/**
   https://seu-dominio.com/**
   ```

3. **Site URL**: 
   ```
   http://localhost:3000
   ```
   (ou seu domínio em produção)

### 3. Configurações de Email (Opcional)

1. Vá em **Authentication** → **Email Templates**

2. Você pode personalizar os templates de email ou usar os padrões

3. **SMTP Settings** (para produção):
   - Configure um provedor SMTP para enviar emails reais
   - Ou use o serviço padrão do Supabase (limitado)

---

## 📝 Script SQL para Executar

Execute o script `setup_auth_supabase.sql` no **SQL Editor** do Supabase:

1. Acesse: **SQL Editor** → **New Query**
2. Cole o conteúdo do arquivo `setup_auth_supabase.sql`
3. Clique em **Run**

Este script cria:
- ✅ Tabela `profiles` vinculada a `auth.users`
- ✅ Trigger para criar profile automaticamente ao registrar
- ✅ Políticas RLS configuradas
- ✅ Funções auxiliares

---

## 👤 Criar Primeiro Usuário Admin

### Opção 1: Via Dashboard do Supabase

1. Acesse: **Authentication** → **Users** → **Add User**
2. Preencha:
   - **Email**: seu-email@exemplo.com
   - **Password**: uma senha segura
   - **Auto Confirm User**: ✅ (marca esta opção)
   - **User Metadata** (JSON):
     ```json
     {
       "role": "admin",
       "full_name": "Nome do Admin"
     }
     ```
3. Clique em **Create User**

### Opção 2: Via SQL (Após criar usuário)

Se você já criou um usuário, execute este SQL para torná-lo admin:

```sql
-- Substitua 'seu-email@exemplo.com' pelo email do usuário
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'seu-email@exemplo.com';
```

### Opção 3: Via Aplicação (Cadastro)

1. Acesse a página de cadastro (`/cadastro`)
2. Crie uma conta com seu email
3. Depois execute o SQL acima para tornar admin

---

## 📧 Configurações de Email

### Para Desenvolvimento (Localhost)

Não precisa configurar SMTP. O Supabase enviará emails de teste (eles aparecem no console do Supabase).

### Para Produção

1. Vá em **Authentication** → **SMTP Settings**
2. Configure seu provedor SMTP (Gmail, SendGrid, etc.)
3. Ou use o serviço padrão do Supabase (limitado a 3 emails/hora)

**Configuração SMTP (Gmail exemplo)**:
```
SMTP Host: smtp.gmail.com
SMTP Port: 587
SMTP User: seu-email@gmail.com
SMTP Password: sua-senha-de-app
Sender Name: Bootflow
Sender Email: seu-email@gmail.com
```

---

## 🔒 Políticas RLS para Tabelas Principais

As políticas RLS já estão configuradas no script `setup_auth_supabase.sql`, mas verifique:

### Tabela `users` (Clientes)
```sql
-- Verificar se RLS está habilitado
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'users';

-- Se não estiver habilitado:
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
```

### Tabela `resellers` (Revendas)
```sql
ALTER TABLE public.resellers ENABLE ROW LEVEL SECURITY;
```

---

## ✅ Checklist de Configuração

- [ ] Executou o script `setup_auth_supabase.sql`
- [ ] Configurou URLs de redirecionamento no Supabase
- [ ] Criou primeiro usuário admin
- [ ] Testou login com credenciais reais
- [ ] Verificou que as políticas RLS estão ativas
- [ ] Configurou SMTP (para produção)

---

## 🧪 Testar Autenticação

1. **Registrar novo usuário**:
   - Acesse `/cadastro`
   - Preencha email e senha
   - Verifique se o profile foi criado automaticamente

2. **Fazer Login**:
   - Acesse `/login`
   - Use credenciais reais do Supabase (não demo)
   - Verifique se redireciona corretamente

3. **Verificar Profile**:
   - Após login, verifique se o role está correto
   - Você pode verificar no Supabase: **Authentication** → **Users**

---

## 🐛 Troubleshooting

### Erro: "User already registered"
- O usuário já existe no Supabase
- Use outro email ou faça reset de senha

### Erro: "Email not confirmed"
- Vá em **Authentication** → **Users**
- Encontre o usuário e clique em **Confirm User**

### Erro: "RLS policy violation"
- Verifique se executou o script SQL completo
- Confirme que as políticas RLS estão criadas

### Usuário não tem role
- Execute: `UPDATE public.profiles SET role = 'admin' WHERE email = 'seu-email@exemplo.com';`

---

## 📚 Recursos Adicionais

- [Documentação Supabase Auth](https://supabase.com/docs/guides/auth)
- [RLS Policies](https://supabase.com/docs/guides/auth/row-level-security)
- [Email Templates](https://supabase.com/docs/guides/auth/auth-email-templates)

