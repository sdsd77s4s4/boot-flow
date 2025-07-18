import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { CheckCircle, MessageSquare, Clock, FileText, Zap, Settings, Trash2, Edit, Plus, Eye, Download, Upload, Users, Check, XCircle } from 'lucide-react';

const templatesMock = [
  {
    id: 1,
    title: 'Confirmação de Agendamento',
    status: 'Ativo',
    tag: 'confirmação',
    content: 'Olá {{nome}}, seu agendamento para {{servico}} foi confirmado para {{data}} às {{hora}}. Aguardamos você! 📅',
    sent: 445,
    delivery: 96.8,
    variables: 3,
    read: true
  },
  {
    id: 2,
    title: 'Lembrete de Agendamento',
    status: 'Ativo',
    tag: 'lembrete',
    content: 'Oi {{nome}}! Lembrete: você tem um agendamento amanhã às {{hora}} para {{servico}}. Confirme sua presença! 📲',
    sent: 389,
    delivery: 94.2,
    variables: 3,
    read: true
  },
  {
    id: 3,
    title: 'Cancelamento de Agendamento',
    status: 'Ativo',
    tag: 'cancelamento',
    content: 'Olá {{nome}}, seu agendamento para {{servico}} em {{data}} foi cancelado conforme solicitado. Para reagendar, entre em contato.',
    sent: 67,
    delivery: 95.8,
    variables: 3,
    read: false
  },
  {
    id: 4,
    title: 'Promoção Especial',
    status: 'Inativo',
    tag: 'marketing',
    content: '{{nome}}, temos uma promoção especial para você! {{promocao}} com {{desconto}} de desconto. Válido até {{validade}}. 🎁',
    sent: 234,
    delivery: 95.1,
    variables: 4,
    read: false
  }
];

const AdminWhatsApp: React.FC = () => {
  const [autoReply, setAutoReply] = useState(false);
  const [templates, setTemplates] = useState(templatesMock);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <div>
          <div className="flex items-center space-x-3">
            <MessageSquare className="w-8 h-8 text-green-500" />
            <h1 className="text-3xl font-bold text-green-400">WhatsApp <span className="text-white">Business</span></h1>
          </div>
          <p className="text-gray-400 mt-1">Gerencie integrações, templates e automações do WhatsApp</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-700"><Settings className="w-4 h-4 mr-2" />Configurar</Button>
          <Button className="bg-green-600 hover:bg-green-700"><Plus className="w-4 h-4 mr-2" />Novo Template</Button>
        </div>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-gray-700" style={{ backgroundColor: '#1F2937' }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Mensagens</CardTitle>
            <MessageSquare className="h-5 w-5 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">1.247</div>
          </CardContent>
        </Card>
        <Card className="border-gray-700" style={{ backgroundColor: '#1F2937' }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Taxa de Entrega</CardTitle>
            <CheckCircle className="h-5 w-5 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">95.3%</div>
          </CardContent>
        </Card>
        <Card className="border-gray-700" style={{ backgroundColor: '#1F2937' }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Taxa de Leitura</CardTitle>
            <Eye className="h-5 w-5 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">86.1%</div>
          </CardContent>
        </Card>
        <Card className="border-gray-700" style={{ backgroundColor: '#1F2937' }}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Tempo Médio</CardTitle>
            <Clock className="h-5 w-5 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">2.3min</div>
          </CardContent>
        </Card>
      </div>

      {/* Conteúdo principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna principal: Templates */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-gray-700" style={{ backgroundColor: '#1F2937' }}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-green-400" />
                <CardTitle className="text-white">Templates de Mensagem</CardTitle>
              </div>
              <Button className="bg-green-600 hover:bg-green-700"><Plus className="w-4 h-4 mr-2" />Novo Template</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {templates.map((tpl) => (
                <div key={tpl.id} className="rounded-lg border border-gray-700 p-4 bg-[#232a36]">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-base font-semibold ${tpl.status === 'Ativo' ? 'text-green-400' : 'text-gray-400'}`}>{tpl.title}</span>
                      <Badge className={tpl.status === 'Ativo' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-gray-500/20 text-gray-400 border-gray-500/30'}>{tpl.status}</Badge>
                      <Badge className="bg-gray-700 text-gray-300 border-gray-600">{tpl.tag}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-green-400"><Edit className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                  <div className="text-gray-300 mb-2 text-sm">{tpl.content}</div>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span><MessageSquare className="inline w-4 h-4 mr-1 text-green-400" />{tpl.sent} enviadas</span>
                    <span><CheckCircle className="inline w-4 h-4 mr-1 text-green-400" />{tpl.delivery}% entrega</span>
                    <span><FileText className="inline w-4 h-4 mr-1 text-blue-400" />{tpl.variables} variáveis</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Coluna lateral: Status, Ações, Informações */}
        <div className="space-y-6">
          {/* Status da Conexão */}
          <Card className="border-gray-700" style={{ backgroundColor: '#1F2937' }}>
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2"><Zap className="w-5 h-5 text-green-400" /> Status da Conexão</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">API Status</span>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Conectado</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Webhook</span>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Ativo</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Auto-resposta</span>
                <Switch checked={autoReply} onCheckedChange={setAutoReply} />
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700 mt-2">Testar Conexão</Button>
            </CardContent>
          </Card>

          {/* Ações Rápidas */}
          <Card className="border-gray-700" style={{ backgroundColor: '#1F2937' }}>
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2"><Settings className="w-5 h-5 text-purple-400" /> Ações Rápidas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full border-gray-700 bg-gray-900 text-white hover:bg-gray-800 flex items-center justify-start"><Eye className="w-4 h-4 mr-2 text-blue-400" />Ver Histórico</Button>
              <Button variant="outline" className="w-full border-gray-700 bg-gray-900 text-white hover:bg-gray-800 flex items-center justify-start"><Zap className="w-4 h-4 mr-2 text-green-400" />Configurar Webhook</Button>
              <Button variant="outline" className="w-full border-gray-700 bg-gray-900 text-white hover:bg-gray-800 flex items-center justify-start"><Download className="w-4 h-4 mr-2 text-purple-400" />Exportar Relatórios</Button>
              <Button variant="outline" className="w-full border-gray-700 bg-gray-900 text-white hover:bg-gray-800 flex items-center justify-start"><Upload className="w-4 h-4 mr-2 text-green-400" />Importar Templates</Button>
            </CardContent>
          </Card>

          {/* Informações */}
          <Card className="border-gray-700" style={{ backgroundColor: '#1F2937' }}>
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2"><Users className="w-5 h-5 text-blue-400" /> Informações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center justify-between"><span>Clientes Ativos</span><span className="font-bold text-white">234</span></div>
              <div className="flex items-center justify-between"><span>Templates Ativos</span><span className="font-bold text-white">8</span></div>
              <div className="flex items-center justify-between"><span>Última Sincronização</span><span className="text-gray-400">2min atrás</span></div>
              <div className="flex items-center justify-between"><span>Próximo Backup</span><span className="text-gray-400">23:00</span></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminWhatsApp; 