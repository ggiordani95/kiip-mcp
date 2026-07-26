import { createFileTokenStore } from '../token-store';
import { createLoginServer } from './http-server';
import { openBrowser } from './open-browser';

const DEFAULT_API_BASE_URL = 'https://api.kiip.com.br';
const TIMEOUT_MS = 10 * 60 * 1000;

export async function runLoginCli(env: Record<string, string | undefined>): Promise<number> {
  const apiBaseUrl = (env.KIIP_API_BASE_URL ?? DEFAULT_API_BASE_URL).replace(/\/+$/, '');
  const store = createFileTokenStore();
  const portRaw = env.KIIP_LOGIN_PORT;
  const port = portRaw ? Number.parseInt(portRaw, 10) : 0;

  if (portRaw && (!Number.isInteger(port) || port <= 0 || port > 65535)) {
    console.error(`[kiip-mcp] KIIP_LOGIN_PORT="${portRaw}" is not a valid port.`);
    return 1;
  }

  let handle;
  try {
    handle = await createLoginServer({ apiBaseUrl, store, port });
  } catch (err) {
    if (portRaw) {
      console.error(
        `[kiip-mcp] Port ${port} from KIIP_LOGIN_PORT is unavailable. Unset it or free the port.`,
      );
    } else {
      console.error('[kiip-mcp] Could not start the login server:', err);
    }
    return 1;
  }

  const url = `http://127.0.0.1:${handle.port}/?csrf=${handle.csrf}`;
  console.error(`[kiip-mcp] Opening ${url} in your browser...`);
  openBrowser(url);
  console.error('[kiip-mcp] If it did not open, paste the URL above into your browser.');
  console.error(`[kiip-mcp] Token will be saved to ${store.path()}. Ctrl+C to cancel.`);

  const success = new Promise<void>((resolve) => handle.events.once('login-success', resolve));
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('login timed out after 10 minutes')), TIMEOUT_MS),
  );

  try {
    await Promise.race([success, timeout]);
  } catch (err) {
    console.error(`[kiip-mcp] ${(err as Error).message}`);
    await handle.close();
    return 1;
  }

  console.error('[kiip-mcp] Logged in. Token saved.');
  await new Promise((r) => setTimeout(r, 2000));
  await handle.close();
  return 0;
}
