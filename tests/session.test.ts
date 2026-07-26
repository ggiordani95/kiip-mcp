import { describe, expect, it, vi } from 'vitest';
import { createSessionStore } from '../src/session';
import type { StoredToken, TokenStore } from '../src/token-store';

function inMemoryStore(initial: StoredToken | null = null): TokenStore {
  let current = initial;
  return {
    path: () => '/tmp/fake',
    read: () => (current ? { ...current } : null),
    write: (t) => {
      current = t;
    },
  };
}

describe('createSessionStore', () => {
  it('returns the initial token', () => {
    const s = createSessionStore('initial-jwt');
    expect(s.getToken()).toBe('initial-jwt');
  });

  it('setToken replaces the current token', () => {
    const s = createSessionStore('a');
    s.setToken('b');
    expect(s.getToken()).toBe('b');
  });

  it('rejects empty strings on setToken', () => {
    const s = createSessionStore('a');
    expect(() => s.setToken('')).toThrow(/non-empty/);
    expect(s.getToken()).toBe('a');
  });
});

describe('createSessionStore with TokenStore', () => {
  it('prefers the store token over initialToken when store returns a value', () => {
    const store = inMemoryStore({ token: 'from-file', apiBaseUrl: 'x', updatedAt: 't' });
    const s = createSessionStore('from-env', store);
    expect(s.getToken()).toBe('from-file');
  });

  it('falls back to initialToken when store returns null', () => {
    const store = inMemoryStore(null);
    const s = createSessionStore('from-env', store);
    expect(s.getToken()).toBe('from-env');
  });

  it('reads the store on every getToken call (fresh after re-login)', () => {
    const store = inMemoryStore(null);
    const s = createSessionStore('from-env', store);
    expect(s.getToken()).toBe('from-env');
    store.write({ token: 'fresh', apiBaseUrl: 'x', updatedAt: 't' });
    expect(s.getToken()).toBe('fresh');
  });

  it('setToken writes through to the store', () => {
    const writeSpy = vi.fn();
    const store: TokenStore = {
      path: () => '/tmp/x',
      read: () => null,
      write: writeSpy,
    };
    const s = createSessionStore('initial', store);
    s.setToken('new');
    expect(writeSpy).toHaveBeenCalledTimes(1);
    expect(writeSpy.mock.calls[0]![0]).toMatchObject({ token: 'new' });
  });
});
