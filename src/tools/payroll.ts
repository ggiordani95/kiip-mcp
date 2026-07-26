import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import type { KiipClient } from '../http/kiip-client';
import { ok, wrap } from './helpers';

export interface PayrollToolsDeps {
  client: KiipClient;
}

export function registerPayrollTools(server: McpServer, { client }: PayrollToolsDeps): void {
  server.registerTool(
    'list_payrolls',
    {
      description: 'List payrolls (folhas). Filter by competency (YYYY-MM) and status.',
      inputSchema: {
        competency: z.string().optional().describe('Competency in "YYYY-MM" format.'),
        status: z.string().optional(),
        page: z.number().int().positive().optional(),
        pageSize: z.number().int().positive().max(200).optional(),
      },
    },
    wrap(
      async (args: {
        competency?: string;
        status?: string;
        page?: number;
        pageSize?: number;
      }) => ok(await client.get('/payrolls', args)),
    ),
  );

  server.registerTool(
    'get_payroll',
    {
      description: 'Get a single payroll by id.',
      inputSchema: { payrollId: z.string().min(1) },
    },
    wrap(async ({ payrollId }: { payrollId: string }) =>
      ok(await client.get(`/payrolls/${encodeURIComponent(payrollId)}`)),
    ),
  );

  server.registerTool(
    'list_payroll_events',
    {
      description: 'List payroll events (proventos/descontos). Filter by payrollId.',
      inputSchema: {
        payrollId: z.string().optional(),
        page: z.number().int().positive().optional(),
        pageSize: z.number().int().positive().max(200).optional(),
      },
    },
    wrap(
      async (args: { payrollId?: string; page?: number; pageSize?: number }) =>
        ok(await client.get('/payroll-events', args)),
    ),
  );

  server.registerTool(
    'list_scheduled_entries',
    {
      description: 'List scheduled entries (lançamentos programados). Filter by personId.',
      inputSchema: {
        personId: z.string().optional(),
        page: z.number().int().positive().optional(),
        pageSize: z.number().int().positive().max(200).optional(),
      },
    },
    wrap(
      async (args: { personId?: string; page?: number; pageSize?: number }) =>
        ok(await client.get('/scheduled-entries', args)),
    ),
  );
}
