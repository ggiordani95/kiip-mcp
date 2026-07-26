export class LoginError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options?.cause !== undefined ? { cause: options.cause } : undefined);
    this.name = 'LoginError';
  }
}

export async function loginToKiip(
  baseUrl: string,
  email: string,
  password: string,
): Promise<{ token: string }> {
  let response: Response;
  try {
    response = await fetch(`${baseUrl.replace(/\/+$/, '')}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  } catch (err) {
    throw new LoginError(
      'Could not reach the Kiip backend. Check your connection and try again.',
      { cause: err },
    );
  }

  const text = await response.text();
  let body: { token?: unknown; message?: unknown } = {};
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    body = {};
  }

  if (response.ok) {
    if (typeof body.token === 'string' && body.token.length > 0) {
      return { token: body.token };
    }
    throw new LoginError('Kiip backend returned no token.');
  }

  const backendMessage =
    typeof body.message === 'string' ? body.message : `HTTP ${response.status}`;
  throw new LoginError(backendMessage);
}
