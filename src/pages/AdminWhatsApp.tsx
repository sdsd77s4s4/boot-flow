import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

const AdminWhatsApp: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center space-x-3 mb-4">
        <MessageSquare className="w-7 h-7 text-green-500" />
        <h1 className="text-3xl font-bold text-white">Gerenciamento do WhatsApp</h1>
      </div>
      <Card className="border-gray-700" style={{ backgroundColor: '#1F2937' }}>
        <CardHeader>
          <CardTitle className="text-white">Integração com WhatsApp</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400">Aqui você poderá configurar integrações, automações e monitorar mensagens do WhatsApp.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminWhatsApp; 