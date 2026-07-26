import { build } from 'esbuild';
import { chmod } from 'node:fs/promises';

const banner = [
  '#!/usr/bin/env node',
  "import{createRequire}from'node:module';",
  'const require=createRequire(import.meta.url);',
].join('\n');

await build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outfile: 'dist/index.mjs',
  banner: { js: banner },
  logLevel: 'info',
});

// Make the bin executable on POSIX; harmless on Windows.
try {
  await chmod('dist/index.mjs', 0o755);
} catch {
  // ignore
}
