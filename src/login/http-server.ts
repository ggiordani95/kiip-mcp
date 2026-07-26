import { randomBytes } from 'node:crypto';
import { EventEmitter } from 'node:events';
import {
  createServer as createHttpServer,
  type IncomingMessage,
  type ServerResponse,
} from 'node:http';
import type { TokenStore } from '../token-store';
import { LoginError, loginToKiip } from './kiip-auth';
import { renderLoginPage } from './login-page';

export interface LoginServerOptions {
  apiBaseUrl: string;
  store: TokenStore;
  port?: number;
}

export interface LoginServerHandle {
  port: number;
  csrf: string;
  events: EventEmitter;
  close: () => Promise<void>;
}

export async function createLoginServer(opts: LoginServerOptions): Promise<LoginServerHandle> {
  const csrf = randomBytes(24).toString('hex');
  const events = new EventEmitter();

  const server = createHttpServer((req, res) => {
    handle(req, res, opts, csrf, events).catch((err) => {
      console.error('[kiip-mcp] unexpected error handling request:', err);
      writeJson(res, 500, { ok: false, message: 'Internal server error' });
    });
  });

  return new Promise((resolve, reject) => {
    server.on('error', reject);
    server.listen(opts.port ?? 0, '127.0.0.1', () => {
      const address = server.address();
      const port = typeof address === 'object' && address ? address.port : 0;
      resolve({
        port,
        csrf,
        events,
        close: () =>
          new Promise((resolveClose, rejectClose) => {
            server.closeAllConnections?.();
            server.close((err) => (err ? rejectClose(err) : resolveClose()));
          }),
      });
    });
  });
}

async function handle(
  req: IncomingMessage,
  res: ServerResponse,
  opts: LoginServerOptions,
  csrf: string,
  events: EventEmitter,
): Promise<void> {
  const url = new URL(req.url ?? '/', `http://${req.headers.host}`);

  if (req.method === 'GET' && url.pathname === '/') {
    if (url.searchParams.get('csrf') !== csrf) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('Forbidden');
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(renderLoginPage({ csrf }));
    return;
  }

  if (req.method === 'GET' && url.pathname === '/favicon.ico') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/login') {
    if (req.headers['x-csrf'] !== csrf) {
      writeJson(res, 403, { ok: false, message: 'Invalid CSRF token' });
      return;
    }
    const body = await readJson(req);
    const email = typeof body.email === 'string' ? body.email : '';
    const password = typeof body.password === 'string' ? body.password : '';
    if (!email || !password) {
      writeJson(res, 400, { ok: false, message: 'Email and password are required.' });
      return;
    }
    try {
      const { token } = await loginToKiip(opts.apiBaseUrl, email, password);
      opts.store.write({
        token,
        apiBaseUrl: opts.apiBaseUrl,
        updatedAt: new Date().toISOString(),
      });
      events.emit('login-success');
      writeJson(res, 200, { ok: true });
    } catch (err) {
      if (err instanceof LoginError) {
        writeJson(res, 200, { ok: false, message: err.message });
      } else {
        writeJson(res, 500, { ok: false, message: 'Unexpected error' });
      }
    }
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
}

function writeJson(res: ServerResponse, status: number, body: unknown): void {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(body));
}

async function readJson(req: IncomingMessage): Promise<Record<string, unknown>> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(chunk as Buffer);
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return {};
  }
}
