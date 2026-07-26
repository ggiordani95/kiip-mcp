import { existsSync, mkdtempSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { createFileTokenStore } from '../src/token-store';

let dir: string;

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'kiip-mcp-test-'));
});

afterEach(() => {
  rmSync(dir, { recursive: true, force: true });
});

describe('createFileTokenStore', () => {
  it('returns null when file does not exist', () => {
    const store = createFileTokenStore(dir);
    expect(store.read()).toBeNull();
  });

  it('writes and reads back a stored token', () => {
    const store = createFileTokenStore(dir);
    store.write({
      token: 'jwt-abc',
      apiBaseUrl: 'https://api.kiip.test',
      updatedAt: '2026-07-24T00:00:00Z',
    });
    expect(existsSync(join(dir, 'token'))).toBe(true);
    expect(store.read()).toEqual({
      token: 'jwt-abc',
      apiBaseUrl: 'https://api.kiip.test',
      updatedAt: '2026-07-24T00:00:00Z',
    });
  });

  it('overwrites on repeated write', () => {
    const store = createFileTokenStore(dir);
    store.write({ token: 'a', apiBaseUrl: 'x', updatedAt: 't1' });
    store.write({ token: 'b', apiBaseUrl: 'x', updatedAt: 't2' });
    expect(store.read()?.token).toBe('b');
  });

  it('returns null on malformed JSON', () => {
    const store = createFileTokenStore(dir);
    writeFileSync(join(dir, 'token'), 'not-json');
    expect(store.read()).toBeNull();
  });

  it('applies chmod 600 on POSIX (skipped on Windows)', () => {
    const store = createFileTokenStore(dir);
    store.write({ token: 't', apiBaseUrl: 'x', updatedAt: 'y' });
    if (process.platform === 'win32') return;
    const mode = statSync(join(dir, 'token')).mode & 0o777;
    expect(mode).toBe(0o600);
  });

  it('exposes the token file path', () => {
    const store = createFileTokenStore(dir);
    expect(store.path()).toBe(join(dir, 'token'));
  });
});
