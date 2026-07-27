import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { resolveConfig } from '../src/config';
import { ConfigurationError } from '../src/http/errors';

let dir: string;

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'kiip-mcp-cfg-'));
});

afterEach(() => {
  rmSync(dir, { recursive: true, force: true });
});

describe('resolveConfig', () => {
  it('returns config when required env is present', () => {
    const cfg = resolveConfig(
      { KIIP_TOKEN: 'jwt-abc', KIIP_API_BASE_URL: 'https://api.kiip.com.br' },
      { tokenFileDir: dir },
    );
    expect(cfg.token).toBe('jwt-abc');
    expect(cfg.apiBaseUrl).toBe('https://api.kiip.com.br');
    expect(cfg.timeoutMs).toBe(15000);
  });

  it('trims trailing slash from apiBaseUrl', () => {
    const cfg = resolveConfig(
      { KIIP_TOKEN: 'x', KIIP_API_BASE_URL: 'https://api.kiip.com.br/' },
      { tokenFileDir: dir },
    );
    expect(cfg.apiBaseUrl).toBe('https://api.kiip.com.br');
  });

  it('reads custom timeout', () => {
    const cfg = resolveConfig(
      {
        KIIP_TOKEN: 'x',
        KIIP_API_BASE_URL: 'https://api.kiip.com.br',
        KIIP_TIMEOUT_MS: '30000',
      },
      { tokenFileDir: dir },
    );
    expect(cfg.timeoutMs).toBe(30000);
  });

  it('throws ConfigurationError when KIIP_API_BASE_URL is not a valid URL', () => {
    expect(() =>
      resolveConfig({ KIIP_TOKEN: 'x', KIIP_API_BASE_URL: 'not-a-url' }, { tokenFileDir: dir }),
    ).toThrow(ConfigurationError);
  });

  it('throws ConfigurationError when KIIP_TIMEOUT_MS is not a positive integer', () => {
    expect(() =>
      resolveConfig(
        {
          KIIP_TOKEN: 'x',
          KIIP_API_BASE_URL: 'https://api.kiip.com.br',
          KIIP_TIMEOUT_MS: 'abc',
        },
        { tokenFileDir: dir },
      ),
    ).toThrow(ConfigurationError);
  });
});

describe('resolveConfig with token file', () => {
  it('defaults apiBaseUrl to staging when not set', () => {
    const cfg = resolveConfig({ KIIP_TOKEN: 'x' }, { tokenFileDir: dir });
    expect(cfg.apiBaseUrl).toBe('https://alpha-app-api.kiip.team');
  });

  it('reads token from file when env is missing but file exists', () => {
    mkdirSync(dir, { recursive: true });
    writeFileSync(
      join(dir, 'token'),
      JSON.stringify({
        token: 'from-file',
        apiBaseUrl: 'https://from-file.test',
        updatedAt: '2026-07-24T00:00:00Z',
      }),
    );
    const cfg = resolveConfig({}, { tokenFileDir: dir });
    expect(cfg.token).toBe('from-file');
    expect(cfg.apiBaseUrl).toBe('https://from-file.test');
  });

  it('env KIIP_TOKEN wins over file when both present', () => {
    mkdirSync(dir, { recursive: true });
    writeFileSync(
      join(dir, 'token'),
      JSON.stringify({ token: 'file', apiBaseUrl: 'x', updatedAt: 't' }),
    );
    const cfg = resolveConfig({ KIIP_TOKEN: 'env' }, { tokenFileDir: dir });
    expect(cfg.token).toBe('env');
  });

  it('throws with /kiip-login hint when neither env nor file is available', () => {
    expect(() => resolveConfig({}, { tokenFileDir: dir })).toThrow(ConfigurationError);
    expect(() => resolveConfig({}, { tokenFileDir: dir })).toThrow(/kiip-login/);
  });
});
