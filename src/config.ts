import { z } from 'zod';
import { ConfigurationError } from './http/errors';
import { createFileTokenStore, type TokenStore } from './token-store';

const DEFAULT_API_BASE_URL = 'https://alpha-app-api.kiip.team';
const DEFAULT_TIMEOUT_MS = 15000;
const TRAILING_SLASHES = /\/+$/;

const envSchema = z.object({
  KIIP_TOKEN: z.string().min(1).optional(),
  KIIP_API_BASE_URL: z.url('KIIP_API_BASE_URL must be a valid URL').optional(),
  KIIP_TIMEOUT_MS: z.coerce.number().int().positive().optional(),
});

export interface KiipConfig {
  token?: string;
  apiBaseUrl: string;
  apiBaseUrlOverride?: string;
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

  const stored = createFileTokenStore(opts.tokenFileDir).read();
  const override = parsed.data.KIIP_API_BASE_URL;

  const token = parsed.data.KIIP_TOKEN ?? stored?.token;
  const apiBaseUrl = withoutTrailingSlash(
    override ?? stored?.apiBaseUrl ?? DEFAULT_API_BASE_URL,
  );
  const apiBaseUrlOverride = override ? withoutTrailingSlash(override) : undefined;
  const timeoutMs = parsed.data.KIIP_TIMEOUT_MS ?? DEFAULT_TIMEOUT_MS;

  return { token, apiBaseUrl, apiBaseUrlOverride, timeoutMs };
}

export function currentApiBaseUrl(cfg: KiipConfig, store: TokenStore): string {
  if (cfg.apiBaseUrlOverride) return cfg.apiBaseUrlOverride;
  const stored = store.read()?.apiBaseUrl;
  return stored ? withoutTrailingSlash(stored) : cfg.apiBaseUrl;
}

function withoutTrailingSlash(url: string): string {
  return url.replace(TRAILING_SLASHES, '');
}
