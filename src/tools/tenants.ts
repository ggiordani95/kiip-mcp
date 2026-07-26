import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { KiipClient } from '../http/kiip-client';
import type { SessionStore } from '../session';
import { ok, wrap } from './helpers';

export interface TenantToolsDeps {
  client: KiipClient;
  session: SessionStore;
}

export function registerTenantTools(server: McpServer, { client, session }: TenantToolsDeps): void {
  server.registerTool(
    'list_tenants',
    {
      description:
        'List Kiip tenants the current user has access to. Returns an array of tenants with tenantId and display name. Use this before switch_tenant.',
      inputSchema: {},
    },
    wrap(async () => ok(await client.get('/auth/tenants'))),
  );

  server.registerTool(
    'switch_tenant',
    {
      description:
        'Switch the current Kiip session to a different tenant. The MCP updates its in-memory token; subsequent tool calls use the new tenant until the process restarts.',
      inputSchema: {
        tenantId: z.string().min(1).describe('The tenant ID to switch to (from list_tenants).'),
      },
    },
    wrap(async ({ tenantId }: { tenantId: string }) => {
      const result = await client.put<{ token: string }>(
        `/auth/tenants/${encodeURIComponent(tenantId)}`,
      );
      session.setToken(result.token);
      return ok({ switched: true, tenantId });
    }),
  );
}
