import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Paintbrush } from 'lucide-react';

const AdminBranding: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-3 mb-4">
        <Paintbrush className="w-7 h-7 text-purple-400" />
        <h1 className="text-3xl font-bold text-white">Customizar Marca</h1>
      </div>
      <Card className="border-gray-700" style={{ backgroundColor: '#1F2937' }}>
        <CardHeader>
          <CardTitle className="text-white">Personalização da Plataforma</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400">Aqui você poderá customizar cores, logotipo, favicon, textos e identidade visual da sua plataforma.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBranding; 