import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { currentApiBaseUrl, type KiipConfig } from './config';
import { KIIP_INSTRUCTIONS } from './constants/kiip-docs';
import { createKiipClient } from './http/kiip-client';
import { createSessionStore } from './session';
import { createFileTokenStore } from './token-store';
import { registerDocsTools } from './tools/docs';
import { registerEmploymentTools } from './tools/employment';
import { registerOrgStructureTools } from './tools/org-structure';
import { registerPayrollTools } from './tools/payroll';
import { registerPersonTools } from './tools/persons';
import { registerTenantTools } from './tools/tenants';

export function createServer(cfg: KiipConfig): McpServer {
  const server = new McpServer(
    { name: 'kiip', version: '0.3.3' },
    { instructions: KIIP_INSTRUCTIONS },
  );
  const tokenStore = createFileTokenStore();
  const session = createSessionStore(cfg.token, tokenStore);
  const client = createKiipClient({
    apiBaseUrl: () => currentApiBaseUrl(cfg, tokenStore),
    timeoutMs: cfg.timeoutMs,
    session,
  });

  registerTenantTools(server, { client, session });
  registerPersonTools(server, { client });
  registerOrgStructureTools(server, { client });
  registerEmploymentTools(server, { client });
  registerPayrollTools(server, { client });
  registerDocsTools(server, { client });

  return server;
}
