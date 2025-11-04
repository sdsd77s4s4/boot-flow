# 🎭 Sistema de Login Demo

## ✅ Configurado com Sucesso!

O sistema de autenticação demo foi configurado e está pronto para uso. Agora você pode testar a aplicação mesmo sem conexão com o Supabase.

## 🔐 Credenciais Demo Disponíveis

O sistema possui 3 usuários demo pré-configurados para diferentes roles:

### 👨‍💼 Administrador
- **Email:** `admin@demo.com`
- **Senha:** `admin123`
- **Role:** `admin`

### 👤 Revendedor
- **Email:** `revendedor@demo.com`
- **Senha:** `revendedor123`
- **Role:** `reseller`

### 👥 Cliente
- **Email:** `cliente@demo.com`
- **Senha:** `cliente123`
- **Role:** `client`

## 🚀 Como Usar

### Método 1: Card na Página de Login (Recomendado)

1. Acesse a página de login (`/login`)
2. Você verá um card azul com as credenciais demo
3. Clique em qualquer credencial para preencher automaticamente os campos
4. Clique em "Entrar na plataforma"

### Método 2: Digitar Manualmente

1. Digite o email de uma conta demo
2. Digite a senha correspondente
3. Clique em "Entrar na plataforma"

## 🎯 Como Funciona

1. **Detecção Automática:** O sistema detecta automaticamente se você está usando credenciais demo
2. **Modo Demo:** Quando você faz login com credenciais demo, o sistema entra em "modo demo"
3. **Sessão Local:** A sessão demo é armazenada no localStorage do navegador
4. **Compatibilidade:** Funciona exatamente como uma sessão normal do Supabase

## 💡 Recursos do Modo Demo

- ✅ Login sem necessidade de conexão com Supabase
- ✅ Sessões persistem após recarregar a página
- ✅ Logout funciona normalmente
- ✅ Redirecionamento baseado em role funciona
- ✅ Interface idêntica à autenticação normal

## 🔄 Trocar entre Modo Demo e Supabase

- **Modo Demo:** Automático quando você usa credenciais demo
- **Modo Supabase:** Automático quando você usa credenciais reais do Supabase
- **Trocar:** Basta fazer logout e fazer login com a outra conta

## ⚠️ Limitações do Modo Demo

- Não persiste dados no banco de dados
- Não funciona com recursos que dependem do Supabase (ex: hooks `useUsers`, `useCobrancas`)
- Ideal apenas para testes de interface e navegação

## 📝 Personalizar Usuários Demo

Para adicionar ou modificar usuários demo, edite o arquivo `src/lib/demoAuth.ts`:

```typescript
export const DEMO_USERS: DemoUser[] = [
  {
    id: 'demo-admin-001',
    email: 'admin@demo.com',
    password: 'admin123',
    full_name: 'Administrador Demo',
    role: 'admin',
  },
  // Adicione mais usuários aqui...
];
```

## 🐛 Troubleshooting

### Problema: Login demo não funciona
- Verifique se está usando exatamente as credenciais acima
- Limpe o cache do navegador
- Verifique o console para erros

### Problema: Sessão demo não persiste
- Verifique se o localStorage está habilitado no navegador
- Tente em modo anônimo para testar

### Problema: Quer desabilitar modo demo
- Comente ou remova a verificação de credenciais demo no `AuthContext.tsx`
- Ou remova o card de credenciais demo na página de Login

## 🎉 Pronto para Testar!

Agora você pode fazer login com qualquer uma das credenciais demo e explorar a aplicação sem precisar configurar o Supabase!

