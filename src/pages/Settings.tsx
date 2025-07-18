import { useState } from "react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const perfisMock = {
  nome: 'João',
  sobrenome: 'Silva',
  email: 'joao@exemplo.com',
  empresa: 'Minha Empresa LTDA',
  telefone: '+55 11 99999-9999',
  fuso: 'América/São Paulo',
};

export default function Settings() {
  const [tab, setTab] = useState('perfil');
  const [perfil, setPerfil] = useState(perfisMock);

  const handleChange = (e: any) => {
    setPerfil({ ...perfil, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#181e29] p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Configurações</h1>
            <p className="text-gray-500 dark:text-gray-400">Gerencie sua conta e integrações</p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded font-semibold">Salvar Alterações</Button>
        </div>
        <Tabs value={tab} onValueChange={setTab} className="mb-6">
          <TabsList className="flex bg-gray-100 dark:bg-[#232a36] rounded-lg w-full">
            <TabsTrigger value="perfil" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-[#181e29] data-[state=active]:text-purple-700 dark:data-[state=active]:text-purple-300">Perfil</TabsTrigger>
            <TabsTrigger value="notificacoes" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-[#181e29] data-[state=active]:text-purple-700 dark:data-[state=active]:text-purple-300">Notificações</TabsTrigger>
            <TabsTrigger value="integracoes" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-[#181e29] data-[state=active]:text-purple-700 dark:data-[state=active]:text-purple-300">Integrações</TabsTrigger>
            <TabsTrigger value="faturamento" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-[#181e29] data-[state=active]:text-purple-700 dark:data-[state=active]:text-purple-300">Faturamento</TabsTrigger>
            <TabsTrigger value="seguranca" className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-[#181e29] data-[state=active]:text-purple-700 dark:data-[state=active]:text-purple-300">Segurança</TabsTrigger>
          </TabsList>
          <TabsContent value="perfil">
            <div className="bg-white dark:bg-[#232a36] rounded-xl p-6 border border-gray-200 dark:border-purple-700/40 mt-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">👤 Informações Pessoais</h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">Atualize suas informações básicas</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">Nome</label>
                  <Input name="nome" value={perfil.nome} onChange={handleChange} className="bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white" />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">Sobrenome</label>
                  <Input name="sobrenome" value={perfil.sobrenome} onChange={handleChange} className="bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white" />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">Email</label>
                <Input name="email" value={perfil.email} onChange={handleChange} className="bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">Empresa</label>
                <Input name="empresa" value={perfil.empresa} onChange={handleChange} className="bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">Telefone</label>
                <Input name="telefone" value={perfil.telefone} onChange={handleChange} className="bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white" />
              </div>
              <div className="mb-2">
                <label className="block text-gray-700 dark:text-gray-300 mb-1 font-medium">Fuso Horário</label>
                <Input name="fuso" value={perfil.fuso} onChange={handleChange} className="bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white" />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="notificacoes">
            <div className="bg-white dark:bg-[#232a36] rounded-xl p-6 border border-gray-200 dark:border-purple-700/40 mt-4 text-gray-400 text-center">Em breve: configurações de notificações.</div>
          </TabsContent>
          <TabsContent value="integracoes">
            <div className="bg-white dark:bg-[#232a36] rounded-xl p-6 border border-gray-200 dark:border-purple-700/40 mt-4 text-gray-400 text-center">Em breve: integrações com outros sistemas.</div>
          </TabsContent>
          <TabsContent value="faturamento">
            <div className="bg-white dark:bg-[#232a36] rounded-xl p-6 border border-gray-200 dark:border-purple-700/40 mt-4 text-gray-400 text-center">Em breve: informações de faturamento.</div>
          </TabsContent>
          <TabsContent value="seguranca">
            <div className="bg-white dark:bg-[#232a36] rounded-xl p-6 border border-gray-200 dark:border-purple-700/40 mt-4 text-gray-400 text-center">Em breve: configurações de segurança.</div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}