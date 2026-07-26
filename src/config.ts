import { z } from 'zod';
import { ConfigurationError } from './http/errors';
import { createFileTokenStore } from './token-store';

const DEFAULT_API_BASE_URL = 'https://api.kiip.com.br';

const envSchema = z.object({
  KIIP_TOKEN: z.string().min(1).optional(),
  KIIP_API_BASE_URL: z.url('KIIP_API_BASE_URL must be a valid URL').optional(),
  KIIP_TIMEOUT_MS: z.coerce.number().int().positive().optional(),
});

export interface KiipConfig {
  token: string;
  apiBaseUrl: string;
  timeoutMs: number;
}

export interface ResolveConfigOptions {
  tokenFileDir?: string;
}

export function resolveConfig(
  env: Record<string, string | undefined>,
  opts: ResolveConfigOptions = {},
): KiipConfig {
  const parsed = envSchema.safeParse(env);
  if (!parsed.success) {
    const message = parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ');
    throw new ConfigurationError(`Invalid kiip-mcp configuration: ${message}`);
  }

  const store = createFileTokenStore(opts.tokenFileDir);
  const stored = store.read();

  const token = parsed.data.KIIP_TOKEN ?? stored?.token;
  if (!token) {
    throw new ConfigurationError(
      'No Kiip token found. Run `/kiip-login` in Claude Code to authenticate, or set KIIP_TOKEN in your env.',
    );
  }

  const apiBaseUrl = (
    parsed.data.KIIP_API_BASE_URL ??
    stored?.apiBaseUrl ??
    DEFAULT_API_BASE_URL
  ).replace(/\/+$/, '');

  return {
    token,
    apiBaseUrl,
    timeoutMs: parsed.data.KIIP_TIMEOUT_MS ?? 15000,
  };
}
