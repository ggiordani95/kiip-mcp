import { chmodSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';

export interface StoredToken {
  token: string;
  apiBaseUrl: string;
  updatedAt: string;
}

export interface TokenStore {
  read(): StoredToken | null;
  write(token: StoredToken): void;
  path(): string;
}

export function createFileTokenStore(baseDir?: string): TokenStore {
  const dir = baseDir ?? join(homedir(), '.kiip-mcp');
  const file = join(dir, 'token');

  return {
    path: () => file,
    read: () => {
      if (!existsSync(file)) return null;
      try {
        const raw = readFileSync(file, 'utf8');
        const parsed = JSON.parse(raw) as StoredToken;
        if (
          typeof parsed?.token === 'string' &&
          typeof parsed?.apiBaseUrl === 'string' &&
          typeof parsed?.updatedAt === 'string'
        ) {
          return parsed;
        }
        return null;
      } catch {
        return null;
      }
    },
    write: (t) => {
      mkdirSync(dirname(file), { recursive: true });
      writeFileSync(file, JSON.stringify(t, null, 2), 'utf8');
      if (process.platform !== 'win32') {
        try {
          chmodSync(file, 0o600);
        } catch {
          // best-effort
        }
      }
    },
  };
}
