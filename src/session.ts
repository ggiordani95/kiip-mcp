import { NotAuthenticatedError } from './http/errors';
import type { StoredToken, TokenStore } from './token-store';

export interface SessionStore {
  getToken(): string;
  setToken(token: string): void;
}

export function createSessionStore(initialToken?: string, store?: TokenStore): SessionStore {
  let current = initialToken;

  return {
    getToken: () => {
      const token = store?.read()?.token ?? current;
      if (!token) throw new NotAuthenticatedError();
      return token;
    },
    setToken: (token) => {
      if (!token) {
        throw new Error('SessionStore.setToken requires a non-empty string');
      }
      current = token;
      if (store) {
        const stored = store.read();
        const next: StoredToken = {
          token,
          apiBaseUrl: stored?.apiBaseUrl ?? '',
          updatedAt: new Date().toISOString(),
        };
        store.write(next);
      }
    },
  };
}
