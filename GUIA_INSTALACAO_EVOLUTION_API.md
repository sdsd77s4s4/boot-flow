# 📱 Guia de Instalação - Evolution API

## 🎯 O que é Evolution API?

A **Evolution API** é uma API open-source para integração com WhatsApp baseada na biblioteca Baileys. Ela permite enviar e receber mensagens via REST API, integrar com Webhooks e é ideal para conexões a longo prazo.

**Repositório**: https://github.com/EvolutionAPI/evolution-api

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado:

1. **Node.js** (versão 18 ou superior)
   - Download: https://nodejs.org/
   - Verificar instalação: `node --version`

2. **Docker** (opcional, mas recomendado)
   - Download: https://www.docker.com/get-started
   - Verificar instalação: `docker --version`

3. **Git**
   - Download: https://git-scm.com/downloads
   - Verificar instalação: `git --version`

4. **Banco de Dados** (PostgreSQL, MySQL ou MongoDB)
   - PostgreSQL: https://www.postgresql.org/download/
   - MySQL: https://dev.mysql.com/downloads/
   - MongoDB: https://www.mongodb.com/try/download/community

## 🚀 Instalação

### Opção 1: Instalação com Docker (Recomendado)

#### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/EvolutionAPI/evolution-api.git
cd evolution-api
```

#### Passo 2: Configurar Variáveis de Ambiente

```bash
# Copiar o arquivo de exemplo
cp .env.example .env

# Editar o arquivo .env
nano .env  # ou use seu editor preferido
```

#### Passo 3: Configurar o arquivo .env

Edite o arquivo `.env` com as seguintes configurações mínimas:

```env
# Configurações do Servidor
SERVER_URL=http://localhost:8080
PORT=8080

# Configurações do Banco de Dados
DATABASE_ENABLED=true
DATABASE_PROVIDER=postgresql  # ou mysql, mongodb
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=evolution
DATABASE_USER=seu_usuario
DATABASE_PASSWORD=sua_senha

# Configurações de Autenticação
AUTHENTICATION_API_KEY=sua_chave_secreta_aqui
AUTHENTICATION_EXPOSE_IN_FETCH_INSTANCES=true

# Configurações de QR Code
QRCODE_LIMIT=30
QRCODE_COLOR=#198754

# Configurações de Webhook
WEBHOOK_GLOBAL_URL=https://seu-dominio.com/webhook
WEBHOOK_GLOBAL_ENABLED=true
```

#### Passo 4: Iniciar com Docker Compose

```bash
# Iniciar os serviços
docker-compose up -d

# Verificar os logs
docker-compose logs -f
```

#### Passo 5: Acessar a Interface

Abra seu navegador e acesse:
- **Interface Web**: http://localhost:8080
- **API**: http://localhost:8080/api

### Opção 2: Instalação Manual (Sem Docker)

#### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/EvolutionAPI/evolution-api.git
cd evolution-api
```

#### Passo 2: Instalar Dependências

```bash
npm install
```

#### Passo 3: Configurar Variáveis de Ambiente

```bash
# Copiar o arquivo de exemplo
cp .env.example .env

# Editar o arquivo .env
nano .env
```

Configure o arquivo `.env` conforme mostrado na Opção 1.

#### Passo 4: Configurar o Banco de Dados

```bash
# Executar migrações do banco de dados
npm run db:migrate
```

#### Passo 5: Iniciar o Servidor

```bash
# Modo desenvolvimento
npm run dev

# Modo produção
npm run build
npm start
```

## 🔧 Configuração Inicial

### 1. Criar uma Instância

Após iniciar o servidor, você precisa criar uma instância do WhatsApp:

#### Via Interface Web:
1. Acesse http://localhost:8080
2. Clique em **"Criar Instância"** ou **"Create Instance"**
3. Preencha os dados:
   - **Nome da Instância**: Ex: `minha-instancia`
   - **Token**: (opcional) Token de autenticação
4. Clique em **"Criar"**

#### Via API REST:

```bash
curl -X POST http://localhost:8080/instance/create \
  -H "Content-Type: application/json" \
  -H "apikey: sua_chave_secreta_aqui" \
  -d '{
    "instanceName": "minha-instancia",
    "token": "seu_token_opcional"
  }'
```

