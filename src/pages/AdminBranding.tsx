import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Paintbrush, UploadCloud, X, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

const initialBrand = {
  name: 'Sua Empresa Ltda',
  slogan: 'Seu slogan aqui',
  description: '',
  website: 'https://suaempresa.com',
  email: 'contato@suaempresa.com',
  phone: '99999-9999',
  logo: '',
  favicon: ''
};

const AdminBranding: React.FC = () => {
  const [tab, setTab] = useState('marca');
  const [brand, setBrand] = useState(initialBrand);
  const [logoModal, setLogoModal] = useState(false);
  const [faviconModal, setFaviconModal] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [faviconFile, setFaviconFile] = useState<File | null>(null);

  // Função para simular upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogoFile(e.target.files[0]);
      setBrand({ ...brand, logo: URL.createObjectURL(e.target.files[0]) });
      setLogoModal(false);
    }
  };
  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFaviconFile(e.target.files[0]);
      setBrand({ ...brand, favicon: URL.createObjectURL(e.target.files[0]) });
      setFaviconModal(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-[#181e29] via-[#232a36] to-[#181e29]">
      <div className="flex items-center space-x-3 mb-2">
        <Paintbrush className="w-7 h-7 text-purple-400" />
        <h1 className="text-3xl font-bold text-white">Customizar Marca</h1>
      </div>
      <p className="text-gray-400 mb-6">Personalize a aparência e identidade da sua plataforma</p>
      <Tabs value={tab} onValueChange={setTab} className="">
        <TabsList className="flex bg-[#232a36] rounded-lg mb-6 w-fit">
          <TabsTrigger value="marca" className="flex-1 data-[state=active]:bg-purple-600 data-[state=active]:text-white">Marca</TabsTrigger>
          <TabsTrigger value="visual" className="flex-1 data-[state=active]:bg-purple-600 data-[state=active]:text-white">Visual</TabsTrigger>
          <TabsTrigger value="avancado" className="flex-1 data-[state=active]:bg-purple-600 data-[state=active]:text-white">Avançado</TabsTrigger>
          <TabsTrigger value="funcionalidades" className="flex-1 data-[state=active]:bg-purple-600 data-[state=active]:text-white">Funcionalidades</TabsTrigger>
        </TabsList>
        <TabsContent value="marca">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Coluna principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Informações da Empresa */}
              <div className="rounded-2xl border border-purple-700/40 bg-[#232a36] p-6 shadow-lg">
                <span className="block text-purple-300 font-semibold mb-4 text-lg">Informações da Empresa</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-300 mb-1 font-medium">Nome da Empresa *</label>
                    <Input value={brand.name} onChange={e => setBrand({ ...brand, name: e.target.value })} className="bg-gray-900 border border-gray-700 text-white" />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1 font-medium">Slogan</label>
                    <Input value={brand.slogan} onChange={e => setBrand({ ...brand, slogan: e.target.value })} className="bg-gray-900 border border-gray-700 text-white" />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-300 mb-1 font-medium">Descrição</label>
                  <textarea value={brand.description} onChange={e => setBrand({ ...brand, description: e.target.value })} className="w-full bg-gray-900 border border-gray-700 text-white rounded p-2 min-h-[60px]" placeholder="Descreva sua empresa..."></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-1 font-medium">Website *</label>
                    <Input value={brand.website} onChange={e => setBrand({ ...brand, website: e.target.value })} className="bg-gray-900 border border-gray-700 text-white" />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1 font-medium">E-mail *</label>
                    <Input value={brand.email} onChange={e => setBrand({ ...brand, email: e.target.value })} className="bg-gray-900 border border-gray-700 text-white" />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-1 font-medium">Telefone *</label>
                    <Input value={brand.phone} onChange={e => setBrand({ ...brand, phone: e.target.value })} className="bg-gray-900 border border-gray-700 text-white" />
                  </div>
                </div>
              </div>
              {/* Logos e Ícones */}
              <div className="rounded-2xl border border-purple-700/40 bg-[#232a36] p-6 shadow-lg">
                <span className="block text-purple-300 font-semibold mb-4 text-lg">Logos e Ícones</span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Logo */}
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-purple-500/40 rounded-xl p-6 bg-[#181e29]">
                    {brand.logo ? (
                      <img src={brand.logo} alt="Logo" className="h-16 mb-2" />
                    ) : (
                      <UploadCloud className="w-10 h-10 text-purple-400 mb-2" />
                    )}
                    <p className="text-gray-400 text-xs mb-2">Clique para fazer upload<br />PNG, JPG até 1MB</p>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => setLogoModal(true)}>Selecionar Logo</Button>
                  </div>
                  {/* Favicon */}
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-purple-500/40 rounded-xl p-6 bg-[#181e29]">
                    {brand.favicon ? (
                      <img src={brand.favicon} alt="Favicon" className="h-10 mb-2" />
                    ) : (
                      <UploadCloud className="w-10 h-10 text-purple-400 mb-2" />
                    )}
                    <p className="text-gray-400 text-xs mb-2">Clique para fazer upload<br />ICO, PNG até 1MB</p>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white" onClick={() => setFaviconModal(true)}>Selecionar Favicon</Button>
                  </div>
                </div>
              </div>
            </div>
            {/* Coluna Preview */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-purple-700/40 bg-[#232a36] p-6 shadow-lg min-w-[260px]">
                <span className="block text-purple-300 font-semibold mb-4 text-lg">Preview</span>
                <div className="bg-[#181e29] rounded-lg p-4 flex flex-col items-center">
                  <div className="flex gap-2 mb-2">
                    <div className="w-4 h-4 rounded-full bg-gray-400" />
                    <div className="w-4 h-4 rounded-full bg-gray-600" />
                    <div className="w-4 h-4 rounded-full bg-gray-700" />
                  </div>
                  <div className="w-full bg-white rounded p-2 mb-2">
                    <div className="flex items-center gap-2 mb-2">
                      {brand.logo ? (
                        <img src={brand.logo} alt="Logo" className="h-6" />
                      ) : (
                        <span className="font-bold text-gray-700">Sua Empresa</span>
                      )}
                    </div>
                    <div className="h-3 w-2/3 bg-purple-200 rounded mb-1" />
                    <div className="h-3 w-1/2 bg-purple-100 rounded" />
                  </div>
                  <div className="text-xs text-gray-400 mt-2">
                    <div>Template: Moderno</div>
                    <div>Fonte: Inter</div>
                    <div>Idioma: Português (Brasil)</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" className="bg-gray-700 text-white px-6 py-2 rounded font-semibold">Cancelar</Button>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded font-semibold">Salvar Configurações</Button>
              </div>
            </div>
          </div>
        </TabsContent>
        {/* Outras abas podem ser implementadas depois */}
        <TabsContent value="visual">
          <div className="text-gray-400">Configurações visuais em breve...</div>
        </TabsContent>
        <TabsContent value="avancado">
          <div className="text-gray-400">Configurações avançadas em breve...</div>
        </TabsContent>
        <TabsContent value="funcionalidades">
          <div className="text-gray-400">Funcionalidades extras em breve...</div>
        </TabsContent>
      </Tabs>

      {/* Modal de upload de logo */}
      <Dialog open={logoModal} onOpenChange={setLogoModal}>
        <DialogContent className="bg-[#232a36] border border-purple-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>Selecionar Logo</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            <UploadCloud className="w-12 h-12 text-purple-400" />
            <input type="file" accept="image/png,image/jpeg" onChange={handleLogoUpload} className="hidden" id="logo-upload" />
            <label htmlFor="logo-upload" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded cursor-pointer">Escolher arquivo</label>
            <span className="text-xs text-gray-400">PNG, JPG até 1MB</span>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setLogoModal(false)} className="bg-gray-700 text-white">Cancelar</Button>
            <Button onClick={() => setLogoModal(false)} className="bg-purple-600 hover:bg-purple-700 text-white">OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Modal de upload de favicon */}
      <Dialog open={faviconModal} onOpenChange={setFaviconModal}>
        <DialogContent className="bg-[#232a36] border border-purple-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle>Selecionar Favicon</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            <UploadCloud className="w-12 h-12 text-purple-400" />
            <input type="file" accept="image/png,image/x-icon" onChange={handleFaviconUpload} className="hidden" id="favicon-upload" />
            <label htmlFor="favicon-upload" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded cursor-pointer">Escolher arquivo</label>
            <span className="text-xs text-gray-400">ICO, PNG até 1MB</span>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setFaviconModal(false)} className="bg-gray-700 text-white">Cancelar</Button>
            <Button onClick={() => setFaviconModal(false)} className="bg-purple-600 hover:bg-purple-700 text-white">OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBranding; 