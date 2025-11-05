import { ArrowLeft, Code, Book, Zap, Shield, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const API = () => {
  const navigate = useNavigate();

  const endpoints = [
    {
      method: "POST",
      path: "/api/v1/clients",
      description: "Criar um novo cliente",
      auth: true
    },
    {
      method: "GET",
      path: "/api/v1/clients",
      description: "Listar todos os clientes",
      auth: true
    },
    {
      method: "GET",
      path: "/api/v1/clients/:id",
      description: "Obter detalhes de um cliente",
      auth: true
    },
    {
      method: "PUT",
      path: "/api/v1/clients/:id",
      description: "Atualizar um cliente",
      auth: true
    },
    {
      method: "DELETE",
      path: "/api/v1/clients/:id",
      description: "Deletar um cliente",
      auth: true
    },
    {
      method: "POST",
      path: "/api/v1/whatsapp/send",
      description: "Enviar mensagem via WhatsApp",
      auth: true
    },
    {
      method: "POST",
      path: "/api/v1/ai/chat",
      description: "Processar mensagem com IA",
      auth: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
        </Button>

        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold gradient-text">API BootFlow</h1>
                <p className="text-muted-foreground">Documentação completa da API REST</p>
              </div>
            </div>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Introdução</CardTitle>
              <CardDescription>
                A API BootFlow permite integrar nossa plataforma com seus sistemas existentes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Nossa API RESTful oferece acesso completo às funcionalidades da plataforma BootFlow,
                incluindo gerenciamento de clientes, envio de mensagens WhatsApp, integração com IA
                e muito mais.
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">URL Base da API:</p>
                <code className="text-sm bg-background px-3 py-1 rounded">https://api.bootflow.com/v1</code>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Autenticação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Todas as requisições devem incluir um token de autenticação no header:
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <code className="text-sm">
                  Authorization: Bearer seu_token_aqui
                </code>
              </div>
              <p className="text-sm text-muted-foreground">
                Obtenha seu token de API nas configurações da sua conta.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Endpoints Disponíveis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {endpoints.map((endpoint, index) => (
                  <div
                    key={index}
                    className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            className={
                              endpoint.method === "GET"
                                ? "bg-blue-500"
                                : endpoint.method === "POST"
                                ? "bg-green-500"
                                : endpoint.method === "PUT"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }
                          >
                            {endpoint.method}
                          </Badge>
                          <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                            {endpoint.path}
                          </code>
                          {endpoint.auth && (
                            <Badge variant="outline" className="text-xs">
                              <Shield className="w-3 h-3 mr-1" />
                              Auth
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{endpoint.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Exemplo de Uso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/50 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
{`curl -X POST https://api.bootflow.com/v1/clients \\
  -H "Authorization: Bearer seu_token" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "João Silva",
    "email": "joao@exemplo.com",
    "plan": "Mensal"
  }'`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button onClick={() => navigate('/documentacao')}>
              <Book className="w-4 h-4 mr-2" />
              Ver Documentação Completa
            </Button>
            <Button variant="outline" onClick={() => navigate('/ajuda')}>
              <MessageSquare className="w-4 h-4 mr-2" />
              Precisa de Ajuda?
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default API;

