import { MessageCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('https://gateway.apibrasil.io/api/v2/whatsapp/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2dhdGV3YXkuYXBpYnJhc2lsLmlvL2FwaS92Mi9hdXRoL3JlZ2lzdGVyIiwiaWF0IjoxNzQ5MDg2MTQzLCJleHAiOjE3ODA2MjIxNDMsIm5iZiI6MTc0OTA4NjE0MywianRpIjoiclVXZjdDNkxKUmZPV25ldCIsInN1YiI6IjE1NTU2IiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.0Uj5y56Yr2Cnauz4QDnXoGACZx13aON6pEDIjGV1Jp4`,
        },
        body: JSON.stringify({
          profileId: '270c2c74-2324-4668-b217-843ee6b100da',
          phoneNumber: 'SEU_NUMERO_DE_TELEFONE', // Substitua pelo número de destino
          message: message
        })
      });

      if (response.ok) {
        setMessage('');
        setIsOpen(false);
        alert('Mensagem enviada com sucesso!');
      } else {
        throw new Error('Falha ao enviar mensagem');
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      alert('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl w-80 overflow-hidden">
          <div className="bg-green-600 text-white p-4 flex justify-between items-center">
            <h3 className="font-semibold">Envie uma mensagem</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-green-700 rounded-full p-1"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="p-4">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="w-full p-2 border rounded mb-3 h-24 resize-none"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? 'Enviando...' : (
                <>
                  <MessageCircle size={18} />
                  Enviar mensagem
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors"
          aria-label="Abrir chat do WhatsApp"
        >
          <MessageCircle size={28} />
        </button>
      )}
    </div>
  );
}
