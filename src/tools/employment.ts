import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { KiipClient } from '../http/kiip-client';
import { ok, wrap } from './helpers';

export interface EmploymentToolsDeps {
  client: KiipClient;
}

export function registerEmploymentTools(
  server: McpServer,
  { client }: EmploymentToolsDeps,
): void {
  server.registerTool(
    'list_employment_relationships',
    {
      description:
        'List employment relationships (vínculos). Filter by person or status; supports pagination.',
      inputSchema: {
        personId: z.string().optional(),
        status: z.string().optional(),
        page: z.number().int().positive().optional(),
        pageSize: z.number().int().positive().max(200).optional(),
      },
    },
    wrap(
      async (args: {
        personId?: string;
        status?: string;
        page?: number;
        pageSize?: number;
      }) => ok(await client.get('/employment-relationships', args)),
    ),
  );

  server.registerTool(
    'get_employment_relationship',
    {
      description: 'Get a single employment relationship (vínculo) by id.',
      inputSchema: { id: z.string().min(1) },
    },
    wrap(async ({ id }: { id: string }) =>
      ok(await client.get(`/employment-relationships/${encodeURIComponent(id)}`)),
    ),
  );
}
