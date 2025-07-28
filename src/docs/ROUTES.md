# Documentação de Rotas

Este documento descreve as rotas disponíveis na aplicação Bootflow e suas respectivas funcionalidades.

## Rotas Públicas

| Rota | Componente | Descrição |
|------|------------|-----------|
| `/` | `Index` | Página inicial (landing page) da aplicação |
| `/termos` | `Terms` | Página de termos de uso |
| `/privacidade` | `Privacy` | Página de política de privacidade |
| `/ajuda` | `HelpCenter` | Página de ajuda e suporte |

## Dashboard Admin

| Rota | Componente | Descrição |
|------|------------|-----------|
| `/admin` | `AdminDashboard` | Dashboard principal do administrador |
| `/admin/revendedores` | `AdminResellers` | Gerenciamento de revendedores |

## Configurações e Outras Páginas

| Rota | Componente | Descrição |
|------|------------|-----------|
| `/configuracoes` | `Settings` | Configurações do sistema |
| `/produtos` | `Products` | Gerenciamento de produtos |
| `/estatisticas` | `Statistics` | Estatísticas do sistema |
| `/ecommerce` | `Ecommerce` | Gerenciamento de e-commerce |
| `/canais` | `Channels` | Gerenciamento de canais |
| `/campanhas-voz` | `VoiceCampaigns` | Gerenciamento de campanhas de voz |
| `/ia-config` | `AIConfiguration` | Configurações de IA |

## Navegação Interna (AdminDashboard)

O painel de administração utiliza navegação por estado (não por rota) para alternar entre as diferentes seções:

- **Dashboard**: Visão geral do sistema
- **Clientes**: Gerenciamento de clientes
- **Revendas**: Gerenciamento de revendedores
- **Cobranças**: Gerenciamento financeiro
- **Notificações**: Central de notificações
- **WhatsApp**: Integração com WhatsApp
- **Gateways**: Configuração de gateways de pagamento
- **Customizar Marca**: Personalização da marca
- **E-commerce**: Gerenciamento de loja virtual
- **IA + Voz**: Configurações de IA e voz
- **Gamificação**: Sistema de gamificação
- **Análises**: Análises e relatórios
- **Configurações**: Configurações do sistema

## Tabelas do Banco de Dados

A aplicação utiliza as seguintes tabelas principais:

- `profiles`: Armazena informações de perfil dos usuários
- `users`: Armazena informações de autenticação e perfil básico dos usuários
- `resellers`: Armazena informações de revendedores
- `cobrancas`: Armazena informações financeiras e de cobrança

## Integração em Tempo Real

A aplicação utiliza o Supabase Realtime para atualizações em tempo real dos dados. As seguintes tabelas são monitoradas:

- `profiles`
- `cobrancas`
- `users`
- `resellers`

## Fluxos de Autenticação

A aplicação suporta os seguintes fluxos de autenticação:

1. **Login**: Autenticação de usuários
2. **Cadastro**: Criação de novas contas
3. **Recuperação de Senha**: Redefinição de senha
4. **Redefinição de Senha**: Definição de nova senha após recuperação

## Configuração de Ambiente

Certifique-se de configurar as seguintes variáveis de ambiente para o funcionamento correto da aplicação:

- `VITE_SUPABASE_URL`: URL da instância do Supabase
- `VITE_SUPABASE_ANON_KEY`: Chave anônima do Supabase
- `VITE_APP_URL`: URL base da aplicação (para redirecionamentos)

---

*Última atualização: 2025-04-02*
