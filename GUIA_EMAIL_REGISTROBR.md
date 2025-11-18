# 📧 Guia Completo: Email Profissional no Registro.br

Este guia vai te ajudar a configurar email profissional usando o serviço gratuito do Registro.br.

---

## 📋 PRÉ-REQUISITOS

1. ✅ Domínio .br registrado no Registro.br
2. ✅ Acesso ao painel do Registro.br
3. ✅ Domínio ativo e pago

---

## 🚀 PASSO A PASSO COMPLETO

### Passo 1: Acessar o Painel do Registro.br

1. Acesse: https://registro.br
2. Faça login com suas credenciais
3. No menu lateral, clique em **Email**

### Passo 2: Ativar o Serviço de Email

1. Na página de Email, você verá seu domínio listado
2. Clique em **Ativar Email** (se ainda não estiver ativado)
3. Leia e aceite os termos de uso
4. Aguarde a ativação (pode levar alguns minutos)

### Passo 3: Criar Contas de Email

**Limitações do serviço gratuito:**
- ✅ Até **3 contas de email** por domínio
- ✅ **1GB de armazenamento** por conta
- ✅ Apenas **webmail** (não tem app desktop)
- ✅ Suporte a **IMAP e POP3**

**Como criar:**

1. Na página de Email, clique em **Criar Conta**
2. Preencha os dados:
   - **Nome da conta:** (ex: `contato`, `suporte`, `vendas`)
   - **Email completo:** `contato@seu-dominio.com.br`
   - **Senha:** (mínimo 8 caracteres, use letras, números e símbolos)
   - **Confirmar senha:**
3. Clique em **Criar**
4. Repita para criar até 3 contas

**Exemplos de contas úteis:**
- `contato@bootflow.com.br`
- `suporte@bootflow.com.br`
- `vendas@bootflow.com.br`

### Passo 4: Configurar Registros DNS (Automático)

**Boa notícia:** O Registro.br configura automaticamente os registros DNS necessários!

Mas se precisar verificar ou configurar manualmente:

1. Vá em **DNS** → **Zona DNS**
2. Selecione seu domínio
3. Verifique se existem estes registros:

**Registros MX (já devem estar configurados automaticamente):**
```
Tipo: MX
Prioridade: 10
Nome: @
Valor: mx.registro.br
```

**Registro TXT (SPF - para evitar spam):**
```
Tipo: TXT
Nome: @
Valor: v=spf1 include:registro.br ~all
```

Se não existirem, adicione manualmente.

### Passo 5: Acessar o Webmail

1. Acesse: https://webmail.registro.br
2. Digite seu email completo: `contato@seu-dominio.com.br`
3. Digite sua senha
4. Clique em **Entrar**

**Ou acesse diretamente pelo painel:**
1. No Registro.br, vá em **Email**
2. Clique no email desejado
3. Clique em **Acessar Webmail**

---

## 📱 CONFIGURAR NO APLICATIVO (Mobile/Desktop)

### Android (Gmail App)

1. Abra o app **Gmail**
2. Toque no menu (3 linhas no canto superior esquerdo)
3. Toque em **Adicionar conta**
4. Escolha **Outro** (não escolha Google)
5. Digite seu email: `contato@seu-dominio.com.br`
6. Digite sua senha
7. Escolha **IMAP**
8. Configure:
   - **Servidor de entrada (IMAP):** `imap.registro.br`
   - **Porta:** `993`
   - **Tipo de segurança:** SSL/TLS
   - **Servidor de saída (SMTP):** `smtp.registro.br`
   - **Porta:** `587`
   - **Tipo de segurança:** TLS
9. Toque em **Próximo**
10. Aguarde a sincronização

### iPhone/iPad (App Mail)

1. Vá em **Configurações** → **Mail** → **Contas**
2. Toque em **Adicionar Conta**
3. Escolha **Outro**
4. Toque em **Adicionar Conta de Email**
5. Preencha:
   - **Nome:** Seu nome
   - **Email:** `contato@seu-dominio.com.br`
   - **Senha:** Sua senha
   - **Descrição:** Email Profissional
6. Toque em **Próximo**
7. Configure:
   - **Servidor de entrada (IMAP):** `imap.registro.br`
   - **Porta:** `993`
   - **Servidor de saída (SMTP):** `smtp.registro.br`
   - **Porta:** `587`
8. Toque em **Salvar**

### Outlook (Windows/Mac)

