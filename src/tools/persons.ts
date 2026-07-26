import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { KiipClient } from '../http/kiip-client';
import { ok, wrap } from './helpers';

export interface PersonToolsDeps {
  client: KiipClient;
}

export function registerPersonTools(server: McpServer, { client }: PersonToolsDeps): void {
  server.registerTool(
    'list_persons',
    {
      description:
        'List Kiip persons (employees) with optional search and pagination. Returns a resume view: id, name, status, department, job position.',
      inputSchema: {
        search: z.string().optional().describe('Free-text search across person fields.'),
        status: z.string().optional().describe('Filter by status (e.g., "active").'),
        page: z.number().int().positive().optional().describe('1-based page number.'),
        pageSize: z.number().int().positive().max(200).optional(),
      },
    },
    wrap(
      async (args: { search?: string; status?: string; page?: number; pageSize?: number }) =>
        ok(await client.get('/persons', args)),
    ),
  );

  server.registerTool(
    'get_person',
    {
      description: 'Get full detail for a single person by ID.',
      inputSchema: { personId: z.string().min(1) },
    },
    wrap(async ({ personId }: { personId: string }) =>
      ok(await client.get(`/persons/${encodeURIComponent(personId)}`)),
    ),
  );

  server.registerTool(
    'get_person_summary',
    {
      description: 'Get the profile summary card for a person (compact overview).',
      inputSchema: { personId: z.string().min(1) },
    },
    wrap(async ({ personId }: { personId: string }) =>
      ok(await client.get(`/persons/${encodeURIComponent(personId)}/profile/summary`)),
    ),
  );
}
