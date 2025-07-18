import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Calendar, Plus, Search, Filter, Edit, Trash2, Eye, Copy, Mail, MessageSquare, BarChart3 } from 'lucide-react';

interface Cobranca {
  id: number;
  cliente: string;
  email: string;
  descricao: string;
  valor: number;
  vencimento: string;
  status: 'Pendente' | 'Vencida' | 'Paga';
}

const cobrancasMock: Cobranca[] = [
  { id: 1, cliente: 'Isa 22', email: 'isa22@gmail.com', descricao: 'Renovação Básico - Plano Mensal', valor: 110, vencimento: '26/06/2025', status: 'Vencida' },
  { id: 2, cliente: 'Felipe 27', email: 'felipe27@gmail.com', descricao: 'Cobrança Básico - Mensal', valor: 100, vencimento: '27/06/2025', status: 'Vencida' },
  { id: 3, cliente: 'Rafaela 27', email: 'rafael27@gmail.com', descricao: 'Serviço Básico - Renovação', valor: 100, vencimento: '03/07/2025', status: 'Vencida' },
  { id: 4, cliente: 'Nivea 21 novo', email: 'nivea21@gmail.com', descricao: 'Manutenção Básico - Mensal', valor: 100, vencimento: '05/07/2025', status: 'Vencida' },
  { id: 5, cliente: 'Rafaela 27', email: 'juli27@gmail.com', descricao: 'Upgrade Mensal - Básico', valor: 100, vencimento: '07/07/2025', status: 'Vencida' },
  { id: 6, cliente: 'João filho de Keita 62', email: 'joao62@gmail.com', descricao: 'Renovação Básico - Plano Mensal', valor: 110, vencimento: '10/07/2025', status: 'Vencida' },
  { id: 7, cliente: 'Diógenes 27', email: 'diogenes27@gmail.com', descricao: 'Cobrança Básico - Mensal', valor: 100, vencimento: '10/07/2025', status: 'Vencida' },
  { id: 8, cliente: 'Islaine 27 amiga de Janaina', email: 'islaine27@gmail.com', descricao: 'Serviço Básico - Renovação', valor: 100, vencimento: '15/07/2025', status: 'Pendente' },
  { id: 9, cliente: 'Tobias 27', email: 'tobias27@gmail.com', descricao: 'Manutenção Básico - Mensal', valor: 100, vencimento: '15/07/2025', status: 'Pendente' },
  { id: 10, cliente: 'Céber 11 novo', email: 'ceber11@gmail.com', descricao: 'Upgrade Mensal - Básico', valor: 100, vencimento: '17/07/2025', status: 'Pendente' },
  { id: 11, cliente: 'Gustavo taxista', email: 'gustavo27@gmail.com', descricao: 'Renovação Básico - Mensal', valor: 100, vencimento: '20/07/2025', status: 'Pendente' },
  { id: 12, cliente: 'Amanda 27', email: 'amanda27@gmail.com', descricao: 'Serviço Básico - Renovação', valor: 100, vencimento: '20/07/2025', status: 'Pendente' },
  { id: 13, cliente: 'Michel 27', email: 'michel27@gmail.com', descricao: 'Serviço Básico - Renovação', valor: 100, vencimento: '25/07/2025', status: 'Pendente' },
  { id: 14, cliente: 'Rene 27', email: 'rene27@gmail.com', descricao: 'Manutenção Básico - Mensal', valor: 100, vencimento: '29/07/2025', status: 'Pendente' },
  { id: 15, cliente: 'Eduardo 11 novo 2', email: 'eduardo11@gmail.com', descricao: 'Upgrade Mensal - Básico', valor: 100, vencimento: '05/08/2025', status: 'Pendente' },
  { id: 16, cliente: 'Kelia 27', email: 'kelia27@gmail.com', descricao: 'Renovação Básico - Plano Mensal', valor: 100, vencimento: '25/12/2026', status: 'Pendente' },
  { id: 17, cliente: 'Valdeno 27', email: 'valdeno27@gmail.com', descricao: 'Cobrança Básico - Anual', valor: 90, vencimento: '25/06/2026', status: 'Pendente' },
];