1. Abra o Outlook
2. Vá em **Arquivo** → **Adicionar Conta**
3. Digite seu email: `contato@seu-dominio.com.br`
4. Clique em **Configuração Avançada**
5. Escolha **IMAP**
6. Configure:
   - **Servidor de entrada:** `imap.registro.br`
   - **Porta:** `993`
   - **Criptografia:** SSL/TLS
   - **Servidor de saída:** `smtp.registro.br`
   - **Porta:** `587`
   - **Criptografia:** STARTTLS
   - **Autenticação:** Senha normal
7. Clique em **Conectar**

### Thunderbird

1. Abra o Thunderbird
2. Vá em **Ferramentas** → **Configurações de Conta**
3. Clique em **Adicionar Conta de Email**
4. Preencha:
   - **Nome:** Seu nome
   - **Email:** `contato@seu-dominio.com.br`
   - **Senha:** Sua senha
5. Clique em **Continuar**
6. Configure:
   - **Servidor IMAP:** `imap.registro.br`
   - **Porta:** `993`
   - **SSL/TLS:** Ativado
   - **Servidor SMTP:** `smtp.registro.br`
   - **Porta:** `587`
   - **STARTTLS:** Ativado
7. Clique em **Concluído**

---

## ⚙️ CONFIGURAÇÕES TÉCNICAS COMPLETAS

### Servidores de Email

**IMAP (Recomendado - Sincroniza em todos os dispositivos):**
```
Servidor: imap.registro.br
Porta: 993
Criptografia: SSL/TLS
Usuário: seu-email@seu-dominio.com.br
Senha: sua-senha
```

**POP3 (Baixa emails para o dispositivo):**
```
Servidor: pop.registro.br
Porta: 995
Criptografia: SSL/TLS
Usuário: seu-email@seu-dominio.com.br
Senha: sua-senha
```

**SMTP (Envio de emails):**
```
Servidor: smtp.registro.br
Porta: 587
Criptografia: STARTTLS
Autenticação: Sim
Usuário: seu-email@seu-dominio.com.br
Senha: sua-senha
```

### Webmail

**URL de acesso:**
- https://webmail.registro.br

**Ou pelo painel:**
- Registro.br → Email → Acessar Webmail

---

## 🔧 GERENCIAR CONTAS

### Alterar Senha

1. No Registro.br, vá em **Email**
2. Clique na conta desejada
3. Clique em **Alterar Senha**
4. Digite a nova senha
5. Confirme
6. Clique em **Salvar**

### Excluir Conta

1. No Registro.br, vá em **Email**
2. Clique na conta desejada
3. Clique em **Excluir Conta**
4. Confirme a exclusão

**⚠️ Atenção:** Todos os emails da conta serão perdidos!

### Redefinir Senha (Esqueci a Senha)

1. Acesse: https://webmail.registro.br
2. Clique em **Esqueci minha senha**
3. Digite seu email completo
4. Siga as instruções enviadas por email

---

## 📊 LIMITAÇÕES E RECURSOS

### ✅ O que está incluído (GRATUITO):

- ✅ Até 3 contas de email por domínio
- ✅ 1GB de armazenamento por conta
- ✅ Webmail completo
- ✅ Suporte a IMAP e POP3
- ✅ Filtros de spam
- ✅ Antivírus
- ✅ Suporte a múltiplos dispositivos
- ✅ Configuração automática de DNS

### ⚠️ Limitações:

- ⚠️ Apenas 3 contas por domínio
- ⚠️ 1GB por conta (pode ser pouco para uso intenso)
- ⚠️ Apenas webmail (não tem app desktop oficial)
- ⚠️ Sem suporte técnico prioritário
- ⚠️ Sem integração com Google Workspace/Microsoft 365

### 💡 Quando considerar upgrade:

Se você precisa de:
- Mais de 3 contas → Considere Google Workspace ou Zoho
- Mais armazenamento → Considere Google Workspace (30GB)
- App desktop oficial → Considere Google Workspace ou Microsoft 365
- Suporte prioritário → Considere Google Workspace

---

## 🐛 TROUBLESHOOTING

### Email não está chegando

**Solução:**
1. Verifique se os registros MX estão corretos no DNS
2. Verifique a pasta de spam no webmail
3. Aguarde até 24 horas para propagação completa
4. Teste enviando um email para você mesmo

### Não consigo fazer login no webmail

**Solução:**
1. Verifique se o email está digitado corretamente
2. Verifique se a senha está correta (case-sensitive)
3. Tente redefinir a senha
4. Limpe o cache do navegador
5. Tente em outro navegador

