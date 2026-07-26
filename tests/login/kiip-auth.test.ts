import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LoginError, loginToKiip } from '../../src/login/kiip-auth';

const baseUrl = 'https://api.kiip.test';

describe('loginToKiip', () => {
  const fetchMock = vi.fn();
  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal('fetch', fetchMock);
  });
  afterEach(() => vi.unstubAllGlobals());

  it('returns the token on success', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ token: 'jwt-abc' }), {
        status: 200,
        headers: { 'content-type': 'application/json' },
      }),
    );
    const res = await loginToKiip(baseUrl, 'a@b.com', 'pw');
    expect(res.token).toBe('jwt-abc');
    const [url, init] = fetchMock.mock.calls[0]!;
    expect(url).toBe('https://api.kiip.test/auth/login');
    expect((init as RequestInit).method).toBe('POST');
    const body = JSON.parse((init as RequestInit).body as string);
    expect(body).toEqual({ email: 'a@b.com', password: 'pw' });
  });

  it('throws LoginError with backend message on 401', async () => {
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ message: 'Wrong credentials' }), { status: 401 }),
    );
    await expect(loginToKiip(baseUrl, 'a', 'b')).rejects.toBeInstanceOf(LoginError);
    fetchMock.mockResolvedValueOnce(
      new Response(JSON.stringify({ message: 'Wrong credentials' }), { status: 401 }),
    );
    await expect(loginToKiip(baseUrl, 'a', 'b')).rejects.toThrow(/Wrong credentials/);
  });

  it('throws LoginError on network failure', async () => {
    fetchMock.mockRejectedValueOnce(new Error('ECONNREFUSED'));
    await expect(loginToKiip(baseUrl, 'a', 'b')).rejects.toBeInstanceOf(LoginError);
  });

  it('throws LoginError when body is not JSON on 5xx', async () => {
    fetchMock.mockResolvedValueOnce(new Response('gateway error', { status: 502 }));
    await expect(loginToKiip(baseUrl, 'a', 'b')).rejects.toBeInstanceOf(LoginError);
  });
});
