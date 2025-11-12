import { AgentAIClient } from '../../src/lib/aiClient.agent';
import { agentLogger } from '../../src/lib/logger.agent';

export interface InsightsRequestBody {
  prompt: string;
  context?: Record<string, unknown>;
}

const logger = agentLogger;

export const POST = async (request: Request) => {
  try {
    const body: InsightsRequestBody = await request.json() as InsightsRequestBody;

    const client = new AgentAIClient();
    const insight = await client.createInsight(body.prompt, body.context ?? {});

    return new Response(JSON.stringify({ insight }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    logger.error('Falha ao gerar insight', { message: err.message });
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
