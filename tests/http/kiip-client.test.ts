import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createKiipClient } from '../../src/http/kiip-client';
import { TimeoutError, UnauthorizedError } from '../../src/http/errors';
import { createSessionStore } from '../../src/session';

const baseUrl = 'https://api.kiip.test';

function makeClient(token = 'jwt-1') {
  const session = createSessionStore(token);
  const client = createKiipClient({ apiBaseUrl: () => baseUrl, timeoutMs: 5000, session });
  return { client, session };
}

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

describe('KiipClient.get', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('sends GET with Bearer token and returns JSON', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse(200, { hello: 'world' }));
    const { client } = makeClient();
    const res = await client.get('/persons');
    expect(res).toEqual({ hello: 'world' });

    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe('https://api.kiip.test/persons');
    expect((init as RequestInit).method).toBe('GET');
    const headers = (init as RequestInit).headers as Record<string, string>;
    expect(headers.Authorization).toBe('Bearer jwt-1');
  });

  it('reads the token at call time (session mutable)', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse(200, {}));
    const { client, session } = makeClient('old');
    session.setToken('new');
    await client.get('/persons');
    const headers = (fetchMock.mock.calls[0]![1] as RequestInit).headers as Record<string, string>;
    expect(headers.Authorization).toBe('Bearer new');
  });

  it('appends query params, skipping undefined', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse(200, {}));
    const { client } = makeClient();
    await client.get('/persons', { search: 'ana', page: 2, status: undefined });
    const url = fetchMock.mock.calls[0]![0] as string;
    expect(url).toBe('https://api.kiip.test/persons?search=ana&page=2');
  });

  it('maps 401 to UnauthorizedError', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse(401, { message: 'nope' }));
    const { client } = makeClient();
    await expect(client.get('/x')).rejects.toBeInstanceOf(UnauthorizedError);
  });

  it('maps 403 to ForbiddenError with backend message', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse(403, { message: 'missing perm' }));
    const { client } = makeClient();
    await expect(client.get('/x')).rejects.toMatchObject({
      name: 'ForbiddenError',
      message: expect.stringContaining('missing perm'),
    });
  });

  it('maps 404 to NotFoundError with path', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse(404, { message: 'not there' }));
    const { client } = makeClient();
    await expect(client.get('/persons/abc')).rejects.toMatchObject({
      name: 'NotFoundError',
      message: expect.stringContaining('/persons/abc'),
    });
  });

  it('maps 5xx to BackendError', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse(500, { message: 'boom' }));
    const { client } = makeClient();
    await expect(client.get('/x')).rejects.toMatchObject({
      name: 'BackendError',
      status: 500,
    });
  });

  it('maps AbortError to TimeoutError', async () => {
    const err = new Error('aborted');
    err.name = 'AbortError';
    fetchMock.mockRejectedValueOnce(err);
    const { client } = makeClient();
    await expect(client.get('/x')).rejects.toBeInstanceOf(TimeoutError);
  });

  it('handles empty response body (204)', async () => {
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 204 }));
    const { client } = makeClient();
    const res = await client.get('/x');
    expect(res).toBeNull();
  });
});

describe('KiipClient.put', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('sends PUT and returns JSON', async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse(200, { token: 't2' }));
    const { client } = makeClient();
    const res = await client.put<{ token: string }>('/auth/tenants/abc');
    expect(res.token).toBe('t2');
    const init = fetchMock.mock.calls[0]![1] as RequestInit;
    expect(init.method).toBe('PUT');
  });
});

