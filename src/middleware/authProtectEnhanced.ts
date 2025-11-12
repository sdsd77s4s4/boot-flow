import { supabase } from '@/lib/supabase';
import { agentLogger } from '@/lib/logger.agent';

const logger = agentLogger;

interface RateLimitStore {
  [ip: string]: {
    count: number;
    resetAt: number;
  };
}

const rateLimitStore: RateLimitStore = {};
const RATE_LIMIT_WINDOW = 60_000; // 1 minuto
const RATE_LIMIT_MAX = 100; // 100 requisições por minuto

export interface AuthProtectOptions {
  requiredRole?: 'admin' | 'reseller' | 'client';
  rateLimitEnabled?: boolean;
  logSuspiciousActivity?: boolean;
}

export const getClientIP = (): string => {
  if (typeof window === 'undefined') return 'unknown';
  // Em produção, isso viria do servidor
  return window.location.hostname;
};

export const checkRateLimit = (ip: string): { allowed: boolean; remaining: number } => {
  const now = Date.now();
  const record = rateLimitStore[ip];

  if (!record || now > record.resetAt) {
    rateLimitStore[ip] = {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW,
    };
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }

  if (record.count >= RATE_LIMIT_MAX) {
    logger.warn('Rate limit excedido', { ip, count: record.count });
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  return { allowed: true, remaining: RATE_LIMIT_MAX - record.count };
};

export const validateJWT = async (token: string): Promise<{ valid: boolean; userId?: string; role?: string }> => {
  try {
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) {
      return { valid: false };
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();

    return {
      valid: true,
      userId: data.user.id,
      role: profile?.role || 'client',
    };
  } catch (error) {
    logger.error('Erro ao validar JWT', { error: (error as Error).message });
    return { valid: false };
  }
};

export const logSuspiciousActivity = async (
  ip: string,
  reason: string,
  metadata?: Record<string, unknown>,
) => {
  try {
    await supabase.from('security_logs').insert({
      ip_address: ip,
      event_type: 'suspicious_activity',
      reason,
      metadata: metadata || {},
      created_at: new Date().toISOString(),
    });
    logger.warn('Atividade suspeita registrada', { ip, reason });
  } catch (error) {
    logger.error('Erro ao registrar atividade suspeita', { error: (error as Error).message });
  }
};

export const useAuthProtect = async (
  options: AuthProtectOptions = {},
): Promise<{ authorized: boolean; reason?: string; user?: { id: string; role: string } }> => {
  const {
    requiredRole,
    rateLimitEnabled = true,
    logSuspiciousActivity: shouldLog = true,
  } = options;

  const ip = getClientIP();

  // Rate limiting
  if (rateLimitEnabled) {
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      if (shouldLog) {
        await logSuspiciousActivity(ip, 'rate_limit_exceeded', { limit: RATE_LIMIT_MAX });
      }
      return { authorized: false, reason: 'Rate limit excedido' };
    }
  }

  // Validar sessão
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error || !session) {
    if (shouldLog) {
      await logSuspiciousActivity(ip, 'no_session', { error: error?.message });
    }
    return { authorized: false, reason: 'Sessão inválida ou expirada' };
  }

  // Validar JWT
  const jwtValidation = await validateJWT(session.access_token);
  if (!jwtValidation.valid) {
    if (shouldLog) {
      await logSuspiciousActivity(ip, 'invalid_jwt', { userId: jwtValidation.userId });
    }
    return { authorized: false, reason: 'Token inválido' };
  }

  // Validar role se necessário
  if (requiredRole && jwtValidation.role !== requiredRole) {
    if (shouldLog) {
      await logSuspiciousActivity(ip, 'insufficient_role', {
        required: requiredRole,
        actual: jwtValidation.role,
        userId: jwtValidation.userId,
      });
    }
    return { authorized: false, reason: `Role insuficiente. Requerido: ${requiredRole}` };
  }

  return {
    authorized: true,
    user: {
      id: jwtValidation.userId!,
      role: jwtValidation.role!,
    },
  };
};

