import React, { useState } from 'react';

interface ExtractedUser {
  username: string;
  password: string;
  server: string;
  port: string;
  protocol: string;
}

const IPTVAnalyzer = () => {
  const [m3uUrl, setM3uUrl] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionError, setExtractionError] = useState('');
  const [extractedUsers, setExtractedUsers] = useState<ExtractedUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<ExtractedUser | null>(null);

  // Sistema de Proxy CORS Multi-Fallback
  const corsProxies = [
    {
      name: "api.allorigins.win",
      url: (targetUrl: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`
    },
    {
      name: "cors-anywhere.herokuapp.com",
      url: (targetUrl: string) => `https://cors-anywhere.herokuapp.com/${targetUrl}`
    },
    {
      name: "api.codetabs.com",
      url: (targetUrl: string) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}`
    },
    {
      name: "cors-proxy.htmldriven.com",
      url: (targetUrl: string) => `https://cors-proxy.htmldriven.com/?url=${encodeURIComponent(targetUrl)}`
    }
  ];

  const extractM3UData = async () => {
    if (!m3uUrl.trim()) {
      setExtractionError("Por favor, insira uma URL M3U válida.");
      return;
    }

    setIsExtracting(true);
    setExtractionError('');
    setExtractedUsers([]);
    setSelectedUser(null);

    // Tentar primeiro a URL direta (se for HTTPS)
    try {
      const url = new URL(m3uUrl);
      if (url.protocol === 'https:') {
        const response = await fetch(m3uUrl);
        if (response.ok) {
          const content = await response.text();
          processM3UContent(content);
          return;
        }
      }
    } catch (directError) {
      console.log("Tentativa direta falhou, iniciando sistema de proxies...");
    }

    // Sistema de fallback com múltiplos proxies
    for (let i = 0; i < corsProxies.length; i++) {
      const proxy = corsProxies[i];
      
      try {
        setExtractionError(`Testando proxy ${i + 1}/4: ${proxy.name}...`);
        console.log(`🔄 Tentando proxy ${i + 1}/4: ${proxy.name}`);
        
        const proxyUrl = proxy.url(m3uUrl);
        const response = await fetch(proxyUrl, {
          method: 'GET',
          headers: {
            'Accept': 'text/plain,text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
          },
          timeout: 10000
        });

        if (!response.ok) {
          throw new Error(`Proxy ${proxy.name} retornou status ${response.status}`);
        }

        const content = await response.text();
        
        if (!content || content.length < 10) {
          throw new Error(`Proxy ${proxy.name} retornou conteúdo vazio`);
        }

        try {
          const jsonCheck = JSON.parse(content);
          if (jsonCheck.error || jsonCheck.message) {
            throw new Error(`Proxy ${proxy.name} retornou erro: ${jsonCheck.error || jsonCheck.message}`);
          }
        } catch (jsonError) {
          // Se não é JSON, é conteúdo válido
        }

        console.log(`✅ Proxy ${proxy.name} funcionou! Processando conteúdo...`);
        setExtractionError('');
        processM3UContent(content);
        return;

      } catch (proxyError: any) {
        console.error(`❌ Proxy ${proxy.name} falhou:`, proxyError.message);
        
        if (i === corsProxies.length - 1) {
          setExtractionError(`Todos os proxies falharam. Último erro: ${proxyError.message}`);
          console.error("🚨 Todos os proxies falharam!");
        }
      }
    }

    setIsExtracting(false);
  };

  const processM3UContent = (content: string) => {
    try {
      const lines = content.split('\n');
      const users: ExtractedUser[] = [];
      
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (line.startsWith('#EXTINF:')) {
          // Procurar pela próxima linha que contém a URL
          const nextLine = lines[i + 1]?.trim();
          if (nextLine && !nextLine.startsWith('#')) {
            const userData = parseStreamUrl(nextLine);
            if (userData) {
              users.push(userData);
            }
          }
        }
      }

      if (users.length > 0) {
        setExtractedUsers(users);
        setSelectedUser(users[0]);
        setExtractionError(`✅ Extraídos ${users.length} usuários com sucesso!`);
      } else {
        setExtractionError('Nenhum usuário encontrado no arquivo M3U.');
      }
    } catch (error) {
      setExtractionError('Erro ao processar conteúdo M3U.');
    } finally {
      setIsExtracting(false);
    }
  };

  const parseStreamUrl = (url: string): ExtractedUser | null => {
    try {
      // Padrões comuns de URLs M3U
      const patterns = [
        // http://username:password@server:port
        /https?:\/\/([^:]+):([^@]+)@([^:]+):(\d+)/,
        // http://server:port/get.php?username=user&password=pass
        /https?:\/\/([^\/]+)\/get\.php\?username=([^&]+)&password=([^&]+)/,
        // http://server:port/username/password
        /https?:\/\/([^\/]+)\/([^\/]+)\/([^\/\?]+)/
      ];

      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) {
          if (pattern.source.includes('get.php')) {
            return {
              username: decodeURIComponent(match[2]),
              password: decodeURIComponent(match[3]),
              server: match[1].split(':')[0],
              port: match[1].split(':')[1] || '80',
              protocol: url.startsWith('https') ? 'https' : 'http'
            };
          } else if (pattern.source.includes('@')) {
            return {
              username: decodeURIComponent(match[1]),
              password: decodeURIComponent(match[2]),
              server: match[3],
              port: match[4],
              protocol: url.startsWith('https') ? 'https' : 'http'
            };
          } else {
            return {
              username: decodeURIComponent(match[2]),
              password: decodeURIComponent(match[3]),
              server: match[1].split(':')[0],
              port: match[1].split(':')[1] || '80',
              protocol: url.startsWith('https') ? 'https' : 'http'
            };
          }
        }
      }
      
      return null;
    } catch (error) {
      return null;
    }
  };

  const selectUser = (user: ExtractedUser) => {
    setSelectedUser(user);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            🔍 Analisador IPTV M3U
          </h1>

          {/* Input da URL */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              URL do Arquivo M3U
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={m3uUrl}
                onChange={(e) => setM3uUrl(e.target.value)}
                placeholder="https://exemplo.com/lista.m3u"
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={extractM3UData}
                disabled={isExtracting}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-md font-medium transition-colors"
              >
                {isExtracting ? '🔄 Extraindo...' : '🔍 Extrair'}
              </button>
            </div>
          </div>

          {/* Status de extração */}
          {extractionError && (
            <div className={`border text-sm rounded p-3 mb-4 ${
              extractionError.includes('Testando proxy') 
                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300' 
                : extractionError.includes('✅')
                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 text-green-700 dark:text-green-300'
                : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700 text-red-700 dark:text-red-300'
            }`}>
              {extractionError.includes('Testando proxy') ? '🔄' : 
               extractionError.includes('✅') ? '✅' : '❌'} {extractionError}
            </div>
          )}

          {/* Lista de usuários extraídos */}
          {extractedUsers.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                👥 Usuários Extraídos ({extractedUsers.length})
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {extractedUsers.map((user, index) => (
                  <div
                    key={index}
                    onClick={() => selectUser(user)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedUser === user
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="font-medium text-gray-900 dark:text-white mb-2">
                      Usuário {index + 1}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      <div><strong>Login:</strong> {user.username}</div>
                      <div><strong>Senha:</strong> {user.password}</div>
                      <div><strong>Servidor:</strong> {user.server}</div>
                      <div><strong>Porta:</strong> {user.port}</div>
                      <div><strong>Protocolo:</strong> {user.protocol}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Usuário selecionado */}
          {selectedUser && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                📋 Usuário Selecionado
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Login
                  </label>
                  <input
                    type="text"
                    value={selectedUser.username}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Senha
                  </label>
                  <input
                    type="text"
                    value={selectedUser.password}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Servidor
                  </label>
                  <input
                    type="text"
                    value={selectedUser.server}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Porta
                  </label>
                  <input
                    type="text"
                    value={selectedUser.port}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IPTVAnalyzer; 