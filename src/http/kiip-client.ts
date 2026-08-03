import type { SessionStore } from '../session';
import {
  BackendError,
  ForbiddenError,
  NotFoundError,
  TimeoutError,
  UnauthorizedError,
} from './errors';

export interface KiipClient {
  get<T = unknown>(path: string, query?: Record<string, string | number | undefined>): Promise<T>;
  put<T = unknown>(path: string, body?: unknown): Promise<T>;
}

export interface KiipClientOptions {
  apiBaseUrl: () => string;
  timeoutMs: number;
  session: SessionStore;
}

export function createKiipClient(opts: KiipClientOptions): KiipClient {
  return {
    get: (path, query) => request(opts, 'GET', path, undefined, query),
    put: (path, body) => request(opts, 'PUT', path, body),
  };
}

async function request<T>(
  opts: KiipClientOptions,
  method: 'GET' | 'PUT',
  path: string,
  body: unknown,
  query?: Record<string, string | number | undefined>,
): Promise<T> {
  const url = buildUrl(opts.apiBaseUrl(), path, query);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), opts.timeoutMs);

  try {
    const response = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${opts.session.getToken()}`,
        Accept: 'application/json',
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
    return await handleResponse<T>(response, path);
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      throw new TimeoutError(`Kiip backend did not respond within ${opts.timeoutMs}ms.`, {
        cause: err,
      });
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

function buildUrl(
  base: string,
  path: string,
  query?: Record<string, string | number | undefined>,
): string {
  const url = `${base}${path}`;
  if (!query) return url;
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) {
    if (v !== undefined) params.append(k, String(v));
  }
  const qs = params.toString();
  return qs ? `${url}?${qs}` : url;
}

async function handleResponse<T>(response: Response, path: string): Promise<T> {
  if (response.ok) {
    if (response.status === 204) return null as T;
    const text = await response.text();
    return (text ? JSON.parse(text) : null) as T;
  }

  const bodyMessage = await extractMessage(response);

  if (response.status === 401) {
    throw new UnauthorizedError(undefined, { cause: bodyMessage });
  }
  if (response.status === 403) {
    throw new ForbiddenError(bodyMessage || 'Forbidden');
  }
  if (response.status === 404) {
    throw new NotFoundError(`Not found: ${path}${bodyMessage ? ` (${bodyMessage})` : ''}`);
  }
  throw new BackendError(
    `Kiip backend error ${response.status}${bodyMessage ? `: ${bodyMessage}` : ''}`,
    response.status,
  );
}

async function extractMessage(response: Response): Promise<string> {
  try {
    const text = await response.text();
    if (!text) return '';
    try {
      const json = JSON.parse(text) as { message?: unknown };
      if (typeof json.message === 'string') return json.message;
    } catch {
      return text;
    }
    return text;
  } catch {
    return '';
  }
}
