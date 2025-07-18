import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Eye, 
  Edit, 
  Trash2,
  UserPlus
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
      status: 'Ativo'
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
      status: 'Ativo'
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
      status: 'Pendente'
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
      status: 'Inativo'
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
      status: 'Ativo'
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
      status: 'Ativo'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResellers, setFilteredResellers] = useState<Reseller[]>(resellers);

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
    toast.info(`Visualizando dados de ${reseller.name}`);
  };

  const handleEditReseller = (reseller: Reseller) => {
    toast.info(`Editando ${reseller.name}`);
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
        <Button className="bg-purple-600 hover:bg-purple-700">
          <UserPlus className="w-4 h-4 mr-2" />
          + Novo Revendedor
        </Button>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-800 border-gray-700">
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

        <Card className="bg-gray-800 border-gray-700">
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

        <Card className="bg-gray-800 border-gray-700">
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

        <Card className="bg-gray-800 border-gray-700">
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
      <Card className="bg-gray-800 border-gray-700">
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
    </div>
  );
};

export default AdminResellers; 