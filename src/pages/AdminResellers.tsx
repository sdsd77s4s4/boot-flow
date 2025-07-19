import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Search, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Eye, 
  Edit, 
  Trash2,
  UserPlus,
  Mail,
  Phone,
  Calendar,
  User
} from 'lucide-react';
import { toast } from 'sonner';

interface Reseller {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: 'Premium' | 'Standard' | 'Basic';
  commission: number;
  clients: number;
  revenue: number;
  status: 'Ativo' | 'Pendente' | 'Inativo';
  joinedDate?: string;
}

const AdminResellers: React.FC = () => {
  const [resellers, setResellers] = useState<Reseller[]>([
    {
      id: '1',
      name: 'Maria Santos',
      email: 'maria@email.com',
      phone: '(11) 99999-9999',
      plan: 'Premium',
      commission: 15,
      clients: 45,
      revenue: 12500,
      status: 'Ativo',
      joinedDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'Carlos Lima',
      email: 'carlos@email.com',
      phone: '(11) 88888-8888',
      plan: 'Standard',
      commission: 12,
      clients: 32,
      revenue: 8900,
      status: 'Ativo',
      joinedDate: '2024-01-10'
    },
    {
      id: '3',
      name: 'Ana Costa',
      email: 'ana@email.com',
      phone: '(11) 77777-7777',
      plan: 'Premium',
      commission: 18,
      clients: 0,
      revenue: 0,
      status: 'Pendente',
      joinedDate: '2024-01-20'
    },
    {
      id: '4',
      name: 'Pedro Oliveira',
      email: 'pedro@email.com',
      phone: '(11) 66666-6666',
      plan: 'Basic',
      commission: 10,
      clients: 15,
      revenue: 3200,
      status: 'Inativo',
      joinedDate: '2024-01-05'
    },
    {
      id: '5',
      name: 'João Silva',
      email: 'joao@email.com',
      phone: '(11) 55555-5555',
      plan: 'Premium',
      commission: 20,
      clients: 67,
      revenue: 18900,
      status: 'Ativo',
      joinedDate: '2024-01-12'
    },
    {
      id: '6',
      name: 'THIAGO MATTOS',
      email: 'homegrafica@outlook.com',
      phone: '27996912156',
      plan: 'Premium',
      commission: 15,
      clients: 0,
      revenue: 0,
      status: 'Ativo',
      joinedDate: '2024-01-18'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResellers, setFilteredResellers] = useState<Reseller[]>(resellers);
  
  // Estados dos modais
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedReseller, setSelectedReseller] = useState<Reseller | null>(null);
  
  // Estado do formulário de edição/adição
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plan: 'Premium' as 'Premium' | 'Standard' | 'Basic',
    commission: '',
    status: 'Ativo' as 'Ativo' | 'Pendente' | 'Inativo'
  });

  // Calcular métricas
  const totalResellers = resellers.length;
  const activeResellers = resellers.filter(r => r.status === 'Ativo').length;
  const totalRevenue = resellers.reduce((sum, r) => sum + r.revenue, 0);
  const totalClients = resellers.reduce((sum, r) => sum + r.clients, 0);
  const averageCommission = resellers.length > 0 
    ? Math.round(resellers.reduce((sum, r) => sum + r.commission, 0) / resellers.length)
    : 0;

  // Filtrar revendedores baseado na busca
  useEffect(() => {
    const filtered = resellers.filter(reseller =>
      reseller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reseller.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reseller.phone.includes(searchTerm)
    );
    setFilteredResellers(filtered);
  }, [searchTerm, resellers]);

  // Funções de ação
  const handleViewReseller = (reseller: Reseller) => {
    setSelectedReseller(reseller);
    setViewModalOpen(true);
  };

  const handleEditReseller = (reseller: Reseller) => {
    setSelectedReseller(reseller);
    setFormData({
      name: reseller.name,
      email: reseller.email,
      phone: reseller.phone,
      plan: reseller.plan,
      commission: reseller.commission.toString(),
      status: reseller.status
    });
    setEditModalOpen(true);
  };

  const handleAddReseller = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      plan: 'Premium',
      commission: '',
      status: 'Ativo'
    });
    setAddModalOpen(true);
  };

  const handleSaveEdit = () => {
    if (!selectedReseller || !formData.name || !formData.email || !formData.commission) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    setResellers(prev => prev.map(r => 
      r.id === selectedReseller.id ? {
        ...r,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        plan: formData.plan,
        commission: parseFloat(formData.commission),
        status: formData.status
      } : r
    ));
    
    setEditModalOpen(false);
    toast.success(`${formData.name} atualizado com sucesso!`);
  };

  const handleSaveAdd = () => {
    if (!formData.name || !formData.email || !formData.commission) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    const newReseller: Reseller = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      plan: formData.plan,
      commission: parseFloat(formData.commission),
      clients: 0,
      revenue: 0,
      status: formData.status,
      joinedDate: new Date().toISOString().split('T')[0]
    };

    setResellers(prev => [...prev, newReseller]);
    setAddModalOpen(false);
    toast.success(`${formData.name} adicionado com sucesso!`);
  };

  const handleToggleStatus = (reseller: Reseller) => {
    const newStatus = reseller.status === 'Ativo' ? 'Inativo' : 'Ativo';
    setResellers(prev => prev.map(r => 
      r.id === reseller.id ? { ...r, status: newStatus } : r
    ));
    toast.success(`${reseller.name} ${newStatus === 'Ativo' ? 'ativado' : 'desativado'} com sucesso!`);
  };

  const handleDeleteReseller = (reseller: Reseller) => {
    if (confirm(`Tem certeza que deseja excluir ${reseller.name}?`)) {
      setResellers(prev => prev.filter(r => r.id !== reseller.id));
      toast.success(`${reseller.name} excluído com sucesso!`);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo': return 'bg-green-500/20 text-green-600 border-green-500/30';
      case 'Pendente': return 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30';
      case 'Inativo': return 'bg-red-500/20 text-red-600 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-600 border-gray-500/30';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Premium': return 'bg-purple-500/20 text-purple-600 border-purple-500/30';
      case 'Standard': return 'bg-blue-500/20 text-blue-600 border-blue-500/30';
      case 'Basic': return 'bg-gray-500/20 text-gray-600 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-600 border-gray-500/30';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-white">Gerenciamento de Revendas</h1>
          <p className="text-gray-400 mt-1">Gerencie todos os revendedores do sistema</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleAddReseller}>
          <UserPlus className="w-4 h-4 mr-2" />
          + Novo Revendedor
        </Button>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-gray-700" style={{ backgroundColor: '#1F2937' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Total de Revendedores
            </CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalResellers}</div>
            <p className="text-xs text-gray-400">{activeResellers} ativos</p>
          </CardContent>
        </Card>

        <Card className="border-gray-700" style={{ backgroundColor: '#1F2937' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Receita Total
            </CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              R$ {totalRevenue.toLocaleString('pt-BR')}
            </div>
            <p className="text-xs text-gray-400">Gerada pelos revendedores</p>
          </CardContent>
        </Card>

        <Card className="border-gray-700" style={{ backgroundColor: '#1F2937' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Clientes Atendidos
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalClients}</div>
            <p className="text-xs text-gray-400">Total de clientes</p>
          </CardContent>
        </Card>

        <Card className="border-gray-700" style={{ backgroundColor: '#1F2937' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">
              Taxa Média
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{averageCommission}%</div>
            <p className="text-xs text-gray-400">Comissão média</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Revendedores */}
      <Card className="border-gray-700" style={{ backgroundColor: '#1F2937' }}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">Lista de Revendedores</CardTitle>
              <p className="text-sm text-gray-400">
                {filteredResellers.length} revendedores encontrados
              </p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar revendedores..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Revendedor</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Contato</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Plano</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Comissão</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Clientes</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Receita</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredResellers.map((reseller) => (
                  <tr key={reseller.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                    <td className="py-3 px-4">
                      <div className="font-medium text-white">{reseller.name}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sm text-gray-300">{reseller.email}</div>
                      <div className="text-sm text-gray-400">{reseller.phone}</div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getPlanColor(reseller.plan)}>
                        {reseller.plan}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-white">{reseller.commission}%</td>
                    <td className="py-3 px-4 text-white">{reseller.clients}</td>
                    <td className="py-3 px-4 text-white">
                      R$ {reseller.revenue.toLocaleString('pt-BR')}
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(reseller.status)}>
                        {reseller.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewReseller(reseller)}
                          className="text-gray-400 hover:text-white"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditReseller(reseller)}
                          className="text-gray-400 hover:text-white"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleStatus(reseller)}
                          className={`text-sm ${
                            reseller.status === 'Ativo' 
                              ? 'text-red-400 hover:text-red-300' 
                              : 'text-green-400 hover:text-green-300'
                          }`}
                        >
                          {reseller.status === 'Ativo' ? 'Desativar' : 'Ativar'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteReseller(reseller)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal de Visualização */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Detalhes do Revendedor</DialogTitle>
            <DialogDescription className="text-gray-400">
              Informações completas do revendedor
            </DialogDescription>
          </DialogHeader>
          {selectedReseller && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400">Nome</p>
                      <p className="font-medium">{selectedReseller.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="font-medium">{selectedReseller.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400">Telefone</p>
                      <p className="font-medium">{selectedReseller.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-400">Data de Cadastro</p>
                      <p className="font-medium">{selectedReseller.joinedDate}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400">Plano</p>
                    <Badge className={getPlanColor(selectedReseller.plan)}>
                      {selectedReseller.plan}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Comissão</p>
                    <p className="font-medium text-lg">{selectedReseller.commission}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Status</p>
                    <Badge className={getStatusColor(selectedReseller.status)}>
                      {selectedReseller.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Clientes Atendidos</p>
                    <p className="font-medium text-lg">{selectedReseller.clients}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Receita Gerada</p>
                    <p className="font-medium text-lg text-green-400">
                      R$ {selectedReseller.revenue.toLocaleString('pt-BR')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewModalOpen(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Edição */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="bg-[#1f2937] text-white max-w-4xl w-full p-0 rounded-xl shadow-xl border border-gray-700 flex flex-col max-h-[90vh] overflow-y-auto scrollbar-hide">
          <div className="p-6 w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Editar Revenda</h2>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </Button>
              </div>
            </div>

            {/* Form */}
            <form className="space-y-6">
              {/* Primeira linha */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Usuário */}
              <div className="space-y-2">
                  <label className="text-sm font-medium text-white">
                    Usuário <span className="text-red-500">*</span>
                  </label>
                <Input
                    value={selectedReseller?.name || ''}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-[#23272f] border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-blue-400 text-xs">
                      <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                      <span>O campo usuário só pode conter letras, números e traços.</span>
              </div>
                    <div className="flex items-center gap-2 text-blue-400 text-xs">
                      <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                      <span>O usuário precisa ter no mínimo 6 caracteres.</span>
                    </div>
                  </div>
                </div>

                {/* Senha */}
              <div className="space-y-2">
                  <label className="text-sm font-medium text-white">
                    Senha <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                <Input
                      placeholder="Digite a nova senha"
                      className="bg-[#23272f] border-gray-600 text-white flex-1 placeholder-gray-400 focus:border-blue-500"
                    />
                    <Button type="button" variant="outline" size="sm" className="border-gray-600 text-gray-400 hover:text-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </Button>
              </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-blue-400 text-xs">
                      <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                      <span>A senha precisa ter no mínimo 8 caracteres.</span>
            </div>
                    <div className="flex items-center gap-2 text-blue-400 text-xs">
                      <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                      <span>Pelo menos 8 caracteres de comprimento, mas 14 ou mais é melhor.</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-400 text-xs">
                      <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                      <span>Uma combinação de letras maiúsculas, letras minúsculas, números e símbolos.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Checkbox Forçar mudança de senha */}
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="forcePasswordChange" className="rounded border-gray-600 bg-[#23272f] text-blue-500 focus:ring-blue-500" />
                <label htmlFor="forcePasswordChange" className="text-sm text-gray-300">
                  Forçar revenda a mudar a senha no próximo login
                </label>
              </div>

              {/* Segunda linha */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Permissão */}
              <div className="space-y-2">
                  <label className="text-sm font-medium text-white">
                    Permissão <span className="text-red-500">*</span>
                  </label>
                  <select 
                    value={selectedReseller?.plan || ''}
                    onChange={(e) => setFormData({...formData, plan: e.target.value as any})}
                    className="w-full bg-[#23272f] border border-gray-600 text-white rounded-md px-3 py-2 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Selecione</option>
                    <option value="Premium">Premium</option>
                    <option value="Standard">Standard</option>
                    <option value="Basic">Basic</option>
                  </select>
                </div>

                {/* Créditos */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">
                    Créditos <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <Button type="button" variant="outline" size="sm" className="border-gray-600 text-gray-400 hover:text-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </Button>
                <Input
                      value={selectedReseller?.commission || 0}
                      onChange={(e) => setFormData({...formData, commission: e.target.value})}
                      className="bg-[#23272f] border-gray-600 text-white text-center placeholder-gray-400 focus:border-blue-500"
                    />
                    <Button type="button" variant="outline" size="sm" className="border-gray-600 text-gray-400 hover:text-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </Button>
              </div>
                  <div className="text-blue-400 text-xs">Mínimo de 10 créditos</div>
                </div>
              </div>

              {/* Servidores */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Servidores (Opcional)</label>
                <select className="w-full bg-[#23272f] border border-gray-600 text-white rounded-md px-3 py-2 focus:border-blue-500 focus:outline-none">
                  <option value="">Opcional</option>
                  <option value="server1">Servidor 1</option>
                  <option value="server2">Servidor 2</option>
                  <option value="server3">Servidor 3</option>
                </select>
                <div className="text-blue-400 text-xs">
                  Selecione os servidores que esse revenda pode ter acesso. Deixe em branco para permitir todos os servidores. Essa configuração afeta tanto a revenda quanto as subrevendas.
                </div>
              </div>

              {/* Terceira linha */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Revenda Master */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Revenda Master</label>
                <Input
                    placeholder="Nome da revenda master"
                    className="bg-[#23272f] border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                />
              </div>

                {/* Desativar login se não recarregar */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">
                    Desativar login se não recarregar - em dias
                  </label>
                  <div className="flex items-center gap-2">
                    <Button type="button" variant="outline" size="sm" className="border-gray-600 text-gray-400 hover:text-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </Button>
                    <Input 
                      placeholder="0"
                      className="bg-[#23272f] border-gray-600 text-white text-center placeholder-gray-400 focus:border-blue-500"
                    />
                    <Button type="button" variant="outline" size="sm" className="border-gray-600 text-gray-400 hover:text-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </Button>
            </div>
                  <div className="text-blue-400 text-xs">Deixe 0 para desativar essa opção</div>
                </div>
              </div>

              {/* Configuração de Revenda Mensalista */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="monthlyReseller" className="rounded border-gray-600 bg-[#23272f] text-blue-500 focus:ring-blue-500" />
                  <label htmlFor="monthlyReseller" className="text-sm text-gray-300">
                    Configuração de Revenda Mensalista
                  </label>
                </div>
                <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-3">
                  <div className="text-green-400 text-sm">
                    Apenas você pode visualizar os detalhes pessoais deste revenda.
                  </div>
                </div>
              </div>

              {/* Informações Pessoais */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Informações Pessoais (Opcional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Nome</label>
                    <Input 
                      value={selectedReseller?.name || ''}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="bg-[#23272f] border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                    />
              </div>
              <div className="space-y-2">
                    <label className="text-sm font-medium text-white">E-mail</label>
                    <Input 
                      value={selectedReseller?.email || ''}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-[#23272f] border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                    />
              </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Telegram</label>
                    <Input 
                      placeholder="@usuario"
                      className="bg-[#23272f] border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                    />
            </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">WhatsApp</label>
                    <Input 
                      value={selectedReseller?.phone || ''}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="bg-[#23272f] border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                    />
                    <div className="text-blue-400 text-xs">
                      Incluindo o código do país - com ou sem espaço e traços - ex. 55 11 99999 3333
          </div>
                  </div>
                </div>
              </div>

              {/* Observações */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Observações (Opcional)</label>
                <textarea 
                  rows={4}
                  placeholder="Adicione observações sobre este revendedor..."
                  className="w-full bg-[#23272f] border border-gray-600 text-white rounded-md px-3 py-2 focus:border-blue-500 focus:outline-none placeholder-gray-400 resize-none"
                />
              </div>

              {/* Botões */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-700">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setEditModalOpen(false)}
                  className="border-gray-600 text-gray-400 hover:text-white"
                >
              Cancelar
            </Button>
                <Button 
                  type="button" 
                  onClick={handleSaveEdit}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
              Salvar Alterações
            </Button>
              </div>
            </form>

            {/* Footer */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-700 text-xs text-gray-500">
              <span>2025© ALLEZCONECCT v3.50</span>
              <span>Powered by Sigma | Notificações</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Adicionar */}
      <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
        <DialogContent className="bg-[#1f2937] text-white max-w-4xl w-full p-0 rounded-xl shadow-xl border border-gray-700 flex flex-col max-h-[90vh] overflow-y-auto scrollbar-hide">
          <div className="p-6 w-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Adicionar um Revenda</h2>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </Button>
              </div>
            </div>

            {/* Form */}
            <form className="space-y-6">
              {/* Primeira linha */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Usuário */}
              <div className="space-y-2">
                  <label className="text-sm font-medium text-white">
                    Usuário <span className="text-red-500">*</span>
                  </label>
                <Input
                    placeholder="Obrigatório" 
                    className="bg-[#23272f] border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-blue-400 text-xs">
                      <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                      <span>O campo usuário só pode conter letras, números e traços.</span>
              </div>
                    <div className="flex items-center gap-2 text-blue-400 text-xs">
                      <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                      <span>O usuário precisa ter no mínimo 6 caracteres.</span>
                    </div>
                  </div>
                </div>

                {/* Senha */}
              <div className="space-y-2">
                  <label className="text-sm font-medium text-white">
                    Senha <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                <Input
                      placeholder="Digite a senha"
                      className="bg-[#23272f] border-gray-600 text-white flex-1 placeholder-gray-400 focus:border-blue-500"
                    />
                    <Button type="button" variant="outline" size="sm" className="border-gray-600 text-gray-400 hover:text-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </Button>
              </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-blue-400 text-xs">
                      <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                      <span>A senha precisa ter no mínimo 8 caracteres.</span>
            </div>
                    <div className="flex items-center gap-2 text-blue-400 text-xs">
                      <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                      <span>Pelo menos 8 caracteres de comprimento, mas 14 ou mais é melhor.</span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-400 text-xs">
                      <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                      <span>Uma combinação de letras maiúsculas, letras minúsculas, números e símbolos.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Checkbox Forçar mudança de senha */}
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="forcePasswordChange" className="rounded border-gray-600 bg-[#23272f] text-blue-500 focus:ring-blue-500" />
                <label htmlFor="forcePasswordChange" className="text-sm text-gray-300">
                  Forçar revenda a mudar a senha no próximo login
                </label>
              </div>

              {/* Segunda linha */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Permissão */}
              <div className="space-y-2">
                  <label className="text-sm font-medium text-white">
                    Permissão <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full bg-[#23272f] border border-gray-600 text-white rounded-md px-3 py-2 focus:border-blue-500 focus:outline-none">
                    <option value="">Selecione</option>
                    <option value="admin">Administrador</option>
                    <option value="reseller">Revendedor</option>
                    <option value="subreseller">Sub-Revendedor</option>
                  </select>
                </div>

                {/* Créditos */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">
                    Créditos <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <Button type="button" variant="outline" size="sm" className="border-gray-600 text-gray-400 hover:text-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </Button>
                <Input
                      placeholder="0"
                      className="bg-[#23272f] border-gray-600 text-white text-center placeholder-gray-400 focus:border-blue-500"
                    />
                    <Button type="button" variant="outline" size="sm" className="border-gray-600 text-gray-400 hover:text-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </Button>
              </div>
                  <div className="text-blue-400 text-xs">Mínimo de 10 créditos</div>
                </div>
              </div>

              {/* Servidores */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Servidores (Opcional)</label>
                <select className="w-full bg-[#23272f] border border-gray-600 text-white rounded-md px-3 py-2 focus:border-blue-500 focus:outline-none">
                  <option value="">Opcional</option>
                  <option value="server1">Servidor 1</option>
                  <option value="server2">Servidor 2</option>
                  <option value="server3">Servidor 3</option>
                </select>
                <div className="text-blue-400 text-xs">
                  Selecione os servidores que esse revenda pode ter acesso. Deixe em branco para permitir todos os servidores. Essa configuração afeta tanto a revenda quanto as subrevendas.
                </div>
              </div>

              {/* Terceira linha */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Revenda Master */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">Revenda Master</label>
                <Input
                    placeholder="Nome da revenda master"
                    className="bg-[#23272f] border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                />
              </div>

                {/* Desativar login se não recarregar */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white">
                    Desativar login se não recarregar - em dias
                  </label>
                  <div className="flex items-center gap-2">
                    <Button type="button" variant="outline" size="sm" className="border-gray-600 text-gray-400 hover:text-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </Button>
                    <Input 
                      placeholder="0"
                      className="bg-[#23272f] border-gray-600 text-white text-center placeholder-gray-400 focus:border-blue-500"
                    />
                    <Button type="button" variant="outline" size="sm" className="border-gray-600 text-gray-400 hover:text-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </Button>
            </div>
                  <div className="text-blue-400 text-xs">Deixe 0 para desativar essa opção</div>
                </div>
              </div>

              {/* Configuração de Revenda Mensalista */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="monthlyReseller" className="rounded border-gray-600 bg-[#23272f] text-blue-500 focus:ring-blue-500" />
                  <label htmlFor="monthlyReseller" className="text-sm text-gray-300">
                    Configuração de Revenda Mensalista
                  </label>
                </div>
                <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-3">
                  <div className="text-green-400 text-sm">
                    Apenas você pode visualizar os detalhes pessoais deste revenda.
                  </div>
                </div>
              </div>

              {/* Informações Pessoais */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Informações Pessoais (Opcional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Nome</label>
                    <Input 
                      placeholder="Nome completo"
                      className="bg-[#23272f] border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                    />
              </div>
              <div className="space-y-2">
                    <label className="text-sm font-medium text-white">E-mail</label>
                    <Input 
                      placeholder="email@exemplo.com"
                      className="bg-[#23272f] border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                    />
              </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Telegram</label>
                    <Input 
                      placeholder="@usuario"
                      className="bg-[#23272f] border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                    />
            </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">WhatsApp</label>
                    <Input 
                      placeholder="55 11 99999 3333"
                      className="bg-[#23272f] border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                    />
                    <div className="text-blue-400 text-xs">
                      Incluindo o código do país - com ou sem espaço e traços - ex. 55 11 99999 3333
          </div>
                  </div>
                </div>
              </div>

              {/* Observações */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">Observações (Opcional)</label>
                <textarea 
                  rows={4}
                  placeholder="Adicione observações sobre este revendedor..."
                  className="w-full bg-[#23272f] border border-gray-600 text-white rounded-md px-3 py-2 focus:border-blue-500 focus:outline-none placeholder-gray-400 resize-none"
                />
              </div>

              {/* Botões */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-700">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setAddModalOpen(false)}
                  className="border-gray-600 text-gray-400 hover:text-white"
                >
              Cancelar
            </Button>
                <Button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Salvar
            </Button>
              </div>
            </form>

            {/* Footer */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-700 text-xs text-gray-500">
              <span>2025© ALLEZCONECCT v3.50</span>
              <span>Powered by Sigma | Notificações</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminResellers; 