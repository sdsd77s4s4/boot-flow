import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  Bot, 
  Phone, 
  MessageSquare, 
  Zap, 
  Heart, 
  Star, 
  Shield, 
  TrendingUp,
  Play,
  Check,
  ArrowRight,
  ArrowUp,
  Sparkles,
  Users,
  PhoneCall,
  Clock,
  BarChart3,
  Link,
  Mail,
  CreditCard,
  FileText,
  DollarSign,
  ShoppingCart,
  Download,
  Crown,
  Headphones,
  ArrowRightCircle,
  BarChart
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const [email, setEmail] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const navigate = useNavigate();

  // Efeito para mostrar/ocultar o botão de voltar ao topo
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const features = [
    {
      icon: Bot,
      title: "IA Emocional Avançada",
      description: "Agentes de voz com emoções realistas que se adaptam ao contexto da conversa",
      gradient: "from-primary to-primary-glow"
    },
    {
      icon: MessageSquare,
      title: "WhatsApp Automatizado",
      description: "Integração nativa com WhatsApp para campanhas e atendimento 24/7",
      gradient: "from-secondary to-secondary-glow"
    },
    {
      icon: Zap,
      title: "Automação Inteligente",
      description: "Fluxos condicionais que respondem a palavras-chave e comportamentos",
      gradient: "from-accent to-accent-glow"
    },
    {
      icon: TrendingUp,
      title: "Analytics Avançado",
      description: "Relatórios detalhados de conversões, engajamento e performance das campanhas",
      gradient: "from-primary to-secondary"
    }
  ];

  const testimonials = [
    {
      name: "Carlos Oliveira",
      company: "TechSales Pro",
      avatar: "CO",
      rating: 5,
      text: "O BootFlow revolucionou nosso atendimento! 300% de aumento nas conversões com IA emocional."
    },
    {
      name: "Marina Silva",
      company: "Digital Marketing Co",
      avatar: "MS", 
      rating: 5,
      text: "Automatizamos todo o WhatsApp da empresa. Economia de 80% no tempo de resposta!"
    },
    {
      name: "Roberto Santos",
      company: "E-commerce Plus",
      avatar: "RS",
      rating: 5,
      text: "A voz emocional da IA é incrível! Clientes nem percebem que não é humano."
    }
  ];

  const plans = [
    {
      name: "Essencial",
      price: "R$ 0",
      period: "/mês",
      description: "Para quem está começando e quer organizar o jogo",
      clients: "5 clientes",
      features: [
        { text: "5 clientes", icon: Users },
        { text: "Gestor Bot", icon: Bot },
        { text: "Link WhatsApp", icon: Link },
        { text: "WhatsAPI própria (envios ilimitados)", icon: MessageSquare },
        { text: "Campanhas WhatsApp", icon: Zap },
        { text: "Envio de e-mail", icon: Mail },
        { text: "Emite cobranças", icon: FileText },
        { text: "Link de pagamento", icon: CreditCard },
        { text: "Financeiro completo", icon: DollarSign },
        { text: "Faturas de clientes", icon: FileText },
        { text: "Área do cliente", icon: Users },
        { text: "Exportar dados financeiros", icon: Download },
        { text: "Integração Mercado Pago", icon: ShoppingCart },
        { text: "Envio de produtos digitais", icon: ArrowRightCircle }
      ],
      popular: false,
      highlight: "Entrada perfeita para testar e já faturar. Zero desculpa."
    },
    {
      name: "Profissional",
      price: "R$ 29,90",
      period: "/mês",
      description: "Para quem já tem fluxo e precisa escalar com estrutura",
      clients: "50 clientes",
      features: [
        { text: "50 clientes", icon: Users },
        { text: "Tudo do Essencial", icon: Check },
        { text: "Prioridade no suporte", icon: Headphones }
      ],
      popular: true,
      highlight: "Ideal para pequenos negócios começarem a automatizar pra valer."
    },
    {
      name: "Business",
      price: "R$ 39,90",
      period: "/mês",
      description: "Para quem está crescendo firme e quer automação séria",
      clients: "100 clientes",
      features: [
        { text: "100 clientes", icon: Users },
        { text: "Tudo do Profissional", icon: Check },
        { text: "Recursos avançados de automação", icon: BarChart }
      ],
      popular: false,
      highlight: "Aqui você começa a rodar como empresa de verdade."
    },
    {
      name: "Elite",
      price: "R$ 59,90",
      period: "/mês",
      description: "Para quem quer jogar no nível alto e dominar o mercado",
      clients: "1.000 clientes",
      features: [
        { text: "1.000 clientes", icon: Users },
        { text: "Tudo do Business", icon: Check },
        { text: "Suporte VIP", icon: Crown },
        { text: "Migração assistida", icon: ArrowRightCircle },
        { text: "Auditoria rápida do funil", icon: BarChart }
      ],
      popular: false,
      highlight: "Esse é para quem pensa grande e não aceita travar o crescimento."
    }
  ];

  const stats = [
    { icon: Users, value: "10.000+", label: "Clientes Ativos" },
    { icon: PhoneCall, value: "2M+", label: "Chamadas Processadas" },
    { icon: Clock, value: "24/7", label: "Disponibilidade" },
    { icon: BarChart3, value: "350%", label: "Aumento Médio em Vendas" }
  ];

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Header */}
      <header className="border-b border-border/20 backdrop-blur-xl bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold gradient-text">BootFlow</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Funcionalidades
              </a>
              <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">
                Depoimentos
              </a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Preços
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button variant="ghost" onClick={() => navigate('/login')}>
                Entrar
              </Button>
              <Button variant="hero" onClick={() => navigate('/cadastro')}>
                Teste Grátis
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="container mx-auto relative z-10">
          <Badge variant="neon" className="mb-6 animate-pulse-glow">
            <Sparkles className="w-3 h-3 mr-1" />
            Nova Tecnologia de IA Emocional
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text leading-tight">
            Automatize Tudo<br />
            com <span className="text-primary">BootFlow</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            A primeira plataforma de IA emocional do Brasil para atendimento e vendas automatizadas. 
            Revolucione seu WhatsApp com agentes de voz que conversam como humanos.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="hero" size="xl" onClick={() => navigate('/dashboard')}>
              <Play className="w-5 h-5 mr-2" />
              Começar Agora - Grátis
            </Button>
            <Button variant="glass" size="xl">
              <Phone className="w-5 h-5 mr-2" />
              Ver Demo em Ação
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <Card key={index} className="glass border-border/20 hover:border-primary/20 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge variant="glass" className="mb-4">
              Funcionalidades
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Tecnologia que Impressiona
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Recursos avançados de IA que transformam a forma como você se comunica com seus clientes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="glass border-border/20 hover:border-primary/20 transition-all duration-300 group hover-scale">
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:shadow-glow transition-all duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge variant="glass" className="mb-4">
              Depoimentos
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Clientes Satisfeitos
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Veja o que nossos clientes estão dizendo sobre os resultados obtidos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass border-border/20 hover:border-primary/20 transition-all duration-300 hover-scale">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.company}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge variant="glass" className="mb-4">
              Preços
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Estilo Premium Corporativo
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Vamos montar sua tabela e deixar ela tinindo pra vender
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`glass border-border/20 hover:border-primary/20 transition-all duration-300 relative flex flex-col overflow-hidden group ${plan.popular ? 'ring-2 ring-primary shadow-glow lg:scale-105' : ''} ${plan.price === "R$ 0" ? 'border-green-500/30' : ''}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-purple-500 to-primary"></div>
                )}
                {plan.price === "R$ 0" && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-green-500 to-green-400"></div>
                )}
                {plan.popular && (
                  <Badge variant="neon" className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10 animate-pulse-glow shadow-lg text-xs">
                    ⭐ Mais Popular
                  </Badge>
                )}
                {plan.price === "R$ 0" && (
                  <Badge className="absolute -top-3 right-4 bg-green-500 hover:bg-green-600 text-white z-10 shadow-lg font-bold text-xs px-2 py-0.5">
                    GRÁTIS
                  </Badge>
                )}
                <CardHeader className="text-center pb-3 border-b border-border/20 relative px-3 pt-5">
                  <CardTitle className="text-lg font-bold mb-1">{plan.name}</CardTitle>
                  <CardDescription className="text-xs mb-2 min-h-[28px] leading-tight">{plan.description}</CardDescription>
                  <div className="mb-2">
                    <div className="text-2xl font-bold gradient-text mb-1">
                      {plan.price}
                      <span className="text-sm text-muted-foreground">{plan.period}</span>
                    </div>
                    <div className="text-xs text-primary font-semibold mt-1 bg-primary/10 rounded-full px-2 py-0.5 inline-block">
                      {plan.clients}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col pt-3 px-3 pb-3">
                  <div className="space-y-1.5 mb-3 flex-1">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start space-x-2 group-hover:translate-x-0.5 transition-transform">
                        <Check className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-xs leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border/20 pt-2 mb-2 bg-muted/30 rounded-lg p-1.5">
                    <p className="text-xs text-muted-foreground italic text-center leading-relaxed">
                      "{plan.highlight}"
                    </p>
                  </div>
                  <Button 
                    variant={plan.popular ? "hero" : plan.price === "R$ 0" ? "default" : "glass"} 
                    className={`w-full font-semibold text-xs h-8 transition-all duration-300 ${plan.popular ? 'hover:scale-105 shadow-lg' : ''}`}
                    onClick={() => navigate('/cadastro')}
                  >
                    {plan.price === "R$ 0" ? "Começar Grátis" : "Assinar Agora"}
                    <ArrowRight className="w-3 h-3 ml-1.5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-hero">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Pronto para Revolucionar seu Atendimento?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Comece gratuitamente hoje e veja como a IA emocional pode transformar seus resultados
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Seu melhor email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 backdrop-blur-xl"
            />
            <Button variant="secondary" size="lg" onClick={() => navigate('/dashboard')}>
              Teste Grátis
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          <p className="text-sm text-white/60 mt-4">
            🔒 Sem cartão de crédito • 🚀 Setup em 2 minutos • ⭐ Suporte brasileiro
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/20 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">BootFlow</span>
              </div>
              <p className="text-muted-foreground mb-4">
                A plataforma de IA emocional que revoluciona a comunicação empresarial no Brasil.
              </p>
              <div className="flex space-x-2">
                <Badge variant="glass">IA Emocional</Badge>
                <Badge variant="glass">WhatsApp</Badge>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a 
                    href="#features" 
                    className="hover:text-foreground transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Funcionalidades
                  </a>
                </li>
                <li>
                  <a 
                    href="#pricing" 
                    className="hover:text-foreground transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Preços
                  </a>
                </li>
                <li>
                  <a 
                    href="/api" 
                    className="hover:text-foreground transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/api');
                    }}
                  >
                    API
                  </a>
                </li>
                <li>
                  <a 
                    href="/integracoes" 
                    className="hover:text-foreground transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/integracoes');
                    }}
                  >
                    Integrações
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a 
                    href="/ajuda" 
                    className="hover:text-foreground transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/ajuda');
                    }}
                  >
                    Central de Ajuda
                  </a>
                </li>
                <li>
                  <a 
                    href="/documentacao" 
                    className="hover:text-foreground transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/documentacao');
                    }}
                  >
                    Documentação
                  </a>
                </li>
                <li>
                  <a 
                    href="https://wa.me/5511999999999" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:suporte@bootflow.com" 
                    className="hover:text-foreground transition-colors"
                  >
                    Email
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a 
                    href="/empresa/sobre" 
                    className="hover:text-foreground transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/empresa/sobre');
                    }}
                  >
                    Sobre
                  </a>
                </li>
                <li>
                  <a 
                    href="/empresa/blog" 
                    className="hover:text-foreground transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/empresa/blog');
                    }}
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a 
                    href="/privacidade" 
                    className="hover:text-foreground transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/privacidade');
                    }}
                  >
                    Privacidade
                  </a>
                </li>
                <li>
                  <a 
                    href="/termos" 
                    className="hover:text-foreground transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/termos');
                    }}
                  >
                    Termos
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/20 mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 BootFlow. Todos os direitos reservados. Feito com ❤️ no Brasil.</p>
          </div>
        </div>
      </footer>

      {/* Botão Voltar ao Topo */}
      {showScrollButton && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground dark:bg-[#7e22ce] dark:text-white shadow-lg hover:bg-primary/90 dark:hover:bg-[#6d1bb7] transition-all duration-300 flex items-center gap-2 z-50 px-6 py-3"
          aria-label="Voltar ao topo"
        >
          <ArrowUp className="w-5 h-5" />
          Voltar ao Topo
        </Button>
      )}
    </div>
  );
};

export default Landing;
