import { spawn } from 'node:child_process';

export function openBrowser(url: string): void {
  try {
    if (process.platform === 'win32') {
      spawn('cmd.exe', ['/c', 'start', '""', url], {
        detached: true,
        stdio: 'ignore',
        windowsHide: true,
      }).unref();
      return;
    }
    if (process.platform === 'darwin') {
      spawn('open', [url], { detached: true, stdio: 'ignore' }).unref();
      return;
    }
    spawn('xdg-open', [url], { detached: true, stdio: 'ignore' }).unref();
  } catch (err) {
    console.error(
      `[kiip-mcp] Could not open browser automatically. Open this URL manually: ${url}`,
    );
    console.error('[kiip-mcp] Reason:', err);
  }
}
