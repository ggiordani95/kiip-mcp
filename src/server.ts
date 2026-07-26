import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type { KiipConfig } from './config';
import { createKiipClient } from './http/kiip-client';
import { createSessionStore } from './session';
import { createFileTokenStore } from './token-store';
import { registerEmploymentTools } from './tools/employment';
import { registerOrgStructureTools } from './tools/org-structure';
import { registerPayrollTools } from './tools/payroll';
import { registerPersonTools } from './tools/persons';
import { registerTenantTools } from './tools/tenants';

export function createServer(cfg: KiipConfig): McpServer {
  const server = new McpServer({ name: 'kiip', version: '0.2.4' });
  const tokenStore = createFileTokenStore();
  const session = createSessionStore(cfg.token, tokenStore);
  const client = createKiipClient({
    apiBaseUrl: cfg.apiBaseUrl,
    timeoutMs: cfg.timeoutMs,
    session,
  });

  registerTenantTools(server, { client, session });
  registerPersonTools(server, { client });
  registerOrgStructureTools(server, { client });
  registerEmploymentTools(server, { client });
  registerPayrollTools(server, { client });

  return server;
}
