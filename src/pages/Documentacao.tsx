import { ArrowLeft, Book, FileText, Video, Code, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Documentacao = () => {
  const navigate = useNavigate();

  const guides = [
    {
      icon: Zap,
      title: "Início Rápido",
      description: "Configure sua conta em minutos",
      category: "Básico"
    },
    {
      icon: Code,
      title: "Integração com API",
      description: "Conecte sua aplicação com nossa API",
      category: "Desenvolvimento"
    },
    {
      icon: FileText,
      title: "Configuração de IA",
      description: "Personalize sua assistente virtual",
      category: "IA"
    },
    {
      icon: Video,
      title: "Campanhas WhatsApp",
      description: "Crie e gerencie campanhas de marketing",
      category: "Marketing"
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
                <Book className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold gradient-text">Documentação</h1>
                <p className="text-muted-foreground">Guia completo para usar a plataforma BootFlow</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="guides" className="mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="guides">Guias</TabsTrigger>
              <TabsTrigger value="api">API</TabsTrigger>
              <TabsTrigger value="tutorials">Tutoriais</TabsTrigger>
            </TabsList>

            <TabsContent value="guides" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {guides.map((guide, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <guide.icon className="w-6 h-6 text-primary" />
                        <CardTitle>{guide.title}</CardTitle>
                      </div>
                      <CardDescription>{guide.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{guide.category}</span>
                        <Button variant="ghost" size="sm">
                          Ler mais →
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="api">
              <Card>
                <CardHeader>
                  <CardTitle>Documentação da API</CardTitle>
                  <CardDescription>
                    Referência completa de todos os endpoints disponíveis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Explore nossa API RESTful completa e integre BootFlow com seus sistemas.
                  </p>
                  <Button onClick={() => navigate('/api')}>
                    <Code className="w-4 h-4 mr-2" />
                    Ver Documentação da API
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tutorials">
              <Card>
                <CardHeader>
                  <CardTitle>Tutoriais em Vídeo</CardTitle>
                  <CardDescription>
                    Aprenda com nossos tutoriais passo a passo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Video className="w-5 h-5 text-primary" />
                        <h4 className="font-semibold">Primeiros Passos</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Aprenda a configurar sua conta e começar a usar a plataforma
                      </p>
                      <Button variant="outline" size="sm">
                        Assistir →
                      </Button>
                    </div>
                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Video className="w-5 h-5 text-primary" />
                        <h4 className="font-semibold">Configurando WhatsApp</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Guia completo para conectar e configurar o WhatsApp
                      </p>
                      <Button variant="outline" size="sm">
                        Assistir →
                      </Button>
                    </div>
                    <div className="border border-border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Video className="w-5 h-5 text-primary" />
                        <h4 className="font-semibold">Criando Campanhas</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Como criar e gerenciar campanhas de marketing eficazes
                      </p>
                      <Button variant="outline" size="sm">
                        Assistir →
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Precisa de mais ajuda?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Nossa equipe está pronta para ajudar você
                </p>
                <div className="flex gap-4 justify-center">
                  <Button variant="outline" onClick={() => navigate('/ajuda')}>
                    Central de Ajuda
                  </Button>
                  <Button onClick={() => window.open('mailto:suporte@bootflow.com', '_blank')}>
                    Enviar Email
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Documentacao;

