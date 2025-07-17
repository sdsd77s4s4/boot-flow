import { ArrowLeft, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";

const AIConfiguration = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Brain className="w-6 h-6" /> Configuração de IA
            </h1>
            <p className="text-muted-foreground">Configure chat e voz da IA</p>
          </div>
        </div>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="voiceEnabled">Habilitar Voz</Label>
            <Switch id="voiceEnabled" checked />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="maleVoice">Voz Masculina</Label>
              <Select>
                <SelectTrigger id="maleVoice">
                  <SelectValue placeholder="Selecione...">Roger</SelectValue>
                </SelectTrigger>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="femaleVoice">Voz Feminina</Label>
              <Select>
                <SelectTrigger id="femaleVoice">
                  <SelectValue placeholder="Selecione...">Sarah</SelectValue>
                </SelectTrigger>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="personality">Personalidade</Label>
            <Select>
              <SelectTrigger id="personality">
                <SelectValue placeholder="Selecione...">Suporte Técnico</SelectValue>
              </SelectTrigger>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="autoGreeting">Saudação Automática</Label>
            <Textarea id="autoGreeting" defaultValue="Olá, como posso ajudar você hoje?" />
          </div>
        </div>
        <Button type="submit">Salvar Configurações</Button>
      </div>
    </div>
  );
};

export default AIConfiguration;