export default function AdminCobrancas() {
  const [cobrancas, setCobrancas] = useState<Cobranca[]>(cobrancasMock);
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<string | null>(null);
  const [modalNova, setModalNova] = useState(false);

  const total = cobrancas.length;
  const pagas = cobrancas.filter(c => c.status === 'Paga').length;
  const pendentes = cobrancas.filter(c => c.status === 'Pendente').length;
  const vencidas = cobrancas.filter(c => c.status === 'Vencida').length;
  const receitaMes = 0;

  const vencendo = cobrancas.filter(c => c.status === 'Pendente').slice(0,2); // Exemplo

  const filtradas = cobrancas.filter(c => {
    const buscaLower = busca.toLowerCase();
    const matchBusca = c.cliente.toLowerCase().includes(buscaLower) || c.email.toLowerCase().includes(buscaLower) || c.descricao.toLowerCase().includes(buscaLower);
    const matchStatus = !filtroStatus || c.status === filtroStatus;
    return matchBusca && matchStatus;
  });

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-[#181e29] via-[#232a36] to-[#181e29]">
      <div className="flex items-center gap-3 mb-2">
        <BarChart3 className="w-7 h-7 text-purple-400" />
        <h1 className="text-3xl font-bold text-white">Cobranças</h1>
      </div>
      <p className="text-gray-400 mb-6">Gerencie todas as suas cobranças e faturamento</p>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <Card className="bg-[#232a36] border border-purple-700/40">
          <CardHeader>
            <CardTitle className="text-sm text-gray-300">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{total}</div>
          </CardContent>
        </Card>
        <Card className="bg-[#232a36] border border-green-700/40">
          <CardHeader>
            <CardTitle className="text-sm text-gray-300">Pagas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{pagas}</div>
          </CardContent>
        </Card>
        <Card className="bg-[#232a36] border border-yellow-700/40">
          <CardHeader>
            <CardTitle className="text-sm text-gray-300">Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">{pendentes}</div>
          </CardContent>
        </Card>
        <Card className="bg-[#232a36] border border-red-700/40">
          <CardHeader>
            <CardTitle className="text-sm text-gray-300">Vencidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">{vencidas}</div>
          </CardContent>
        </Card>
        <Card className="bg-[#232a36] border border-blue-700/40">
          <CardHeader>
            <CardTitle className="text-sm text-gray-300">Receita Mês</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">R$ {receitaMes.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>
      {/* Alertas */}
      <div className="mb-4">
        {vencidas > 0 && (
          <div className="bg-red-900/80 text-red-200 rounded-lg px-4 py-3 mb-2 font-semibold">
            <span className="mr-2">⚠️</span> Você tem {vencidas} cobrança(s) vencida(s) totalizando R$ 300,00
          </div>
        )}
        {vencendo.length > 0 && (
          <div className="bg-yellow-900/80 text-yellow-200 rounded-lg px-4 py-3 font-semibold">
            <span className="mr-2">⏰</span> Você tem {vencendo.length} cobrança(s) vencendo nos próximos 7 dias
          </div>
        )}
      </div>
      {/* Filtros e busca */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
        <div className="flex-1 flex items-center bg-[#232a36] rounded-lg px-3">
          <Search className="w-5 h-5 text-gray-400 mr-2" />
          <Input
            placeholder="Buscar por cliente, descrição ou email..."
            className="bg-transparent border-none text-white focus:ring-0"
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />
        </div>
        <select
          className="bg-[#232a36] border border-gray-700 text-gray-300 rounded px-3 py-2"
          value={filtroStatus || ''}
          onChange={e => setFiltroStatus(e.target.value || null)}
        >
          <option value="">Todos</option>
          <option value="Pendente">Pendentes</option>
          <option value="Vencida">Vencidas</option>
          <option value="Paga">Pagas</option>
        </select>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setModalNova(true)}>
          <Plus className="w-4 h-4 mr-2" /> Nova Cobrança
        </Button>
      </div>
      {/* Tabela de cobranças */}
      <Card className="bg-[#232a36] border border-purple-700/40">
        <CardHeader>
          <CardTitle className="text-white text-lg">Lista de Cobranças ({filtradas.length})</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtradas.map(c => (
                <TableRow key={c.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        {c.cliente.split(' ').map(n => n[0]).join('').slice(0,2)}
                      </div>
                      <div>
                        <div className="font-semibold text-white">{c.cliente}</div>
                        <div className="text-xs text-gray-400">{c.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">{c.descricao}</TableCell>
                  <TableCell className="font-bold text-white">R$ {c.valor.toFixed(2)}</TableCell>
                  <TableCell className="text-gray-300">{c.vencimento}</TableCell>
                  <TableCell>
                    {c.status === 'Vencida' && <Badge className="bg-red-700 text-red-200">Vencida</Badge>}
                    {c.status === 'Pendente' && <Badge className="bg-yellow-700 text-yellow-200">Pendente</Badge>}
                    {c.status === 'Paga' && <Badge className="bg-green-700 text-green-200">Paga</Badge>}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="icon" variant="ghost"><Eye className="w-4 h-4 text-blue-400" /></Button>
                      <Button size="icon" variant="ghost"><Copy className="w-4 h-4 text-purple-400" /></Button>
                      <Button size="icon" variant="ghost"><Mail className="w-4 h-4 text-green-400" /></Button>
                      <Button size="icon" variant="ghost"><MessageSquare className="w-4 h-4 text-blue-400" /></Button>
                      <Button size="icon" variant="ghost"><Edit className="w-4 h-4 text-yellow-400" /></Button>
                      <Button size="icon" variant="ghost"><Trash2 className="w-4 h-4 text-red-400" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {/* Modal Nova Cobrança */}
      <Dialog open={modalNova} onOpenChange={setModalNova}>
        <DialogContent className="bg-[#232a36] border border-purple-700 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle>Nova Cobrança</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <Input placeholder="Cliente" className="bg-gray-900 border border-gray-700 text-white" />
            <Input placeholder="E-mail" className="bg-gray-900 border border-gray-700 text-white" />
            <Input placeholder="Descrição" className="bg-gray-900 border border-gray-700 text-white" />
            <Input placeholder="Valor" className="bg-gray-900 border border-gray-700 text-white" type="number" />
            <Input placeholder="Vencimento" className="bg-gray-900 border border-gray-700 text-white" type="date" />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalNova(false)} className="bg-gray-700 text-white">Cancelar</Button>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 