### 2. Conectar o WhatsApp

#### Via Interface Web:
1. Após criar a instância, clique em **"Conectar"** ou **"Connect"**
2. Um QR Code será exibido
3. Abra o WhatsApp no seu celular
4. Vá em **Menu** > **Dispositivos conectados** > **Conectar dispositivo**
5. Escaneie o QR Code

#### Via API REST:

```bash
# Gerar QR Code
curl -X GET http://localhost:8080/instance/connect/minha-instancia \
  -H "apikey: sua_chave_secreta_aqui"
```

A resposta retornará o QR Code em base64 ou uma URL para acessar.

### 3. Verificar Status da Conexão

```bash
# Verificar status
curl -X GET http://localhost:8080/instance/fetchInstances \
  -H "apikey: sua_chave_secreta_aqui"
```

## 📡 Integração com o Sistema

### 1. Obter Credenciais da API

Após configurar a Evolution API, você precisará de:

- **URL da API**: `http://localhost:8080` (ou seu domínio)
- **API Key**: A chave configurada em `AUTHENTICATION_API_KEY` no `.env`
- **Instance Name**: O nome da instância criada (ex: `minha-instancia`)

### 2. Endpoints Principais

#### Enviar Mensagem

```bash
POST http://localhost:8080/message/sendText/minha-instancia
Headers:
  - apikey: sua_chave_secreta_aqui
  - Content-Type: application/json
Body:
{
  "number": "5511999999999",
  "text": "Sua mensagem aqui"
}
```

#### Receber Mensagens (Webhook)

Configure o webhook no arquivo `.env`:

```env
WEBHOOK_GLOBAL_URL=https://seu-dominio.com/webhook
WEBHOOK_GLOBAL_ENABLED=true
```

O webhook receberá eventos quando mensagens chegarem.

#### Verificar Status

```bash
GET http://localhost:8080/instance/connectionState/minha-instancia
Headers:
  - apikey: sua_chave_secreta_aqui
```

## 🔐 Segurança

### 1. Configurar API Key

Certifique-se de usar uma API Key forte no arquivo `.env`:

```env
AUTHENTICATION_API_KEY=uma_chave_secreta_muito_forte_aqui
```

### 2. Usar HTTPS em Produção

Para produção, configure HTTPS:

```env
SERVER_URL=https://seu-dominio.com
```

### 3. Configurar Firewall

Limite o acesso à API apenas para IPs confiáveis.

## 🐛 Troubleshooting

### Problema: QR Code não aparece

**Solução:**
- Verifique se a instância foi criada corretamente
- Verifique os logs: `docker-compose logs -f`
- Tente recriar a instância

### Problema: Erro de conexão com banco de dados

**Solução:**
- Verifique se o banco de dados está rodando
- Verifique as credenciais no arquivo `.env`
- Teste a conexão manualmente

### Problema: Mensagens não são enviadas

**Solução:**
- Verifique se o WhatsApp está conectado
- Verifique o status da conexão
- Verifique os logs da API

## 📚 Documentação Adicional

- **Documentação Oficial**: https://doc.evolution-api.com
- **Postman Collection**: Disponível no repositório
- **Discord**: Comunidade para suporte
- **GitHub Issues**: Para reportar bugs

## 🔗 Links Úteis

- **Repositório GitHub**: https://github.com/EvolutionAPI/evolution-api
- **Documentação**: https://doc.evolution-api.com
- **Docker Hub**: https://hub.docker.com/r/atendai/evolution-api
- **Comunidade Discord**: Link no repositório

## 📝 Notas Importantes

1. **Licença**: Evolution API é open-source, mas requer exibir notificação de uso em sistemas fechados
2. **Limitações**: A API baseada em Baileys pode ter limitações comparada à API oficial do WhatsApp
3. **Produção**: Para produção, considere usar a WhatsApp Cloud API oficial do Meta
4. **Backup**: Faça backup regular do banco de dados

## 🎯 Próximos Passos

Após instalar e configurar a Evolution API:

1. Integre com seu sistema usando os endpoints da API
2. Configure webhooks para receber mensagens
3. Implemente automações e respostas automáticas
4. Configure monitoramento e logs

---

**Dúvidas?** Consulte a documentação oficial ou a comunidade no Discord/GitHub.