### App não conecta (IMAP/SMTP)

**Solução:**
1. Verifique se os servidores estão corretos:
   - IMAP: `imap.registro.br`
   - SMTP: `smtp.registro.br`
2. Verifique as portas:
   - IMAP: `993` (SSL)
   - SMTP: `587` (TLS)
3. Verifique se a autenticação está ativada
4. Verifique se o email e senha estão corretos
5. Desative firewall/antivírus temporariamente para testar

### Emails indo para spam

**Solução:**
1. Configure o registro SPF no DNS:
   ```
   Tipo: TXT
   Nome: @
   Valor: v=spf1 include:registro.br ~all
   ```
2. Peça aos destinatários para adicionar seu email aos contatos
3. Evite palavras que parecem spam no assunto/corpo

### Limite de armazenamento atingido

**Solução:**
1. Delete emails antigos
2. Delete anexos grandes
3. Limpe a lixeira
4. Considere fazer backup dos emails importantes
5. Considere upgrade para Google Workspace (30GB)

---

## 📋 CHECKLIST FINAL

### Configuração Inicial
- [ ] Domínio .br registrado e ativo
- [ ] Serviço de email ativado no Registro.br
- [ ] Pelo menos 1 conta de email criada
- [ ] Senha segura configurada
- [ ] Webmail acessível e funcionando

### Configuração DNS
- [ ] Registros MX configurados (automático)
- [ ] Registro SPF configurado (opcional, mas recomendado)
- [ ] Aguardado propagação DNS (1-24 horas)

### Testes
- [ ] Enviar email de teste para você mesmo
- [ ] Receber email de teste
- [ ] Verificar se não está indo para spam
- [ ] Testar no webmail
- [ ] Testar no app mobile/desktop

### Uso Diário
- [ ] Configurado no app preferido
- [ ] Assinatura de email configurada
- [ ] Contatos importantes adicionados
- [ ] Filtros de email configurados (se necessário)

---

## 💡 DICAS PRO ÚTIL

### 1. Use Assinatura Profissional

Configure uma assinatura no webmail ou app:
```
---
[Nome Completo]
[Cargo] | BootFlow
Email: contato@bootflow.com.br
Telefone: (27) 99958-7725
Site: https://bootflow.com.br
```

### 2. Organize com Pastas

Crie pastas no webmail para organizar:
- 📁 Recebidos
- 📁 Enviados
- 📁 Importantes
- 📁 Projetos
- 📁 Arquivos

### 3. Configure Filtros

No webmail, configure filtros para:
- Marcar emails importantes automaticamente
- Mover emails para pastas específicas
- Deletar spam automaticamente

### 4. Faça Backup Regular

- Exporte emails importantes periodicamente
- Use IMAP para manter cópias em todos os dispositivos
- Considere fazer backup antes de deletar emails antigos

### 5. Use Senhas Fortes

- Mínimo 12 caracteres
- Letras maiúsculas e minúsculas
- Números e símbolos
- Não use palavras do dicionário
- Use um gerenciador de senhas

---

## 📚 RECURSOS ÚTEIS

### Links Importantes
- **Webmail:** https://webmail.registro.br
- **Painel Registro.br:** https://registro.br
- **Suporte Registro.br:** https://registro.br/atendimento/
- **Central de Ajuda:** https://registro.br/atendimento/central-de-ajuda/

### Documentação
- [Guia de Email do Registro.br](https://registro.br/email/)
- [Configuração IMAP/POP3](https://registro.br/email/configuracao/)

---

## ✅ PRÓXIMOS PASSOS

1. **Criar suas contas de email:**
   - `contato@bootflow.com.br`
   - `suporte@bootflow.com.br`
   - `vendas@bootflow.com.br` (ou outra)

2. **Configurar no app:**
   - Configure no seu celular (Gmail/Apple Mail)
   - Configure no computador (Outlook/Thunderbird)

3. **Atualizar o site:**
   - Substitua emails genéricos por profissionais
   - Exemplo: No HelpCenter, troque `suporte@exemplo.com` por `suporte@bootflow.com.br`

4. **Testar:**
   - Envie emails de teste
   - Verifique se está recebendo
   - Teste em diferentes dispositivos

---

**Pronto!** Agora você tem email profissional configurado! 🎉

Se precisar de mais ajuda, consulte a central de ajuda do Registro.br ou entre em contato com o suporte.

