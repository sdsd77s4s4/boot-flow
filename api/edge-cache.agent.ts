import { agentLogger } from '@/lib/logger.agent';

const logger = agentLogger;

const ONE_MINUTE = 60;

export const GET = async (request: Request) => {
  try {
    const payload = { time: new Date().toISOString(), message: 'Edge cache ativo' };
    
    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': `public, s-maxage=${5 * ONE_MINUTE}, stale-while-revalidate=${15 * ONE_MINUTE}`,
        'CDN-Cache-Control': 'max-age=300',
      },
    });
  } catch (error) {
    logger.error('Erro no edge cache handler', { error: (error as Error).message });
    return new Response('Internal error', { status: 500 });
  }
};
