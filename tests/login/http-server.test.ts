import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { kiipAuthMock, LoginErrorFake } = vi.hoisted(() => {
  class LoginErrorFake extends Error {
    constructor(msg: string) {
      super(msg);
      this.name = 'LoginError';
    }
  }
  return { kiipAuthMock: vi.fn(), LoginErrorFake };
});

vi.mock('../../src/login/kiip-auth', () => ({
  LoginError: LoginErrorFake,
  loginToKiip: (...args: unknown[]) => kiipAuthMock(...args),
}));

import { createLoginServer } from '../../src/login/http-server';
import { createFileTokenStore } from '../../src/token-store';

let dir: string;

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'kiip-mcp-http-'));
  kiipAuthMock.mockReset();
});
afterEach(() => rmSync(dir, { recursive: true, force: true }));

describe('createLoginServer', () => {
  it('serves the login page with CSRF at GET /?csrf=', async () => {
    const store = createFileTokenStore(dir);
    const s = await createLoginServer({ apiBaseUrl: 'https://api.kiip.test', store });
    const res = await fetch(`http://127.0.0.1:${s.port}/?csrf=${s.csrf}`);
    expect(res.status).toBe(200);
    const html = await res.text();
    expect(html).toContain('<form');
    expect(html).toContain(s.csrf);
    await s.close();
  });

  it('rejects GET / with wrong or missing csrf', async () => {
    const store = createFileTokenStore(dir);
    const s = await createLoginServer({ apiBaseUrl: 'https://api.kiip.test', store });
    const bad = await fetch(`http://127.0.0.1:${s.port}/`);
    expect(bad.status).toBe(403);
    const wrong = await fetch(`http://127.0.0.1:${s.port}/?csrf=wrong`);
    expect(wrong.status).toBe(403);
    await s.close();
  });

  it('rejects POST /api/login without CSRF', async () => {
    const store = createFileTokenStore(dir);
    const s = await createLoginServer({ apiBaseUrl: 'https://api.kiip.test', store });
    const res = await fetch(`http://127.0.0.1:${s.port}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'a', password: 'b' }),
    });
    expect(res.status).toBe(403);
    await s.close();
  });

  it('writes token file and emits login-success on successful login', async () => {
    kiipAuthMock.mockResolvedValueOnce({ token: 'jwt-xyz' });
    const store = createFileTokenStore(dir);
    const s = await createLoginServer({ apiBaseUrl: 'https://api.kiip.test', store });
    const successPromise = new Promise<void>((resolve) => s.events.once('login-success', resolve));
    const res = await fetch(`http://127.0.0.1:${s.port}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF': s.csrf },
      body: JSON.stringify({ email: 'a@b.com', password: 'pw' }),
    });
    expect(res.status).toBe(200);
    const data = (await res.json()) as { ok: boolean };
    expect(data.ok).toBe(true);
    await successPromise;
    expect(existsSync(join(dir, 'token'))).toBe(true);
    const stored = JSON.parse(readFileSync(join(dir, 'token'), 'utf8'));
    expect(stored.token).toBe('jwt-xyz');
    expect(stored.apiBaseUrl).toBe('https://api.kiip.test');
    await s.close();
  });

  it('returns ok:false with backend message on login failure', async () => {
    kiipAuthMock.mockRejectedValueOnce(new LoginErrorFake('Wrong credentials'));
    const store = createFileTokenStore(dir);
    const s = await createLoginServer({ apiBaseUrl: 'https://api.kiip.test', store });
    const res = await fetch(`http://127.0.0.1:${s.port}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF': s.csrf },
      body: JSON.stringify({ email: 'a', password: 'b' }),
    });
    expect(res.status).toBe(200);
    const data = (await res.json()) as { ok: boolean; message: string };
    expect(data.ok).toBe(false);
    expect(data.message).toContain('Wrong credentials');
    await s.close();
  });
});
