import fetch from 'node-fetch';

export default async function handler(req, res) {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: 'URL M3U não informada.' });
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(400).json({ error: 'Não foi possível baixar o arquivo M3U.' });
    }
    const m3uText = await response.text();

    // Parsing básico do M3U
    // Extrai o nome do usuário (se houver), bouquets (nomes de grupos), etc.
    let name = '';
    let bouquets = [];
    let lines = m3uText.split('\n');
    for (let line of lines) {
      if (line.startsWith('#EXTINF')) {
        // Exemplo: #EXTINF:-1 tvg-name="Nome" group-title="Filmes",Nome do Canal
        const matchName = line.match(/tvg-name="([^"]+)"/);
        if (matchName) name = matchName[1];
        const matchGroup = line.match(/group-title="([^"]+)"/);
        if (matchGroup) bouquets.push(matchGroup[1]);
      }
    }
    bouquets = [...new Set(bouquets)]; // Remove duplicados

    // Retorno básico
    return res.status(200).json({
      name: name || 'Usuário IPTV',
      bouquets: bouquets.join(', '),
      // Outros campos podem ser extraídos conforme o padrão do seu M3U
    });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao processar o arquivo M3U.' });
  }
} 