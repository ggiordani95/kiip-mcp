import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { resolveConfig } from './config';
import { ConfigurationError } from './http/errors';
import { runLoginCli } from './login/cli';
import { createServer } from './server';

const HELP = `Usage:
  kiip-mcp             Run the MCP server over stdio (default).
  kiip-mcp login       Open a browser to log in to Kiip and save the token.
  kiip-mcp --help      Show this message.
`;

async function main(): Promise<number> {
  const mode = process.argv[2];

  if (mode === '--help' || mode === '-h' || mode === 'help') {
    process.stdout.write(HELP);
    return 0;
  }

  if (mode === 'login') {
    return runLoginCli(process.env);
  }

  let cfg;
  try {
    cfg = resolveConfig(process.env);
  } catch (err) {
    if (err instanceof ConfigurationError) {
      console.error(`[kiip-mcp] ${err.message}`);
      return 1;
    }
    throw err;
  }
  const server = createServer(cfg);
  await server.connect(new StdioServerTransport());
  console.error(`[kiip-mcp] ready (base: ${cfg.apiBaseUrl})`);
  if (!cfg.token) {
    console.error('[kiip-mcp] not logged in yet — run `/kiip-login` in Claude Code to authenticate.');
  }
  return 0;
}

main().then(
  (code) => {
    if (code !== 0) process.exit(code);
  },
  (err) => {
    console.error('[kiip-mcp] fatal:', err);
    process.exit(1);
  },
);
